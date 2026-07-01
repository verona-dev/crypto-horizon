<template>
    <Table v-if='data && data.market_cap_dominance'>
        <TableCaption class='py-6'>A list of public treasury entities.</TableCaption>
        
        <TableHeader class='border-t-2 border-b-2'>
            <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead class='text-center min-w-32'>Country</TableHead>
                <TableHead>Today Value</TableHead>
            </TableRow>
        </TableHeader>
        
        <TableBody>
            <TableRow
                v-for='entity in companies'
                :key='entity.id'
                class='min-h-12'
            >
                <!--  Name  -->
                <TableCell class='font-medium'>{{ entity.name || '-' }}</TableCell>
                
                <!--  Ticker  -->
                <TableCell>{{ entity.symbol || '-' }}</TableCell>
                
                <!--  Country  -->
                <TableCell class='flex justify-center h-full'>
                    <div v-if='entity.country === "NO"'>-</div>
                    
                    <div v-else class='flex items-center gap-2'>
                        <NuxtIcon
                            :name="`circle-flags:${entity?.country?.toLowerCase()}`"
                            size='18px' class='self-center'
                        />
                        
                        <span>{{ entity.country }}</span>
                    </div>
                </TableCell>
                
                <!--  Total Treasury Value  -->
                <TableCell>
                    {{ formatNumber(entity.total_current_value_usd, { compact: true, decimals: 2 }) || '-' }}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>

<script setup>
    import PublicTreasuriesTable from '@/components/market/PublicTreasuriesTable.vue';
    import { getTrendClass } from '@/utils/styleUtils.js';
    import glossary from '@/assets/data/market/glossary.json';
    import { formatNumber } from '@/utils/formatUtils.js';
    import Title from '@/components/Title.vue';
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow
    } from '@/components/ui/table/index.ts';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index.ts';
    import { Button } from '@/components/ui/button/index.ts';
    import InfoIcon from '@/components/InfoIcon.vue';
    import { Badge } from '@/components/ui/badge/index.ts';
    
    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });
    
    const { data } = toRefs(props);
    console.log(data.value);
    const companies = computed(() => data?.value?.companies);
    // const data = computed(() => coin.value?.publicTreasury?.companies || null);
</script>
