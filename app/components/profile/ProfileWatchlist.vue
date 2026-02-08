<template>
    <Card v-if='watchlistData.length' class='bg-popover p-6 w-full md:w-4/5 xl:w-full'>
        <Table>
            <TableCaption>A list of your watchlist coins.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h &#37;</TableHead>
                    <TableHead class='w-32'>
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex flex-reverse !justify-start items-center gap-1'>
                                <InfoIcon />
                                <span>{{ glossary.market_cap.label }}</span>
                            </HoverCardTrigger>
                            <HoverCardContent> {{ glossary.market_cap.description }}</HoverCardContent>
                        </HoverCard>
                    </TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                <TableRow
                    v-for='coin in watchlistData'
                    :key='coin.id'
                >
                    <TableCell>&#35;{{ coin.market_cap_rank }}</TableCell>
                    
                    <TableCell class='flex items-center gap-2'>
                        <NuxtImg
                            :src='coin.image'
                            alt='coin logo'
                            class='w-6 rounded-full'
                        />
                        
                        <div class='flex items-center gap-2 truncate'>
                            <p class='font-medium'>{{ coin.name }}</p>
                            <p class='uppercase text-muted-foreground'>{{ coin.symbol }}</p>
                        </div>
                    </TableCell>
                    
                    <TableCell>{{ formatNumber(coin.current_price, { maximumFractionDigits: 4 }) }}</TableCell>
                    
                    <TableCell :class='getTrendClass(coin.price_change_percentage_24h)'>
                        <div class='flex items-center gap-1'>
                            <NuxtIcon
                                :name='getTrendIcon(coin.price_change_percentage_24h)'
                                size='13'
                            />
                            <span>{{ formatNumber(coin.price_change_percentage_24h, { style: 'percent' }) }}</span>
                        </div>
                    </TableCell>
                    
                    <TableCell>
                    {{ formatNumber(coin.market_cap, { compact: true, decimals: 2 }) }}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass, getTrendIcon } from '~/utils/styleUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    
    // ProfileStore
    import { storeToRefs } from 'pinia';
    import { useProfileStore } from '~/stores/ProfileStore.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index.ts';
    import InfoIcon from '@/components/InfoIcon.vue';
    const ProfileStore = useProfileStore();
    const { watchlistData } = storeToRefs(ProfileStore);
    
    /*
    const watchlist = ref([
        {
            ath: 3.65,
            ath_change_percentage: -60.93771,
            ath_date: "2025-07-18T03:40:53.808Z",
            atl: 0.00268621,
            atl_change_percentage: 52924.91024,
            atl_date: "2014-05-22T00:00:00.000Z",
            circulating_supply: 60917315351,
            current_price: 1.42,
            fully_diluted_valuation: 142237794778,
            high_24h: 1.53,
            id: "ripple",
            image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
            last_updated: "2026-02-07T12:30:02.474Z",
            low_24h: 1.37,
            market_cap: 86659820107,
            market_cap_change_24h: 3063892668,
            market_cap_change_percentage_24h: 3.66512,
            market_cap_rank: 5,
            max_supply: 100000000000,
            name: "XRP",
            price_change_24h: 0.054315,
            price_change_percentage_24h: 3.96444,
            roi: null,
            symbol: "xrp",
            total_supply: 99985721048,
            total_volume: 9807206076,}
    ]);
    */
</script>
