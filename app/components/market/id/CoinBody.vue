<template>
    <CardContent class='coin-body animate-fadeIn-2000 grid gap-6 !px-0'>
        <!-- Top -->
        <!-- Supply -->
        <CoinSupply :coin='coin' />
        
        <div class='grid grid-cols-1 xl:grid-cols-9 gap-6'>
            <!-- Left Panel -->
            <div class='xl:col-span-3 space-y-6'>
                <!-- Overview -->
                <CoinOverview :coin='coin' />
                
                <!-- Insights -->
                <CoinInsights :coin='coin' />
            </div>
            
            <!-- Right Panel -->
            <div class='xl:col-span-6 space-y-6'>
                <!-- Chart -->
                <CoinChart :coin='coin' />
                
                <!-- Description -->
                <CoinDescription :coin='coin' />
            </div>
        </div>
        
        <!-- Bottom -->
        <div class='grid gap-6'>
            <!-- Delta -->
            <CoinDelta v-if='market_data' :marketData='market_data' />
            
            <!-- Links -->
            <CoinLinks
                :links='links'
                :symbol='symbol'
            />
            
            <!-- News -->
            <CoinNews :coin='coin' />
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
    import CoinSupply from '@/components/market/id/CoinSupply.vue';
    import CoinLinks from '@/components/market/id/CoinLinks.vue';
    import CoinNews from '@/components/market/id/CoinNews.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const market_data = computed(() => coingecko.value?.market_data);
    const links = computed(() => coin.value?.links);
    const symbol = toRef(coin.value?.symbol);
</script>