<template>
    <div
        class='coin-contracts'
    >
        <h6>Contracts</h6>
        
        <div class='flex items-center'>
            <!--  Main Contract  -->
            <MazBadge
                class='main-badge w-full'
                color='info'
            >
                <div class='py-1.5 pr-4 flex items-center'>
<!--                    <p>{{ platforms[0].chain }}</p>-->
                </div>
            </MazBadge>
            
            <div class='vertical-separator'></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        coin: Object,
        required: true,
    });
    // CryptocurrenciesStore
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { coin } = toRefs(props);

    
    // coin list with market data
</script>

<style scoped>
    .coin-contracts {}
</style>