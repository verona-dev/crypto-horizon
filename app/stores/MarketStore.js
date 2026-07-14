import { defineStore } from 'pinia';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';
import { useFetchCmc } from '~/composables/apiCmc.js';
import { formatLinks } from '~/utils/formatUtils.js';
import { useNewsStore } from '~/stores/NewsStore.js';
import { useLoadingStore } from '~/stores/LoadingStore.js';

export const useMarketStore = defineStore('MarketStore', {
    state: () => ({
        coins: [],
        coin: {
            coingecko: {},
            livecoinwatch: {},
            symbol: '',
            chart: {},
            links: {},
            name: '',
            companyTreasury: {},
            timeframe: 1,
            timeframes: [
                { name: 'Day', label: '24h', timeframe: 1 },
                { name: 'Week', label: '7d', timeframe: 7 },
                { name: 'Month', label: '30d', timeframe: 30 },
                { name: 'Year', label: '1y', timeframe: 365 },
            ],
        },
        cmcStatus: {},
        exchanges: [],
        exchange: [],
        fearAndGreed: {},
        globalDefi: {},
        globalMarket: {},
        platformsSummary : [],
        publicTreasury: [],
        trendingCoins: [],
        trendingNfts: [],
    }),
    
    actions: {
        async getFearAndGreed() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCmc('v3/fear-and-greed/latest');
                
                if(response && response.data && response.status) {
                    this.fearAndGreed = response.data;
                    this.cmcStatus = response.status
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getGlobalMarket() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko('global', {
                    params: { vs_currency: 'usd' },
                });
                
                if(response && response.data) {
                    this.globalMarket = response.data;
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getCoinsMarkets(options, tag) {
            this.coins = [];
            const table = tag === 'table';
            const list = tag === 'list';
            
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko('coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        price_change_percentage: '1h,24h,7d,30d',
                        sparkline: true,
                        ...options,
                    },
                });
                
                if(response) {
                    if(table) {
                        this.coins = response;
                        return this.coins;
                    }
                    
                    if(list) {
                        this.platformsSummary = [];
                        return this.platformsSummary = response;
                    }
                }
            } catch(error) {
                console.error(error)
            }
            finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getCoin(slug) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            // const NewsStore = useNewsStore();
            
            try {
                await this.getCoingeckoCoin(slug);
                
                this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
                this.coin.name = this.coin?.coingecko?.name;
                
                const { data, error } = await this.getLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
                
                if(data || error) {
                    // data or error because waiting for livecoinwatch api before formatting the links
                    await this.formatCoinLinks();
                }
                
                /*
                await NewsStore.getNews( {
                    category: this.coin.symbol,
                    limit: 6,
                });
                */
            }
            catch(error) {
                console.error(error);
            }
            finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getCoingeckoCoin(slug) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const [ coinResponse, chartResponse ] = await Promise.all([
                    useFetchCoingecko(`coins/${slug}`),
                    useFetchCoingecko(`coins/${slug}/market_chart`, {
                        query: {
                            days: 1,
                            precision: 5,
                        },
                        params: { vs_currency: 'usd' },
                    })
                ]);
                
                if (coinResponse) {
                    this.coin.coingecko = coinResponse;
                }
                
                if (chartResponse) {
                    this.coin.chart = chartResponse;
                }
                
                await this.getPublicTreasuryByCoin(slug);
            }
            catch(error) {
                console.error(error);
            }
            finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async formatCoinLinks() {
            this.coin.links = formatLinks(this.coin?.coingecko?.links, this.coin?.livecoinwatch?.links);
        },
        
        async getLiveCoinWatch(route, options) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const { data, error } = await useFetchLiveCoinWatch(route, options);
                
                if(data && route === 'coins/single') {
                    this.coin.livecoinwatch = data;
                    return { data, error: null };
                }
                return {
                    data: null,
                    error: error || new Error('Not Found'),
                }
            } catch(error) {
                console.error(error);
                return { data: null, error };
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        setChartTimeframe(timeframe) {
            this.coin.timeframe = timeframe;
        },
        
        async getCoinChart() {
            const id = this.coin.coingecko.id;
            
            try {
                const response = await useFetchCoingecko(`coins/${id}/market_chart`, {
                    query: {
                        days: this.coin.timeframe,
                        precision: 5,
                    },
                    params: { vs_currency: 'usd' },
                });
                
                if(response) {
                    this.coin.chart = response;
                }
            } catch(error) {
                console.error(error)
            }
        },
        
        resetCoin() {
            this.coin = {
                coingecko: {},
                livecoinwatch: {},
                symbol: '',
                chart: {},
                links: {},
                name: '',
                timeframe: 1,
                timeframes: [
                    { name: 'Day', label: '24h', timeframe: 1 },
                    { name: 'Week', label: '7d', timeframe: 7 },
                    { name: 'Month', label: '30d', timeframe: 30 },
                    { name: 'Year', label: '1y', timeframe: 365 },
                ],
            }
        },
        
        async getTrendingSearchList() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko('search/trending');
                if(response) {
                    this.trendingCoins = response.coins;
                    this.trendingNfts = response.nfts;
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getExchanges() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko('/exchanges');
                
                if(response && !this.exchanges.length) {
                    this.exchanges = response;
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getExchange(exchangeId) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko(`/exchanges/${exchangeId}`);
                
                if(response) {
                    this.exchange = response;
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getPublicTreasury() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const responseList = await useFetchCoingecko('entities/list', {
                    params: {
                        per_page: 15
                    },
                });
                
                if(responseList && responseList.length) {
                    const treasuries = responseList.map(entity => useFetchCoingecko(`public_treasury/${entity.id}`));
                    
                    const promises = await Promise.all(treasuries);
                    
                    this.publicTreasury = promises.filter(result => result !== null && result !== undefined);
                }
                
            } catch (error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
        
        async getPublicTreasuryByCoin(coin) {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko(`companies/public_treasury/${coin}`, {
                    params: {
                        per_page: 15
                    },
                });
                
                if(response) {
                    this.coin.companyTreasury = response;
                }
            } catch(error) {
            
            }
        },
    },
    
    getters: {
        getTimeframe() {
            return this.coin.timeframes.find(range => range.timeframe === this.coin.timeframe);
        },
        getCoinPrice() {
            return this.coin.coingecko.market_data?.current_price?.usd;
        },
    }
});
