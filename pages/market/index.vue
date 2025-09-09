<template>
    <div>
        <GlobalMarket />
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    
    definePageMeta({
        title: 'Crypto Market',
    });
</script>