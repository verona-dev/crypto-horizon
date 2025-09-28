import { defineStore } from 'pinia';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';
import { formatCoinsTable, formatCoingeckoCoin, formatLivecoinwatchCoin } from '~/utils/formatUtils.js';
import { useNewsStore } from '~/stores/NewsStore.js';

export const useMarketStore = defineStore('MarketStore', {
    state: () => ({
        coins: [],
        coin: {
            coingecko: {},
            livecoinwatch: {},
            symbol: '',
            chart: {},
            timeframe: 1,
            ranges: [
                {
                    name: 'Day',
                    label: '1d',
                    timeframe: 1,
                },
                {
                    name: 'Week',
                    label: '7d',
                    timeframe: 7,
                },
                {
                    name: 'Month',
                    label: '30d',
                    timeframe: 30,
                },
                {
                    name: 'Year',
                    label: '1y',
                    timeframe: 365,
                },
            ],
        },
        loading: false,
        globalMarket: {},
    }),
    
    actions: {
        async getCoin(coinId) {
            const NewsStore = useNewsStore();
            
            await this.getCoingeckoCoin(coinId);
            this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
            await this.getLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
            await NewsStore.getNews( {
                category: this.coin.symbol,
                limit: 5,
            });
        },
        
        async getCoingeckoGlobalMarket() {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko('global');
                
                if(response && response.data) {
                    this.globalMarket = response.data;
                }
            } catch(error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        
        async getCoingeckoMarkets(options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko('coins/markets', options);
                
                if(response) {
                    this.coins = [];
                    this.coins = formatCoinsTable(response);
                }
            } catch(error) {
                console.error(error)
            }
            finally {
                this.loading = false;
            }
        },
        
        async getCoingeckoCoin(coinId) {
            this.loading = true;
            
            try {
                const [coinResponse, chartResponse] = await Promise.all([
                    useFetchCoingecko(`coins/${coinId}`),
                    useFetchCoingecko(`coins/${coinId}/market_chart`, {
                        query: {
                            days: 1,
                            precision: 5,
                        }
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
        
        async setTimeframe(timeframe) {
            this.coin.timeframe = timeframe;
            // console.log(this.getRange);
        },
        
        async getCoingeckoCoinChart() {
            const id = this.coin.coingecko.id;
            
            try {
                const response = await useFetchCoingecko(`coins/${id}/market_chart`, {
                    query: {
                        days: this.coin.timeframe,
                        precision: 5,
                    }
                });
                
                if(response) {
                    this.coin.chart = response;
                }
            } catch(error) {
                console.error(error)
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
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        
        async getCoingeckoCoinListSummary(options) {
            try {
                return await useFetchCoingecko('coins/markets', options);
            }
            catch(error) {
                console.error(error);
            }
        },
    },
    
    getters: {
        getRange() {
            return this.coin.ranges.find(range => range.timeframe === this.coin.timeframe);
        },
    }
});
