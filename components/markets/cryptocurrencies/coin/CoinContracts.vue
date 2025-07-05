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
                </div>
            </MazBadge>
            
            <div class='vertical-separator'></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        coin: [],
        required: true,
    });
    // CryptocurrenciesStore
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { coin } = toRefs(props);
    const { getCoingeckoContractListCoins } = CryptocurrenciesStore;
    let ids = [];
    
    const contracts = Object.entries(coin.value.platforms).map(([key, value]) => ({
        'name': key,
        'contract': value
    }));
    
    console.log('contracts: ' ,contracts);
    
    contracts.forEach((contract) => {
        ids.push(contract.name);
    });
    
    console.log(ids);
    
    // coin list with market data
    onMounted(async() => {
        const response = await getCoingeckoContractListCoins({
            query: {
                ids
            }
        });
        if(response) console.log('getCoingeckoContractListCoins: ', response);
    });
</script>

<style scoped>
    .coin-contracts {}
</style>