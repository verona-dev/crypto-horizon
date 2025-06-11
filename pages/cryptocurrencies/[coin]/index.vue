<template>
    <div class='single-coin custom-flex'>
        This is single coin page {{ coin }}
    </div>
</template>

<script setup>
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { coin } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { setActiveCoin } = CryptocurrenciesStore;
    
    onMounted(() => {
        setActiveCoin(route.params.coin);
    });
</script>

<style scoped>
    .single-coin {
        
        .coin-card {
            width: 1000px;
            
            .coin-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                
                .name {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    
                    h1 {
                        font-size: 2rem;
                        color: var(--color-pink_cabaret);
                    }
                }
            }
            
            .coin-stats {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                
                .card {
                    margin: 25px;
                    width: 300px;
                }
            }
        }
    }
</style>