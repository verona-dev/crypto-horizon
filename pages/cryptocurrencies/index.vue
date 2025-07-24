<template>
    <div>
        <GlobalCrypto />
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalCrypto from '~/components/markets/cryptocurrencies/GlobalCrypto.vue';
    import CoinsTable from '~/components/markets/cryptocurrencies/CoinsTable.vue';
    
    // CryptocurrenciesStore
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { fetchCoindeskNews } = CryptocurrenciesStore;
    
    onMounted(async() => {
        await fetchCoindeskNews();
    });
</script>