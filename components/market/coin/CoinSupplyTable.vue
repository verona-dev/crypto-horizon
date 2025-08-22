<template>
    <div v-if='market_data'>
        <Table class='w-full xl:w-96 select-auto'>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount&#40;{{ symbol }}&#41;</TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                <!--  Max Supply  -->
                <TableRow v-if='max_supply'>
                    <TableCell class='font-medium'>Max Supply</TableCell>
                    <TableCell>{{ max_supply_label }}</TableCell>
                </TableRow>
                <!--  Total Supply  -->
                <TableRow v-if='total_supply'>
                    <TableCell class='font-medium'>Total Supply</TableCell>
                    <TableCell>{{ total_supply_label }}</TableCell>
                </TableRow>
                <!--  Circulating Supply  -->
                <TableRow v-if='circulating_supply'>
                    <TableCell class='font-medium'>Circulating Supply</TableCell>
                    <TableCell>{{ circulating_supply_label }}</TableCell>
                </TableRow>
                <!--  Remaining Supply  -->
                <TableRow v-if='remaining_supply'>
                    <TableCell class='font-medium'>Remaining Supply</TableCell>
                    <TableCell>{{ remaining_supply_label }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup>
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const symbol = computed(() => coin.value?.symbol);
    const { coin } = toRefs(props);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    const max_supply = computed(() => market_data.value?.max_supply);
    const max_supply_label = market_data.value?.max_supply_label;
    
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const total_supply_label = market_data.value?.total_supply_label;
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const circulating_supply_label = market_data.value?.circulating_supply_label;
    const remaining_supply = computed(() => max_supply.value - total_supply.value);
    const remaining_supply_label = computed(() => formatNumber(remaining_supply.value, {
        style: 'decimal'
    }));
</script>