<template>
    <CardContent v-if='coin'>
        <div class='w-96 py-6 px-12'>
            <Table>
                <TableCaption>Coin Information</TableCaption>
                
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
                        <TableCell>Markets</TableCell>
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

    </CardContent>
    
    <Separator class='my-4' />
</template>

<script setup>
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableRow,
    } from '@/components/ui/table';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
            default: () => ({}),
        }
    });
    const { coin } = toRefs(props);
</script>
