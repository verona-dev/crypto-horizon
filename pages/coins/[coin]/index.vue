<template>
    <div class='single-coin page'>
        <div class='coin-card'>
            <UCard v-if='activeCoin'>
                <div class='coin-header'>
                    <div class='name'>
                        <Icon
                            :name='getIcon(activeCoin.symbol)'
                            size='25'
                        />
                        <h1>{{ activeCoin.name }}</h1>
                    </div>
                    
                    <div class='price'>
                        <h1>{{ formatPrice(activeCoin.priceUsd) }}</h1>
                    </div>
                </div>
                
                <div class='coin-stats'>
                    <UCard class='card'>
                        <p>Market Cap</p>
                        {{ formatNumber(activeCoin?.marketCapUsd) }}
                    </UCard>
                    
                    <UCard class='card'>
                        <p>Volume</p>
                        {{ formatNumber(activeCoin?.volumeUsd24Hr) }}
                    </UCard>
                    
                    <UCard class='card'>
                        <p>Total Supply</p>
                        {{ formatNumber(activeCoin?.supply) }}
                    </UCard>
                    
                    <UCard class='card'>
                        <p>Max Supply</p>
                        {{ formatNumber(activeCoin?.maxSupply) }}
                    </UCard>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import {ref} from 'vue';
    import { formatNumber, formatPrice } from '~/utils/formatUtils.js';
    import { getIcon } from '~/utils/styleUtils';
    // CoinsStore
    import {storeToRefs} from 'pinia';
    import {useCoinsStore} from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    // State
    const { loading, coins, activeCoin } = storeToRefs(CoinsStore);
    
</script>

<style scoped lang='scss'>
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