import { defineStore } from 'pinia';
import { useCoincapFetchCoin, useFetchCoincapData } from '~/composables/apiCoincap';
import { useFetchCoinLoreData } from '~/composables/apiCoinLore.js';
import { useCoingeckoHistoricalChartData } from '~/composables/apiCoingecko';
import { formatCoin, formatTableCoins, } from '~/utils/formatUtils.js';

export const useCryptocurrenciesStore = defineStore('CryptocurrenciesStore', {
    state: () => ({
        coins: [],
        coin: {},
        coinChartData: {},
        globalMarket: [],
        loading: false,
    }),
    
    actions: {
        async fetchCoinLoreData(route, options) {
            this.loading = true;
            
            try {
                const response = await useFetchCoinLoreData(route, options);
                
                if(route === 'tickers') {
                    this.coins = [];
                    this.coins = formatTableCoins(response.data);
                }
                
                if(route === 'global') {
                    this.globalMarket = [];
                    this.globalMarket = response[0];
                }
                
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        
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
        
        async fetchCoincapCoin(coin) {
            this.loading = true;
            this.coin = {};
            
            try {
                const { data }  = useCoincapFetchCoin(coin);
                this.coin = formatCoin(data);
                console.log(this.coin);
            }
            catch(error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async fetchCoincapMarket() {
            this.loading = true;
            this.coins = [];
            
            try {
                const { data }  = await useFetchCoincapData('assets');
                this.coins = formatTableCoins(data);
            } catch(error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
