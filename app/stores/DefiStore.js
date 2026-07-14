import { defineStore } from 'pinia';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useLoadingStore } from '@/stores/LoadingStore.js';

export const useDefiStore = defineStore('DefiStore', {
    state: () => ({
        globalDefi: {},
    }),
    
    actions: {
        async getCoingeckoGlobalDefi() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchCoingecko('global/decentralized_finance_defi');
                
                if(response && response.data) {
                    this.globalDefi = response.data;
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
    },
});