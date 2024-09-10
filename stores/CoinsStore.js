import { defineStore } from 'pinia';
import { useCoincapApiFetch } from '~/composables/apiCoincap';

export const useCoinsStore = defineStore('CoinsStore', {
    state: () => ({
        loading: false,
        coins: [],
    }),
    
    actions: {
        async fetchCoins() {
            this.loading = true;
            
            try {
                const { data }  = await useCoincapApiFetch('/assets');
                this.coins = data;
                console.log(JSON.parse(JSON.stringify(this.coins)));
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
