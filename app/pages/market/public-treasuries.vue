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
                    <Title :tag='1' :level='3' class='mt-12'>Crypto Treasury Holdings</Title>
                </div>
                
                <!--   Table   -->
                <div>
                    <Table class='m-8 font-mono'>
                        <TableCaption>A list of Public treasury entities.</TableCaption>
                        <TableHeader class='border-t-2 border-b-2'>
                            <TableRow>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Ticker</TableHead>
                                <TableHead class='text-center'>Country</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Holdings</TableHead>
                                <TableHead>Total Treasury</TableHead>
                                <TableHead>Unrealised PNL</TableHead>
                                
                                <TableHead class='flex items-center gap-1'>
                                    <span>{{ glossary.m_nav.label }}</span>
                                    
                                    <HoverCard :open-delay='200' class='flex'>
                                        <HoverCardTrigger>
                                            <InfoIcon />
                                        </HoverCardTrigger>
                                        
                                        <HoverCardContent>{{ glossary.m_nav.description }}</HoverCardContent>
                                    </HoverCard>
                                </TableHead>
                                
                                <TableHead>
                                    <div class='flex items-center gap-1'>
                                        <span>{{ glossary.total_value_asset_per_share.label }}</span>
                                        
                                        <HoverCard :open-delay='200' class='flex'>
                                            <HoverCardTrigger>
                                                <InfoIcon />
                                            </HoverCardTrigger>
                                            
                                            <HoverCardContent>{{ glossary.total_value_asset_per_share.description }}</HoverCardContent>
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
                                <!--  Name  -->
                                <TableCell class="font-medium">{{ entity.name || '-' }}</TableCell>
                                
                                <!--  Ticker  -->
                                <TableCell>{{ entity.symbol || '-' }}</TableCell>
                                
                                <!--  Country  -->
                                <TableCell class='text-center'>
                                    <span v-if='entity.country === "NO"'>-</span>
                                    <span v-else>{{ entity.country }}</span>
                                </TableCell>
                                
                                <!--  Type  -->
                                <TableCell>
                                    <Badge v-if='entity.type === "company"'>{{ entity.type || '-' }}</Badge>
                                    <Badge v-else variant='secondary'>{{ entity.type || '-' }}</Badge>
                                </TableCell>
                                
                                <!--  Holdings  -->
                                <TableCell class='flex items-center gap-2'>
                                    <template
                                        v-for='coin in entity.holdings'
                                        :key='coin.coin_id'
                                    >
                                        <div class='flex items-center justify-center gap-1'>
                                            <HoverCard :open-delay='200' class='flex'>
                                                <HoverCardTrigger>
                                                    <NuxtIcon
                                                        v-if='coin.coin_id'
                                                        :name='`token-branded:${coin.coin_id}`'
                                                        size='24'
                                                    />
                                                </HoverCardTrigger>
                                                
                                                <HoverCardContent>
                                                    <Title :tag='3' :level='6' class='capitalize'>{{ coin.coin_id }}</Title>
                                                    <p>Holdings: {{ coin.amount }}</p>
                                                    <p>Total entry value USD: {{ coin.total_entry_value_usd }}</p>
                                                    <p>Current value USD: {{ coin.current_value_usd }}</p>
                                                    <p>Unrealised PNL: {{ coin.unrealized_pnl }}</p>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    </template>
                                </TableCell>
                                
                                <!--  Total Treasury Value  -->
                                <TableCell>
                                    {{ formatNumber(entity.total_treasury_value_usd, { compact: true, decimals: 2 }) || '-' }}
                                </TableCell>
                                
                                <!--  Unrealised PNL  -->
                                <TableCell>{{ formatNumber(entity.unrealized_pnl, { compact: true, decimals: 3 }) || '-' }}</TableCell>
                                
                                <!--  nNav  -->
                                <TableCell>{{ entity.m_nav || '-' }}<span v-if='entity.m_nav'>x</span></TableCell>
                                
                                <!--  Total asset value per share in USD -->
                                <TableCell>{{ formatNumber(entity.total_asset_value_per_share_usd, { compact: true, decimals: 3 }) || '-' }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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