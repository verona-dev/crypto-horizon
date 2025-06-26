<template>
    <div class='coin-overview w-96'>
        <Table class='text-lg'>
            <TableBody>
                <!--  Created  -->
                <TableRow v-if='coin.age'>
                    <TableCell>Created</TableCell>
                    <TableCell>{{ coin.age }} days ago</TableCell>
                </TableRow>
                
                <!--  ATH  -->
                <TableRow v-if='coin.allTimeHighUSD'>
                    <TableCell>All-time high</TableCell>
                    <TableCell>{{ coin.allTimeHighUSDFormatted }}</TableCell>
                </TableRow>
                
                <!--  Markets  -->
                <TableRow v-if='coin.markets'>
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
                    <TableCell>{{ coin.markets }}</TableCell>
                </TableRow>
                
                <!--  Pairs  -->
                <TableRow v-if='coin.pairs'>
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
                    <TableCell>{{ coin.pairs }}</TableCell>
                </TableRow>
                
                <!--  Exchanges  -->
                <TableRow v-if='coin.exchanges'>
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
                    <TableCell>{{ coin.exchanges }}</TableCell>
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
            default: () => ({}),
        }
    });
    const { coin } = toRefs(props);
</script>