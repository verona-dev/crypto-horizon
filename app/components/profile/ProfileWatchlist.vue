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
                    <TableHead>Market Cap</TableHead>
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
                </TableRow>
            </TableBody>
        </Table>
    </Card>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass, getTrendIcon } from '~/utils/styleUtils.js';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    
    // ProfileStore
    import { storeToRefs } from 'pinia';
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { watchlistData } = storeToRefs(ProfileStore);
</script>
