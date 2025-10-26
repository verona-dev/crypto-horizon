<template>
    <Card class='bg-background/50 !w-screen !h-20 p-0 !m-0 border-none'>
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
                class='flex items-center gap-2 p-0 animate-fadeIn'
            >
                <p class='text-xs'>{{ item.label }}&#58;</p>
                
                <p v-if='item.value_formatted' class='font-bold text-xs'>{{ item.value_formatted }}</p>
                <p v-else class='font-bold text-xs'>{{ item.value }}</p>
                
                <HoverCard :openDelay='200' v-if='item.trend'>
                    <HoverCardTrigger>
                        <Badge
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
                    </HoverCardTrigger>
                    
                    <!--  Ico Description -->
                    <HoverCardContent>Cryptocurrencies market cap change percentage in 24 hours in $USD.</HoverCardContent>
                </HoverCard>
            </CardContent>
        </div>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);
    
    import { Skeleton } from '~/components/ui/skeleton';
    import { Card, CardContent } from '~/components/ui/card';
    import { Badge } from '~/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index.js';
    
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
        style: 'percent',
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