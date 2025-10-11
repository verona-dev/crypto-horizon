<template>
    <Card class='!w-screen !h-20 bg-background/50 p-0 !m-0 animate-fadeIn'>
        <Skeleton
            v-if='!markets'
            class='w-full h-full'
        />
        
        <div
            v-else
            class='flex flex-row justify-center items-center gap-12 h-full w-full'
        >
            <CardContent
                v-for='item in data'
                :key='item.label'
                class='flex items-center gap-2 p-0'
            >
                <p class='text-xs'>{{ item.label }}&#58;</p>
                
                <p v-if='item.value_formatted' class='font-bold text-xs'>{{ item.value_formatted }}</p>
                <p v-else class='font-bold text-xs'>{{ item.value }}</p>
                
                <Badge
                    v-if='item.trend'
                    variant='outline'
                    class='pl-2 pr-3 py-1 ml-1'
                >
                    <NuxtIcon
                        :name='getTrendIcon(item.value)'
                        size='15'
                        :class='getTextColorClass(item.trend)'
                    />
                    
                    {{ item.trend }}
                </Badge>
            </CardContent>
        </div>
    </Card>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);
    
    import { Card, CardContent } from '~/components/ui/card/index.js';
    import { Badge } from '@/components/ui/badge';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalMarket } = storeToRefs(MarketStore);
    
    const active_cryptocurrencies = computed(() => formatNumber(globalMarket.value?.active_cryptocurrencies, {
        style: 'decimal', decimals: 0,
    }));
    const markets = computed(() => globalMarket.value?.markets);
    
    const mcap_total = computed(() => globalMarket.value?.total_market_cap?.usd);
    const mcap_total_label =  computed(() => formatNumber(mcap_total.value, {
        compact: true, decimals: 2
    }));
    const mcap_change = computed(() => globalMarket.value?.market_cap_change_percentage_24h_usd);
    const mcap_change_label = computed(() => formatNumber(mcap_change.value, {
        style: 'percent', compact: true, decimals: 2
    }));
    
    const total_volume = computed(() => globalMarket.value?.total_volume?.usd);
    const total_volume_label = computed(() => formatNumber(total_volume.value, {
        compact: true, decimals: 2
    }));
    
    const ongoing_icos = computed(() => globalMarket.value?.ongoing_icos);
    
    const data = computed(() => [
        {
            label: 'Coins',
            value: active_cryptocurrencies.value || '-',
        },
        {
            label: 'Exchanges',
            value: markets.value || '-',
        },
        {
            label: 'Market Cap',
            value: mcap_total.value || '-',
            value_formatted : mcap_total_label.value,
            trend: mcap_change_label || '-',
        },
        {
            label: '24h Volume',
            value: total_volume.value || '-',
            value_formatted : total_volume_label.value,
        },
        {
            label: 'Ongoing ICO',
            value: ongoing_icos.value || '-',
        },
    ]);
</script>

<style scoped>
    [data-slot='card'] {
        margin: 20px !important;
        width: 400px;
    }
</style>