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
            await this.getCoingeckoCoin(`coins/${coinId}`);
            this.coin.symbol = this.coin?.coingecko?.symbol?.toUpperCase() || '';
            await this.fetchLiveCoinWatch('coins/single', { code: this.coin.symbol, meta: true });
            await this.getCoingeckoChart(coinId);
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
        
        async getCoingeckoCoin(route) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko(route);
                
                if(response) {
                    this.coin.coingecko = formatCoingeckoCoin(response);
                }
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async getCoingeckoChart(id) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko(`coins/${id}/market_chart`, {
                    query: {
                        days: 6,
                        interval: 'daily',
                    }
                });
                
                if(response) {
                    this.coin.chart = response;
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
                    // console.log(JSON.parse(JSON.stringify(this.coin.coingecko)));
                    // console.log(JSON.parse(JSON.stringify(this.coin.livecoinwatch)));
                }
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
