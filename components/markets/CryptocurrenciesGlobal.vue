<template>
    <section class='global-market'>
        <p>Coins: {{ globalMarket.coins_count }};</p>
        <p>Markets: {{ globalMarket.active_markets }};</p>
        <p>Total Market Cap: {{ totalMarketCap }};</p>
        <p>Total Volume: {{ totalVolume }}</p>
        <p>BTC Dominance Index: {{ globalMarket.btc_d }}&#37;</p>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const { globalMarket } = storeToRefs(CryptocurrenciesStore);
    const { fetchCoinLoreData } = CryptocurrenciesStore;
    onMounted(() => fetchCoinLoreData('global'));
    
    const totalMarketCap = computed(() => formatNumber(globalMarket.value?.total_mcap));
    const totalVolume = computed(() => formatNumber(globalMarket.value?.total_volume));
</script>