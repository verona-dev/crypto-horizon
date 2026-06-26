<template>
    <div class='page'>
        <LoadingContent v-if='loading' />
        
        <div v-else class='flex flex-wrap gap-16 justify-center'>
            <Table class='font-mono'>
                <TableCaption>A list of Public treasury entities.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Ticker</TableHead>
                        <TableHead class='text-center'>Country</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Current Value</TableHead>
                        <TableHead>Unrealised PNL</TableHead>
                        
                        <TableHead class='flex items-center gap-1'>
                            <span>{{ glossary.m_nav.label}}</span>
                            
                            <HoverCard :open-delay='200' class='flex'>
                                <HoverCardTrigger>
                                    <InfoIcon />
                                </HoverCardTrigger>
                                
                                <HoverCardContent>{{ glossary.m_nav.description}}</HoverCardContent>
                            </HoverCard>
                        </TableHead>
                        
                        <TableHead class='text-right'>
                            <div class='flex items-center gap-1'>
                                <span>{{ glossary.total_value_asset.label }}</span>
                                
                                <HoverCard :open-delay='200' class='flex'>
                                    <HoverCardTrigger>
                                        <InfoIcon />
                                    </HoverCardTrigger>
                                    
                                    <HoverCardContent>{{ glossary.total_value_asset.description }}</HoverCardContent>
                                </HoverCard>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    <TableRow
                        v-for='entity in publicTreasury'
                        :key='entity.id'
                    >
                        <TableCell class="font-medium">{{ entity.name || '-' }}</TableCell>
                        <TableCell>{{ entity.symbol || '-' }}</TableCell>
                        <TableCell class='text-center'>
                            <span v-if='entity.country === "NO"'>-</span>
                            <span v-else>{{ entity.country }}</span>
                        </TableCell>
                        
                        <TableCell>
                            <Badge v-if='entity.type === "company"'>{{ entity.type || '-' }}</Badge>
                            <Badge v-else variant='secondary'>{{ entity.type || '-' }}</Badge>
                        </TableCell>
                        
                        <TableCell>{{ entity.total_treasury_value_usd || '-' }}</TableCell>
                        <TableCell>{{ entity.unrealized_pnl || '-' }}</TableCell>
                        <TableCell>{{ entity.m_nav || '-' }}<span v-if='entity.m_nav'>x</span></TableCell>
                        <TableCell class="text-right">{{ entity.total_asset_value_per_share_usd || '-' }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup>
    import { Badge } from '~/components/ui/badge';
    import { Button } from '~/components/ui/button';
    import { formatNumber } from '~/utils/formatUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index.ts';
    import InfoIcon from '@/components/InfoIcon.vue';
    import LoadingContent from '~/components/LoadingContent.vue';
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
        if(!publicTreasury.length) await getPublicTreasury();
    })
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
</script>