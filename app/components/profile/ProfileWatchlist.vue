<template>
    <Card v-if='watchlistData.length' class='bg-popover p-6 w-full md:w-4/5 xl:w-full'>
        <Table>
            <TableCaption>A list of your watchlist coins.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class='border w-28'>Rank</TableHead>
                    <TableHead class='border w-64'>Name</TableHead>
                    <TableHead class='border'>Price (USD)</TableHead>
                    <TableHead class='border'>24h Change</TableHead>
                    <TableHead class='border'>Market Cap</TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                <TableRow
                    v-for='coin in watchlistData'
                    :key='coin.id'
                >
                    <TableCell>
                        #{{ coin.market_cap_rank }}
                    </TableCell>
                    
                    <TableCell class='flex items-center gap-2'>
                        <NuxtImg
                            :src='coin.image'
                            alt='coin logo'
                            class='w-8 rounded-full'
                        />
                        
                        <div class='flex items-center gap-2 truncate'>
                            <p class='font-medium'>{{ coin.name }}</p>
                            <p class='uppercase text-muted-foreground'>{{ coin.symbol }}</p>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Card>
</template>

<script setup>
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    
    // ProfileStore
    import { storeToRefs } from 'pinia';
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { watchlistData } = storeToRefs(ProfileStore);
</script>
