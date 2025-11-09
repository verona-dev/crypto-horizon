<template>
    <!--  Price Performance 24h -->
    <div class='coin-performance flex flex-col gap-4'>
        <!--  Price Title  -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='ph:speedometer'
                size='22'
                class='mt-0.5'
            />
            <h4>Price Performance</h4>
        </div>
        
        <!--  Price Data -->
        <div class='flex flex-col gap-2'>
            <div class='flex justify-between items-end text-sm'>
                <div class='flex flex-col gap-1'>
                    <span class='text-muted-foreground'>Low</span>
                    <p>{{ low_24h_label }}</p>
                </div>
                
                <span class='text-muted-foreground'>24h Range</span>
                
                <div class='flex flex-col gap-1'>
                    <span class='text-sm text-muted-foreground'>High</span>
                    <p>{{ high_24h_label }}</p>
                </div>
            </div>
            
            <Progress
                v-model='progress'
                :indicatorColor='progress_color'
            />
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    import { Progress } from '~/components/ui/progress';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    
    const current_price = coingecko.value?.market_data?.current_price?.usd;
    const low_24h = coingecko.value?.market_data?.low_24h?.usd;
    const low_24h_computed = computed(() => {
        // Coingecko Api has delays in updating the low24h value therefore the current price can temporarily be under the low24h
        if(current_price < low_24h) return current_price;
        return low_24h;
    });
    const low_24h_label = formatNumber(low_24h_computed.value, {
        maximumFractionDigits: 4,
    });
    const high_24h = coingecko.value?.market_data?.high_24h?.usd;
    const high_24h_computed = computed(() => {
        // Coingecko Api has delays in updating the high24h value therefore the current price can temporarily be above the high24h
        if(current_price > high_24h) return current_price;
        return high_24h;
    });
    const high_24h_label = formatNumber(high_24h_computed.value, {
        maximumFractionDigits: 4,
    });
    
    const progress = computed(() => {
        const range = high_24h_computed.value - low_24h_computed.value;
        if (range < 0.005) return 99; // for stablecoins, since range can be as low as .001
        return ((current_price - low_24h_computed.value) / range) * 100;
    });
    const progress_color = computed(() => {
        if(progress.value < 25) return '#E32D2D';
        else if(progress.value < 50) return 'linear-gradient(90deg, #E32D2D 75%, #EBAA28 100%)';
        return 'linear-gradient(90deg, #E32D2D 0%, #EBAA28 50%, #1AC914 100%)';
    });
</script>