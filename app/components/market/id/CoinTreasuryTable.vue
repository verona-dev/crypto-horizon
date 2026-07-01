<template>
    <Card v-if='data' class='flex flex-col items-center justify-center gap-16 px-12 xl:px-6 w-full h-full'>
        <div class='w-full flex flex-col'>
            <!--   Header   -->
            <div class='flex flex-col items-center justify-center gap-8 p-14'>
                <Title :tag='4' class='text-primary'>Treasury Holdings</Title>
                
                <div class='flex items-center justify-evenly w-3/4'>
                    <!--  Total Value USD  -->
                    <div v-if='total_value_usd' class='item-container'>
                        <MazCircularProgressBar
                            :percentage='100'
                            :duration='2000'
                        >
                            <template #default>
                                <h5>{{ total_value_usd_compact }}</h5>
                            </template>
                        </MazCircularProgressBar>
                        
                        <div class='label-container'>
                            <div class='flex items-center'>
                                <Title :tag='3' :level='5' class='!min-w-full'>{{ glossary.total_value.label }}</Title>
                                
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger>
                                        <InfoIcon size='28' />
                                    </HoverCardTrigger>
                                    <HoverCardContent>{{ glossary.total_value.description }}</HoverCardContent>
                                </HoverCard>
                            </div>
                            
                            <span class='mt-2'>{{ total_value_usd_formatted }}</span>
                        </div>
                    </div>
                    
                    <!--  Market Cap Dominance  -->
                    <div v-if='market_cap_dominance' class='item-container'>
                        <MazCircularProgressBar :percentage='market_cap_dominance_formatted' :duration='2000' suffix='%'>
                            <template #default>
                                <Title :tag='4' :level='5'>{{ market_cap_dominance_formatted }}&#37;</Title>
                            </template>
                        </MazCircularProgressBar>
                        
                        <div class='label-container'>
                            <div class='flex items-center'>
                                <Title :tag='3' :level='5' class='!min-w-fit'>{{ glossary.market_cap_dominance.label }}</Title>
                                
                                <HoverCard
                                    :openDelay='200'
                                    class='flex'
                                >
                                    <HoverCardTrigger>
                                        <InfoIcon size='28' />
                                    </HoverCardTrigger>
                                    <HoverCardContent>{{ glossary.market_cap_dominance.description }}</HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
            
            <!--   Table   -->
            <div class='border-t border-b rounded-none flex flex-col shadow-2xl overflow-auto'>
                <Table>
                    <TableCaption class='pt-10 pb-6'>A list of private treasury entities.</TableCaption>
                    
                    <TableHeader class='border-t-2 border-b-2'>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Ticker</TableHead>
                            <TableHead class='text-center min-w-32'>Country</TableHead>
                            <TableHead>Today Value</TableHead>
                            <TableHead>Entry Value</TableHead>
                            <TableHead>Total Supply %</TableHead>
                            <TableHead>Holdings</TableHead>
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
                            
                            <!--  Today Value  -->
                            <TableCell>{{
                                    formatNumber(entity.total_current_value_usd, { compact: true, decimals: 2 }) || '-'
                                       }}
                            </TableCell>
                            
                            <!--  Entry Value  -->
                            <TableCell>{{
                                    formatNumber(entity.total_entry_value_usd, { compact: true, decimals: 2 }) || '-'
                                       }}
                            </TableCell>
                            
                            <!--  Supply Percentage  -->
                            <TableCell>{{
                                    formatNumber(entity.percentage_of_total_supply, {
                                        style: 'percent',
                                        decimals: 2
                                    })
                                       }}
                            </TableCell>
                            
                            <!--  Total Holdings  -->
                            <TableCell class='flex items-center gap-1.5'>
                                <NuxtIcon
                                    :name='`logos:${id}`'
                                    size='20'
                                />
                                
                                <span>{{ formatNumber(entity.total_holdings, { style: 'decimal' }) }}</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { Card } from '~/components/ui/card';
    import { formatNumber } from '@/utils/formatUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import Title from '@/components/Title.vue';
    import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table/index.ts';
    
    const route = useRoute();
    const id = route.params.id;
    
    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });
    
    const { data } = toRefs(props);
    // console.log(data.value);
    
    // Market Cap Dominance
    const market_cap_dominance = computed(() =>  data.value?.market_cap_dominance);
    const market_cap_dominance_formatted = computed(() => Math.floor(market_cap_dominance.value).toFixed(0));
    
    console.log(market_cap_dominance.value);
    console.log(market_cap_dominance_formatted.value);
    
    
    // Total Value USD
    const total_value_usd = computed(() => data.value?.total_value_usd);
    const total_value_usd_formatted = formatNumber(total_value_usd.value);
    const total_value_usd_compact = computed(() => formatNumber(total_value_usd.value, {
        compact: true, decimals: 2
    }));
    
    const companies = computed(() => data?.value?.companies);
</script>

<style scoped>
    .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        
        @media (min-width: 768px) {
            width: 200px;
        }
        
        /* Desktop */
        @media (min-width: 1024px) {
            width: 250px;
        }
        
        .label-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>