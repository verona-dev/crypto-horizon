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
    
    const { getCoindeskNews } = CryptocurrenciesStore;
    
    onMounted(async() => {
        await getCoindeskNews();
    });
</script>