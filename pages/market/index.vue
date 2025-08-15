<template>
    <div class='flex flex-col items-center gap-20'>
        <h1 class='mt-10'>Crypto Market</h1>
        <GlobalMarket />
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
</script>0