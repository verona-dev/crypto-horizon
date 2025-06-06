<template>
    <div class='cryptocurrencies'>
        <CryptocurrenciesGlobal />
        <CryptocurrenciesTable />
    </div>
</template>

<script setup>
    import CryptocurrenciesGlobal from '~/components/markets/CryptocurrenciesGlobal.vue';
    import CryptocurrenciesTable from '~/components/markets/CryptocurrenciesTable.vue';
</script>