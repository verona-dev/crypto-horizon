import { defineStore } from 'pinia';
import { useFetch } from '#app';

export const useCoinsStore = defineStore('CoinsStore', {
    state: () => ({
        coins: [],
        loading: false,
    }),
    actions: {
        async searchCoins(coins, contract) {
            try {
            this.loading = true;
                const { data } = await useFetch(`https://coins.llama.fi/prices/current/${coins}:${contract}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                
                if(!data) return;
                
                console.log(data)
                
                this.coins = data;
            } catch (err) {
                console.error(err)
            } finally {
                this.loading = false;
            }
        },
    },
});