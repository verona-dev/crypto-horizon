import { defineStore } from 'pinia';
import { useFetchCoingecko } from '~/composables/apiCoingecko';
import { useFetchDefillama } from '~/composables/apiDefillama';
import { useLoadingStore } from '@/stores/LoadingStore.js';

export const useDefiStore = defineStore('DefiStore', {
    state: () => ({
        globalDefi: {},
        protocols: null,
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
        
        async getDefillamaProtocols() {
            const LoadingStore = useLoadingStore();
            LoadingStore.setLoading(true);
            
            try {
                const response = await useFetchDefillama('protocols');
                
                if(response) {
                    this.protocols = response;
                    console.log(JSON.parse(JSON.stringify(this.protocols)));
                }
            } catch(error) {
                console.error(error);
            } finally {
                LoadingStore.setLoading(false);
            }
        },
    },
});