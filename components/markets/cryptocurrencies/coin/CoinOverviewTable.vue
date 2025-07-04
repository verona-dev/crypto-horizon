<template>
    <Table class='text-lg'>
        <TableBody>
            <!--  Genesis  -->
            <TableRow v-if='coingecko.genesis_date'>
                <TableCell>Created</TableCell>
                <TableCell>{{ dayjs(coingecko.genesis_date).format('DD.MM.YYYY') }}</TableCell>
            </TableRow>
            
            <!--  ATH  -->
            <TableRow v-if='livecoinwatch.allTimeHighUSD'>
                <TableCell>
                    <p class='block'>All-time high</p>
                    {{ dayjs(coingecko.market_data.ath_date.usd).format('DD.MM.YYYY') }}
                </TableCell>
                
                <TableCell>
                    <p class='block'>{{ coingecko.market_data.ath.usd }}</p>
                    <p :class='coingecko.market_data.ath_change_percentage_trend'>
                        {{ coingecko.market_data.ath_change_percentage.usd }}&#37;
                    </p>
                </TableCell>
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
            <TableRow v-if='coingecko.hashing_algorithm'>
                <TableCell class='flex items-center'>
                    Hashing algorithm
                </TableCell>
                <TableCell>{{ coingecko.hashing_algorithm }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>

<script setup>
    import dayjs from 'dayjs';
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const livecoinwatch = toRef(coin.value.livecoinwatch);
    const coingecko = toRef(coin.value.coingecko);
</script>

<style scoped>

</style>