<template>
    <section class='coin-links'>
        <div class='flex gap-y-20 gap-x-36 flex-col xl:flex-row'>
            <!--  Overview Table  -->
            <CoinOverviewTable :coin='coin' />
        </div>
    </section>
    
    <Separator class='my-4' />
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
</script>