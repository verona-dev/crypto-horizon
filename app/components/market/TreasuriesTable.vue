<template>
    <Table v-if='data.length'>
        <TableCaption class='py-6'>A list of public treasury entities.</TableCaption>
        
        <TableHeader class='border-t-2 border-b-2'>
            <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead class='text-center min-w-32'>Country</TableHead>
                <TableHead>Type</TableHead>
                <TableHead class='text-center min-w-32'>Holdings</TableHead>
                <TableHead>Today Value</TableHead>
                <TableHead>Unrealised PNL</TableHead>
                
                <!--  mNav  -->
                <!--
                <TableHead class='flex items-center gap-1'>
                    <span>{{ glossary.m_nav.label }}</span>
                    
                    <HoverCard :open-delay='200' class='flex'>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger>
                        
                        <HoverCardContent>{{ glossary.m_nav.description }}</HoverCardContent>
                    </HoverCard>
                </TableHead>
                -->
                
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
                v-for='entity in data'
                :key='entity.id'
                class='min-h-12'
            >
                <!--  Name  -->
                <TableCell class='font-medium'>{{ entity.name || '-' }}</TableCell>
                
                <!--  Ticker  -->
                <TableCell>{{ entity.symbol || '-' }}</TableCell>
                
                <!--  Country  -->
                <TableCell class='flex justify-center h-full'>
                    <div v-if='entity.country === "NO"'>-</div>
                    <div v-else class='flex items-center gap-2'>
                        <NuxtIcon
                            :name="`circle-flags:${entity.country.toLowerCase()}`"
                            size='18px' class='self-center'
                        />
                        
                        <span>{{ entity.country }}</span>
                    </div>
                </TableCell>
                
                <!--  Type  -->
                <TableCell>
                    <Badge v-if='entity.type === "company"'>{{ entity.type || '-' }}</Badge>
                    <Badge v-else variant='secondary'>{{ entity.type || '-' }}</Badge>
                </TableCell>
                
                <!--  Holdings  -->
                <TableCell class='flex items-center justify-center flex-wrap gap-4 h-full'>
                    <HoverCard
                        v-for='coin in entity.holdings'
                        :key='coin.coin_id'
                        :open-delay='200'
                    >
                        <HoverCardTrigger class='flex items-center justify-center'>
                            <Button variant='outline' class='!w-12 !h-12 !p-2'>
                                <NuxtIcon
                                    v-if='coin.coin_id'
                                    :name='`simple-icons:${coin.coin_id}`'
                                    size='24'
                                />
                            </Button>
                        </HoverCardTrigger>
                        
                        <HoverCardContent>
                            <Title :tag='3' :level='5' class='capitalize'>{{ coin.coin_id }}</Title>
                            
                            <p class='text-muted-foreground'>Holdings: <span class='text-foreground'>{{ coin.amount }}</span></p>
                            <p class='text-muted-foreground'>Total entry value:
                                <span class='text-foreground'>{{
                                        formatNumber(coin.total_entry_value_usd, {
                                            compact: true,
                                            decimals: 2
                                        })}}
                                                        </span>
                            </p>
                            <p class='text-muted-foreground'>Current value:
                                <span class='text-foreground'>{{
                                        formatNumber(coin.current_value_usd, {
                                            compact: true,
                                            decimals: 2
                                        })}}
                                                        </span>
                            </p>
                            <p class='text-muted-foreground'>Unrealised PNL:
                                <span
                                    class='text-foreground'
                                    :class='getTrendClass(coin.unrealized_pnl)'
                                >{{
                                        formatNumber(coin.unrealized_pnl, {
                                            compact: true,
                                            decimals: 2
                                        })}}
                                                        </span>
                            </p>
                            <p class='text-muted-foreground'>% of total supply:
                                <span class='text-foreground'>{{
                                        formatNumber(coin.percentage_of_total_supply, {
                                            style: 'percent',
                                            decimals: 2
                                        })}}
                                                        </span>
                            </p>
                        </HoverCardContent>
                    </HoverCard>
                </TableCell>
                
                <!--  Total Treasury Value  -->
                <TableCell>
                    {{ formatNumber(entity.total_treasury_value_usd, { compact: true, decimals: 2 }) || '-' }}
                </TableCell>
                
                <!--  Unrealised PNL  -->
                <TableCell :class='getTrendClass(entity.unrealized_pnl)'>{{ formatNumber(entity.unrealized_pnl, { compact: true, decimals: 2 }) || '-' }}</TableCell>
                
                <!--  nNav  -->
                <!--
                <TableCell>{{ entity.m_nav || '-' }}<span v-if='entity.m_nav'>x</span></TableCell>
                -->
                
                <!--  Total asset value per share in USD -->
                <TableCell>{{ formatNumber(entity.total_asset_value_per_share_usd, { compact: true, decimals: 2 }) || '-' }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
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
    
    const props = defineProps({
        data: {
            type: Array,
            required: true,
        },
    });
    
    const { data } = toRefs(props);
</script>