<template>
    <section class='coin-links gap-y-20 lg:gap-0'>
        <!--  Overview Table  -->
        <CoinOverviewTable :coin='coin' />
        
        <!--  Delta  -->
        <CoinDelta :livecoinwatch='livecoinwatch' />
    </section>
</template>

<script setup>
    import CoinOverviewTable from '@/components/markets/cryptocurrencies/coin/CoinOverviewTable.vue';
    import CoinDelta from '~/components/markets/cryptocurrencies/coin/CoinDelta.vue';
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    const { coin } = toRefs(props);
    const { livecoinwatch } = toRefs(props);
</script>