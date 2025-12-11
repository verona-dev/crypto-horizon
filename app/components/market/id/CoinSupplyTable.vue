<template>
    <div v-if='market_data_computed'>
        <Table class='w-full xl:w-96'>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount&#40;{{ symbol }}&#41;</TableHead>
                </TableRow>
            </TableHeader>
            
            <TableBody>
                <TableRow
                    v-for='item in market_data_computed'
                    :key='item.key'
                >
                    <TableCell class='flex items-center gap-2'>
                        {{ item.label }}
                        
                        <HoverCard :openDelay='200' class='flex'>
                            <HoverCardTrigger>
                                <InfoIcon />
                            </HoverCardTrigger>
                            <HoverCardContent>{{ item.description }}</HoverCardContent>
                        </HoverCard>
                    </TableCell>
                    
                    <TableCell>{{ item.value }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>

<script setup>
    import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from '~/components/ui/table';
    import { formatNumber } from '~/utils/formatUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index.ts';
    import InfoIcon from '@/components/InfoIcon.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const symbol = computed(() => coin.value?.symbol);
    const { coin } = toRefs(props);
    const market_data = computed(() => coin.value?.coingecko?.market_data);
    
    const market_data_computed = computed(() => {
        const items = [];
        
        // Max Supply
        if(max_supply.value) {
            items.push({
                key: 'max_supply',
                label: glossary.max_supply.label,
                description: glossary.max_supply.description,
                value: formatNumber(max_supply.value, {
                    style: 'decimal'
                }),
            });
        }
        
        // Total Supply
        if(total_supply.value) {
            items.push({
                key: 'total_supply',
                label: glossary.total_supply.label,
                description: glossary.total_supply.description,
                value: formatNumber(total_supply.value, {
                    style: 'decimal'
                }),
            });
        }
        
        // Circulating Supply
        if(circulating_supply.value) {
            items.push({
                key: 'circulating_supply',
                label: glossary.circulating_supply.label,
                description: glossary.circulating_supply.description,
                value: formatNumber(circulating_supply.value, {
                    style: 'decimal'
                })
            })
        }
        
        // Remaining Supply
        if(remaining_supply.value) {
            items.push({
                key: 'remaining_supply',
                label: glossary.remaining_supply.label,
                description: glossary.remaining_supply.description,
                value: formatNumber(remaining_supply.value, {
                    style: 'decimal'
                }),
            });
        }
        
        return items;
    });
    
    const max_supply = computed(() => market_data.value?.max_supply);
    const total_supply = computed(() =>  market_data.value?.total_supply);
    const circulating_supply = computed(() => market_data.value?.circulating_supply);
    const remaining_supply = computed(() => {
        if(max_supply.value) return max_supply.value - total_supply.value;
        return null;
    });
</script>