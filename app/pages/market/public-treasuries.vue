<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
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
                <PublicTreasuriesTable :data='publicTreasury' class='font-mono w-[97%] mx-auto' />
            </div>
        </Card>
    </div>
</template>

<script setup>
    import { Card } from '~/components/ui/card';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import Title from '~/components/Title.vue';
    import PublicTreasuriesTable from '@/components/market/PublicTreasuriesTable.vue';
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { publicTreasury } = storeToRefs(MarketStore);
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