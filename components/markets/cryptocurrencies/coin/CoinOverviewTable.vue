<template>
    <div class='flex flex-col'>
        <div class='flex items-center mb-4'>
            <NuxtIcon
                name='bitcoin-icons:sign-outline'
                size='45'
                class='mr-2 min-w-14'
            />
            <h5>Overview</h5>
        </div>
        
        <Table class='text-md'>
            <TableBody>
                <!--  Genesis  -->
                <TableRow v-if='genesis_date'>
                    <TableCell>Created</TableCell>
                    <TableCell class='flex flex-col'>
                        {{ genesis_date_label }}
                        <span class='text-sm text-muted-custom'>{{ generis_date_from_now }}</span>
                    </TableCell>
                </TableRow>
                
                <!--  ATH  -->
                <TableRow v-if='ath_price'>
                    <TableCell>
                        All-Time High
                        
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>All-time high and Price Change from All-Time High &#40;&#37;&#41;.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    
                    <TableCell class='flex flex-col !items-end'>
                        <!--  ATH Price  -->
                        <div class='flex items-center'>
                            <span>{{ ath_price }}</span>
                            
                            <div class='ml-2 flex items-center text-sm'>
                                
                                <NuxtIcon
                                    :name='getTrendIcon(ath_change_percentage)'
                                    size='20'
                                    :class='getTextColor(ath_change_percentage)'
                                />
                                <span :class='getTextColor(ath_change_percentage)'>{{ ath_change_percentage_label }}</span>
                            </div>
                        </div>
                        
                        <!--  ATH Date -->
                        <div class='text-muted-custom text-sm'>
                            <span>{{ ath_date_label }}</span>
                            <span>&#40;{{ ath_date_from_now }}&#41;</span>
                        </div>
                    </TableCell>
                </TableRow>
                
                <!--  Markets  -->
                <TableRow v-if='markets'>
                    <TableCell>
                        Markets
                        
                        <HoverCard :openDelay='200'>
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
                    <TableCell>{{ markets }}</TableCell>
                </TableRow>
                
                <!--  Pairs  -->
                <TableRow v-if='pairs'>
                    <TableCell>
                        Pairs
                        
                        <HoverCard :openDelay='200'>
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
                    <TableCell>{{ pairs }}</TableCell>
                </TableRow>
                
                <!--  Exchanges  -->
                <TableRow v-if='exchanges'>
                    <TableCell>
                        Exchanges
                        
                        <HoverCard :openDelay='200'>
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
                    <TableCell>{{ exchanges }}</TableCell>
                </TableRow>
                
                <!--  Hashing algorithm  -->
                <TableRow v-if='hashing_algorithm'>
                    <TableCell>Hashing Algorithm</TableCell>
                    <TableCell>{{ hashing_algorithm }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);
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
    
    const genesis_date = coingecko.value?.genesis_date;
    const generis_date_from_now = dayjs(genesis_date).fromNow();
    const genesis_date_label = dayjs(genesis_date).format('DD.MM.YYYY');
    
    const markets = livecoinwatch.value?.markets;
    const pairs = livecoinwatch.value?.pairs;
    const exchanges = livecoinwatch.value?.exchanges;
    const hashing_algorithm = coingecko.value?.hashing_algorithm;
    
    const ath_price = coingecko.value?.market_data?.ath?.usd;
    const ath_date = coingecko.value?.market_data?.ath_date?.usd;
    const ath_date_from_now = dayjs(ath_date).fromNow();
    const ath_date_label = dayjs(ath_date).format('MMM D, YYYY');
    const ath_change_percentage = coingecko.value?.market_data?.ath_change_percentage?.usd;
    const ath_change_percentage_label = formatNumber(ath_change_percentage, { style: 'percent', truncate: true });
    
    const atl_price = coingecko.value?.market_data.atl?.usd;
    const atl_date = coingecko.value?.market_data?.atl_date?.usd;
    const atl_date_from_now = dayjs(atl_date).fromNow();
    const atl_date_label = dayjs(atl_date).format('MMM D, YYYY');
    const atl_change_percentage = coingecko.value?.market_data?.atl_change_percentage?.usd;
</script>

<style scoped>
    [data-slot='table-row'] {
        align-items: baseline;
        display: flex;
        justify-content: space-between;
    }
    [data-slot='table-cell'] {
        display: flex;
        align-items: center;
    }
</style>