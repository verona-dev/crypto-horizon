import { defineStore } from 'pinia';
import { useCoincapFetchCoin, useFetchCoincapData } from '~/composables/apiCoincap';
import { useCoingeckoHistoricalChartData } from '~/composables/apiCoingecko';
import { formatCoin, formatTableCoins, } from '~/utils/formatUtils.js';

export const useCryptocurrenciesStore = defineStore('CryptocurrenciesStore', {
    state: () => ({
        loading: false,
        coins: [],
        coin: {},
        coinChartData: {},
    }),
    
    actions: {
        async fetchCoincapMarket() {
            this.loading = true;
            this.coins = [];
            
            try {
                const { data }  = await useFetchCoincapData('assets');
                // console.log('data: ', data);
                this.coins = formatTableCoins(data);
                console.log(JSON.parse(JSON.stringify(this.coins)));
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
                const { data }  = await useCoincapFetchCoin(coin);
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
    },
});
