<template>
    <section class='gap-20'>
        <h1 class='page-title'>Crypto Market</h1>
        <GlobalMarket />
        <CoinsTable />
    </section>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
</script>