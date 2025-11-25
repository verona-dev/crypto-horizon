<template>
    <CardContent class='coin-body animate-fadeIn-2000'>
        <div class='grid grid-cols-1 xl:grid-cols-6 gap-6'>
            <!-- Left -->
            <div class='lg:col-span-2 xl:col-span-2 space-y-6'>
                <!-- Overview -->
                <CoinOverview :coin='coin' />
                
                <!-- Insights -->
                <CoinInsights :coin='coin' />
            </div>
            
            <!-- Right -->
            <div class='lg:col-span-2 xl:col-span-4 space-y-6'>
                <!-- Chart -->
                <CoinChart :coin='coin' />
                
                <!-- Delta -->
                <CoinDelta v-if='market_data' :marketData='market_data' />
                
                <!-- Description -->
                <CoinDescription :coin='coin' />
            </div>
        </div>
    </CardContent>
</template>

<script setup>
    import CoinOverview from '@/components/market/id/CoinOverview.vue';
    import CoinInsights from '@/components/market/id/CoinInsights.vue';
    import CoinChart from '@/components/market/id/CoinChart.vue';
    import CoinDelta from '@/components/market/id/CoinDelta.vue';
    import CoinDescription from '@/components/market/id/CoinDescription.vue';
    import { CardContent } from '~/components/ui/card';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const market_data = computed(() => coingecko.value?.market_data);
</script>