<template>
    <div class='page'>
        <LoadingContent v-if='loading' />
        
        <div v-else class='flex flex-wrap gap-16 justify-center'>
            <div
                v-if='publicTreasury.length'
                v-for='entity in publicTreasury'
                :key='entity.id'
            >
                <Card class='w-150 min-h-90 p-4 !rounded-xl hover:border-foreground/15 flex flex-col justify-between'>
                    <CardHeader>
                        {{ entity.id }}
                    </CardHeader>
                    
                    <CardContent>
                    
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card, CardHeader, CardDescription, CardContent } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    import LoadingContent from '~/components/LoadingContent.vue';
    import Title from '~/components/Title.vue';
    
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
        await getPublicTreasury();
    })
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
</script>