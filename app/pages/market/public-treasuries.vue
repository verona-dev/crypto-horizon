<template>
    <div class='page'>
        <LoadingContent v-if='loading' />
        
        <div v-else class='flex flex-wrap gap-16 justify-center'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead class=''>Company Name</TableHead>
                        <TableHead>Ticker</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Current Value</TableHead>
                        <TableHead>Unrealised PNL</TableHead>
                        <TableHead class="text-right">Market to Net asset value</TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    <TableRow
                        v-for='entity in publicTreasury'
                        :key='entity.id'
                    >
                        <TableCell class="font-medium">{{ entity.name }}</TableCell>
                        <TableCell>{{ entity.symbol }}</TableCell>
                        <TableCell>{{ entity.country }}</TableCell>
                        <TableCell>{{ entity.type }}</TableCell>
                        <TableCell>{{ entity.total_treasury_value_usd }}</TableCell>
                        <TableCell>{{ entity.unrealized_pnl }}</TableCell>
                        <TableCell class="text-right">{{ entity.m_nav }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card, CardHeader, CardDescription, CardContent } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    import LoadingContent from '~/components/LoadingContent.vue';
    import Title from '~/components/Title.vue';
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    
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