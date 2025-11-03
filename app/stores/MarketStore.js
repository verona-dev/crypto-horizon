import { defineStore } from 'pinia';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';
import { useFetchCmc } from '~/composables/apiCmc.js';
import { formatCoinsTable, formatCoingeckoCoin, formatLivecoinwatchCoin } from '~/utils/formatUtils.js';
import { useNewsStore } from '~/stores/NewsStore.js';

export const useMarketStore = defineStore('MarketStore', {
    state: () => ({
        coins: [],
        oldCoins: [],
        coin: {
            coingecko: {},
            livecoinwatch: {},
            symbol: '',
            chart: {},
            timeframe: 1,
            timeframes: [
                { name: 'Day', label: '1d', timeframe: 1 },
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
                        ...options,
                    },
                });
                
                if(response) {
                    if(table) {
                        this.coins = response;
                        console.log(JSON.parse(JSON.stringify(this.coins[0])));
                        this.oldCoins = formatCoinsTable(response);
                        console.log(JSON.parse(JSON.stringify(this.oldCoins[0])));
                        return this.oldCoins;
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
            await this.getLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
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
                    this.coin.coingecko = formatCoingeckoCoin(coinResponse);
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
        
        async getLiveCoinWatch(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchLiveCoinWatch(route, options);
                
                if(response && route === 'coins/single') {
                    this.coin.livecoinwatch = formatLivecoinwatchCoin(response);
                }
            } catch(error) {
                console.error(error);
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
    }
});
