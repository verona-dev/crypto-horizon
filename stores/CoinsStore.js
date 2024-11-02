import { defineStore } from 'pinia';
import {
    useCoincapApiFetchCoins,
    useCoincapApiFetchCoin,
} from '~/composables/apiCoincap';
import {
    formatCoin,
    formatTableCoins,
} from '~/utils/formatUtils.js';

export const useCoinsStore = defineStore('CoinsStore', {
    state: () => ({
        loading: false,
        coins: [],
        coin: {},
    }),
    
    actions: {
        async fetchCoincapCoins() {
            this.loading = true;
            this.coins = [];
            
            try {
                const { data }  = await useCoincapApiFetchCoins();
                this.coins = formatTableCoins(data);
                console.log(JSON.parse(JSON.stringify(this.coins[0])));
            }
            catch(error) {
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
                const { data }  = await useCoincapApiFetchCoin(coin);
                this.coin = formatCoin(data);
                console.log(JSON.parse(JSON.stringify(this.coin)));
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
