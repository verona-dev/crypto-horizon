<template>
    <div class='page'>
        <LoadingContent v-if='loading' />
        
        <Card
            v-else
            class='w-full h-full !shadow-2xl'
        >
            <div class='w-full flex flex-col'>
                <!--   Header   -->
                <div class='flex flex-col items-center justify-center gap-8 p-14'>
                    <Title :tag='1' :level='3'>Crypto Treasury Holdings</Title>
                </div>
                
                <!--   Table   -->
                <div>
                    <TreasuriesTable :data='publicTreasury' class='font-mono w-[97%] mx-auto' />
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup>
    import { Badge } from '~/components/ui/badge';
    import { Button } from '~/components/ui/button';
    import { Card } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass } from '~/utils/styleUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index.ts';
    import InfoIcon from '@/components/InfoIcon.vue';
    import LoadingContent from '~/components/LoadingContent.vue';
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import Title from '~/components/Title.vue';
    import TreasuriesTable from '~/components/market/TreasuriesTable.vue';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { loading, publicTreasury } = storeToRefs(MarketStore);
    const { getPublicTreasury } = MarketStore;
    
    // SEO
    const title = 'Crypto Public Treasuries: Transparent On-Chain Funds & Reserves';
    const description = 'Find the most transparent crypto treasuries. See how projects manage their funds, from Bitcoin to Ethereum and beyond, with verified on-chain metrics.';
    
    onMounted(async() => {
        if(!publicTreasury.length) await getPublicTreasury();
    })
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
</script>