import { defineStore } from 'pinia';
import { useFetchCoinLoreData } from '~/composables/apiCoinLore.js';
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
            timeframe: 7,
            ranges: [
                {
                    name: 'Day',
                    interval: 1,
                    button_label: '1D',
                },
                {
                    name: 'Week',
                    interval: 7,
                    button_label: '7D',
                },
                {
                    name: 'Month',
                    interval: 30,
                    button_label: '30D',
                },
                {
                    name: 'Year',
                    interval: 365,
                    button_label: '1Y',
                },
            ],
        },
        loading: false,
        marketOverview: [],
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
        
        async getCoingeckoMarkets(options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko('coins/markets', options);
                
                if(response) {
                    this.coins = [];
                    this.coins = formatCoinsTable(response);
                }
            }
            catch(error) {
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
            console.log('setTimeframe', timeframe);
            this.coin.timeframe = timeframe;
        },
        
        async getCoingeckoCoinChart(timeframe) {
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
        
        async getCoinLore(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoinLoreData(route, options);
                
                if(response && route === 'global') {
                    this.marketOverview = [];
                    this.marketOverview = response[0];
                }
                
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
    
    getters: {
        getRange() {
            return this.coin.ranges.find(range => range.interval === this.coin.timeframe);
        },
    }
});
