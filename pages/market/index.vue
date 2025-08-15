<template>
    <div class=''>
        <h1 class='mt-10 mb-40 text-center'>Crypto Market</h1>
        <GlobalMarket />
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
</script>