<template>
    <div v-if='coin' class='coin-overview w-96'>
        <Table class='text-lg'>
            <TableBody>
                <TableRow>
                    <TableCell>Created</TableCell>
                    <TableCell>{{ coin.age }} days ago</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>All-time high</TableCell>
                    <TableCell>{{ coin.allTimeHighUSDFormatted }}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class='flex items-center'>
                        Markets
                        
                        <HoverCard openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-1'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>The number of markets coin is present at.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    <TableCell>{{ coin.markets }}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Pairs</TableCell>
                    <TableCell>{{ coin.pairs }}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Exchanges</TableCell>
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
