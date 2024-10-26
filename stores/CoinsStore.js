import { defineStore } from 'pinia';
import { useCoincapApiFetch } from '~/composables/apiCoincap';

export const useCoinsStore = defineStore('CoinsStore', {
    state: () => ({
        loading: false,
        coins: [],
        activeCoin: null,
    }),
    
    actions: {
        async fetchCoincapCoins() {
            this.loading = true;
            
            try {
                const { data }  = await useCoincapApiFetch('/assets');
                this.coins = data;
            }
            catch(error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        
        async setActiveCoin(symbol) {
            this.loading = true;
            
            try {
                this.activeCoin = symbol;
                // const { data }  = await useCoincapApiFetch(`/assets/${symbol}`);
                // this.activeCoin = data;
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
