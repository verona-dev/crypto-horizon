import { defineStore } from 'pinia';
import { useFetchCoinLoreData } from '~/composables/apiCoinLore.js';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { formatCoingeckoCoin, formatCoinsTable, formatLivecoinwatchCoin } from '~/utils/formatUtils.js';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';

export const useCryptocurrenciesStore = defineStore('CryptocurrenciesStore', {
    state: () => ({
        coins: [],
        coinsList: [],
        coin: {
            coingecko: {},
            livecoinwatch: {},
            symbol: '',
            chart: {},
        },
        loading: false,
        marketOverview: [],
    }),
    
    actions: {
        async getCoin(coinId) {
            await this.getCoingeckoCoin(coinId);
            this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
            await this.fetchLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
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
                            days: 7,
                            precision: 2,
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
        
        async getCoingeckoCoinListSummary(options) {
            try {
                return await useFetchCoingecko('coins/markets', options);
            }
            catch(error) {
                console.error(error);
            }
        },
        
        async fetchCoinLore(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoinLoreData(route, options);
                
                if(route === 'global') {
                    this.marketOverview = [];
                    this.marketOverview = response[0];
                }
                
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        
        async fetchLiveCoinWatch(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchLiveCoinWatch(route, options);
                
                if(route === 'coins/single') {
                    this.coin.livecoinwatch = formatLivecoinwatchCoin(response);
                }
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
