<template>
<!--    <div class='watchlist'>
        <p
            v-for='coin in watchlist'
            :key='coin'
        >
            {{ coin }}
        </p>
    </div>-->
    <Card class='bg-popover p-6 w-full md:w-4/5 xl:w-full'>
        <Table class=''>
            <TableCaption>A list of your watchlist coins.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class='border w-28'>Symbol</TableHead>
                    <TableHead class='border w-64'>Name</TableHead>
                    <TableHead class='border'>Price</TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                <TableRow
                    v-for='coin in watchlist'
                    :key='coin'
                >
                    <TableCell class="font-medium">INV001</TableCell>
                    <TableCell>{{ coin }}</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Card>
</template>

<script setup>
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoingeckoCoinSimple } = MarketStore;
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { profile } = storeToRefs(ProfileStore);
    
    const watchlist = ref(profile.value?.watchlist);
    
    const invoices = [
        {
            invoice: 'INV001',
            paymentStatus: 'Paid',
            totalAmount: '$250.00',
            paymentMethod: 'Credit Card',
        },
        {
            invoice: 'INV002',
            paymentStatus: 'Pending',
            totalAmount: '$150.00',
            paymentMethod: 'PayPal',
        },
    ];
    
    onMounted(async() => {
        await getCoingeckoCoinSimple();
    });
</script>
