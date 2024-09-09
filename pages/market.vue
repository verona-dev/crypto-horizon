<template>
    <div class='market component'>
        Market
        <UButton
            @click='fetchTokens'
            :loading='loading'
            color='pink'
            variant='outline'
        >
            Fetch
        </UButton>
        
        {{ computedNames }}
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    // CoinsStore
    import { storeToRefs } from 'pinia';
    import { useCoinsStore } from '@/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    // State
    const { coins, loading } = storeToRefs(CoinsStore);
    const computedNames = computed(() => coins[0]?.name);
    const searchedCoins = ref('ethereum');
    console.log(searchedCoins);
    const contract = ref('0xdF574c24545E5FfEcb9a659c229253D4111d87e1,coingecko:ethereum');
    
    // Methods
    const { searchCoins } = CoinsStore;
    const fetchTokens = async () => {
        console.log(searchedCoins.value, contract.value);
        const { data } = await searchCoins(searchedCoins.value, contract.value);
        console.log(data);
        coins.value = data;
    };
</script>

<style scoped lang='scss'>
    .market {}
</style>