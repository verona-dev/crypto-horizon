<template>
    <section class='cryptocurrencies'>
        <CryptocurrenciesTable />
    </section>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    import CryptocurrenciesTable from '~/components/CryptocurrenciesTable.vue';
    
    // State
    const { coins } = storeToRefs(CryptocurrenciesStore);
    
    // Methods
    const { fetchCoinLoreMarket } = CryptocurrenciesStore;
    
    const onRowClick = row => navigateTo(`/cryptocurrencies/${row.id.toLowerCase()}`);
    
    onMounted(() => fetchCoinLoreMarket());
</script>