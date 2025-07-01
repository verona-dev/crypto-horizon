<template>
    <div class='coin-overview w-96'>
        <Table class='text-lg'>
            <TableBody>
                <!--  Created  -->
                <TableRow v-if='livecoinwatch.age'>
                    <TableCell>Created</TableCell>
                    <TableCell>{{ livecoinwatch.age }} days ago</TableCell>
                </TableRow>
                
                <!--  ATH  -->
                <TableRow v-if='livecoinwatch.allTimeHighUSD'>
                    <TableCell>All-time high</TableCell>
                    <TableCell>{{ livecoinwatch.allTimeHighUSDFormatted }}</TableCell>
                </TableRow>
                
                <!--  Markets  -->
                <TableRow v-if='livecoinwatch.markets'>
                    <TableCell class='flex items-center'>
                        Markets
                        
                        <HoverCard openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of markets the coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ livecoinwatch.markets }}</TableCell>
                </TableRow>
                
                <!--  Pairs  -->
                <TableRow v-if='livecoinwatch.pairs'>
                    <TableCell class='flex items-center'>
                        Pairs
                        
                        <HoverCard openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of unique markets the coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ livecoinwatch.pairs }}</TableCell>
                </TableRow>
                
                <!--  Exchanges  -->
                <TableRow v-if='livecoinwatch.exchanges'>
                    <TableCell class='flex items-center'>
                        Exchanges
                        
                        <HoverCard openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of exchanges the coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ livecoinwatch.exchanges }}</TableCell>
                </TableRow>
                
                <!--  Hashing algorithm  -->
                <TableRow v-if='coinGecko.hashing_algorithm'>
                    <TableCell class='flex items-center'>
                        Hashing algorithm
                    </TableCell>
                    <TableCell>{{ coinGecko.hashing_algorithm }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup>
    import {
        Table,
        TableBody,
        TableCell,
        TableRow,
    } from '@/components/ui/table';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    const { coin } = toRefs(props);
    const livecoinwatch = toRef(coin.value.livecoinwatch);
    const coinGecko = toRef(coin.value.coingecko);
</script>