import { defineStore } from 'pinia';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';
import { useFetchCmc } from '~/composables/apiCmc.js';
import { formatLinks } from '~/utils/formatUtils.js';
import { useNewsStore } from '~/stores/NewsStore.js';

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
            timeframe: 1,
            timeframes: [
                { name: 'Day', label: '24h', timeframe: 1 },
                { name: 'Week', label: '7d', timeframe: 7 },
                { name: 'Month', label: '30d', timeframe: 30 },
                { name: 'Year', label: '1y', timeframe: 365 },
            ],
        },
        loading: false,
        platformsSummary : [],
        globalMarket: {},
        fearAndGreed: {},
        cmcStatus: {},
        trendingCoins: [],
        trendingNfts: [],
        globalDefi: {},
    }),
    
    actions: {
        async getFearAndGreed() {
            this.loading = true;
            
            try {
                const response = await useFetchCmc('v3/fear-and-greed/latest');
                
                if(response && response.data && response.status) {
                    this.fearAndGreed = response.data;
                    this.cmcStatus = response.status
                }
            } catch(error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        
        async getGlobalMarket() {
            this.loading = true;
            
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
                this.loading = false;
            }
        },
        
        async getCoinsMarkets(options, tag) {
            const table = tag === 'table';
            const list = tag === 'list';
            this.loading = true;
            
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
                this.loading = false;
            }
        },
        
        async getCoin(slug) {
            const NewsStore = useNewsStore();
            
            await this.getCoingeckoCoin(slug);
            
            this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
            this.coin.name = this.coin?.coingecko?.name;
            
            const { data, error } = await this.getLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
            
            if(data || error) {
                // data or error because waiting for livecoinwatch api before formatting the links
                await this.formatCoinLinks();
            }
            
            await NewsStore.getNews( {
                category: this.coin.symbol,
                limit: 6,
            });
        },
        
        async getCoingeckoCoin(slug) {
            this.loading = true;
            
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
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async formatCoinLinks() {
            this.coin.links = formatLinks(this.coin?.coingecko?.links, this.coin?.livecoinwatch?.links);
        },
        
        async getLiveCoinWatch(route, options) {
            this.loading = true;
            
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
                this.loading = false;
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
        
        async getTrendingSearchList() {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko('search/trending');
                if(response) {
                    this.trendingCoins = response.coins;
                    this.trendingNfts = response.nfts;
                }
            } catch(error) {
                console.error(error);
            }
        },
        
        async getCoingeckoGlobalDefi() {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko('global/decentralized_finance_defi');
                
                if(response && response.data) {
                    this.globalDefi = response.data;
                }
            } catch(error) {
                console.error(error);
            } finally {
                this.loading = false;
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
