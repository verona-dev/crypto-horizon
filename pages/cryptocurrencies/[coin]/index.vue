<template>
    <div class='single-coin'>
        This is single coin page
<!--
        <UCard
            v-if='coin'
            class='coin-card'
        >
            <div class='coin-header'>
                <div class='name'>
                    <Icon
                        v-if='coin.icon'
                        :name='coin.icon'
                        size='25'
                    />
                    <h1>{{ coin.name }}</h1>
                </div>
                
                <div class='price'>
                    <h1>{{ coin.price }}</h1>
                </div>
            </div>
            
            <div class='coin-stats'>
                <UCard class='card'>
                    <h3>Market Cap</h3>
                    {{ coin?.marketCap }}
                </UCard>
                
                <UCard class='card'>
                    <h3>Volume</h3>
                    {{ coin?.volume }}
                </UCard>
                
                <UCard v-if='coin.supply' class='card'>
                    <h3>Total Supply</h3>
                    {{ coin?.supply }}
                </UCard>
                
                <UCard v-if='coin.explorer' class='card'>
                    <h3>Explorer</h3>
                    <NuxtLink
                        :href='coin?.explorer'
                        target='_blank'
                        rel='noopener noreferrer'
                        class='text-indigo-400 hover:text-indigo-500'
                    >
                        {{ coin?.explorer }}
                    </NuxtLink>
                </UCard>
            </div>
        </UCard>
        -->
    </div>
</template>

<script setup lang='ts'>
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    // const CoinsStore = useCryptocurrenciesStore();
    
    // State
    // const { coin } = storeToRefs(CryptocurrenciesStore);
    
    
    onMounted(async() => {
        // await fetchCoincapCoin(route.params.coin)
        // await fetchCoingeckoHistoricalChartData(route.params.coin, 1)
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