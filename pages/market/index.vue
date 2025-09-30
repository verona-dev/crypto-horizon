<template>
    <div class='market flex flex-col items-center justify-center'>
        <GlobalMarket />
        <CoinsTable />
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
</script>