import { defineStore } from 'pinia';
import { useFetchCoinLoreData } from '~/composables/apiCoinLore.js';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { formatCoin, formatCoinsTable, } from '~/utils/formatUtils.js';
import { useFetchLiveCoinWatch } from '~/composables/apiLiveCoinWatch.js';

export const useCryptocurrenciesStore = defineStore('CryptocurrenciesStore', {
    state: () => ({
        coins: [],
        coin: {},
        coinChartData: {},
        marketOverview: [],
        loading: false,
    }),
    
    actions: {
        async fetchCoinLore(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoinLoreData(route, options);
                
                if(route === 'tickers') {
                    this.coins = [];
                    this.coins = formatCoinsTable(response.data);
                }
                
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
                    this.coin = {};
                    this.coin = formatCoin(response);
                }
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        
        async setActiveCoin(symbol) {
            await this.fetchLiveCoinWatch('coins/single', { code: symbol, meta: true });
        },
        
        async fetchCoingecko(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoingecko(route, options);
                
                if(route === 'coins/markets') {
                    this.coins = [];
                    this.coins = formatCoinsTable(response);
                }
            }
            catch(error) {
                console.error(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        /*
        async fetchCoingeckoHistoricalChartData(coin, days) {
            this.loading = true;
            
            try {
                this.coinChartData = await useCoingeckoHistoricalChartData(coin, days);
                console.log(JSON.parse(JSON.stringify(this.coinChartData)));
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        */
    },
});
