<template>
    <div class='cryptocurrencies page'>
        <CryptocurrenciesTable />
    </div>
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
    const { fetchCoincapMarket } = CryptocurrenciesStore;
    
    const onRowClick = row => navigateTo(`/cryptocurrencies/${row.id.toLowerCase()}`);
    
    onMounted(() => fetchCoincapMarket());
</script>