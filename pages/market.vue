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
        {{coins[0]?.id}}
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    // CoinsStore
    import { storeToRefs } from 'pinia';
    import { useCoinsStore } from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    // State
    const { loading, coins } = storeToRefs(CoinsStore);
    
    // Methods
    const { fetchCoins } = CoinsStore;
    const fetchTokens = async () => {
        await fetchCoins();
    };
    
    onMounted(async() => {
        await fetchTokens();
    });
</script>

<style scoped lang='scss'>
    .market {}
</style>