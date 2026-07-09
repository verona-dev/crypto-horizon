<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <Card>
                <CardHeader>
                    <Title :tag='4' class='flex items-center gap-2'>
                        <span>What is</span>
                        
                        <NuxtImg
                            :src='exchange.image'
                            width='32'
                            alt='exchange logo'
                            class='inline'
                        />
                        
                        <span>{{ exchange?.name }} exchange?</span>
                    </Title>
                    <CardDescription>{{ exchange?.description }}</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <Table>
                        <TableBody>
                            <!--  Website  -->
                            <TableRow>
                                <TableCell class='font-medium'>Website</TableCell>
                                <TableCell class='text-right'>{{ exchange?.url }}</TableCell>
                            </TableRow>
                            
                            <!--  Community  -->
                            <TableRow>
                                <TableCell class='font-medium'>Community</TableCell>
                                <TableCell class='text-right'>{{ exchange?.facebook_url }}</TableCell>
                            </TableRow>
                            
                            <!--  API Id  -->
                            <TableRow>
                                <TableCell class='font-medium'>API Id</TableCell>
                                <TableCell class='text-right'>{{ id }}</TableCell>
                            </TableRow>
                            
                            <!--  Country  -->
                            <TableRow>
                                <TableCell class='font-medium'>Country</TableCell>
                                <TableCell class='text-right'>{{ exchange?.country }}</TableCell>
                            </TableRow>
                            
                            <!--  Coins  -->
                            <TableRow>
                                <TableCell class='font-medium'>Coins</TableCell>
                                <TableCell class='text-right'>{{ exchange?.coins }}</TableCell>
                            </TableRow>
                            
                            <!--  Pairs  -->
                            <TableRow>
                                <TableCell class='font-medium'>Pairs</TableCell>
                                <TableCell class='text-right'>{{ exchange?.pairs }}</TableCell>
                            </TableRow>
                            
                            <!--  Year Established  -->
                            <TableRow>
                                <TableCell class='font-medium'>Year Established</TableCell>
                                <TableCell class='text-right'>{{ exchange?.year_established }}</TableCell>
                            </TableRow>
                            
                            <!--  Exchange Type  -->
                            <TableRow>
                                <TableCell class='font-medium'>Exchange Type</TableCell>
                                <TableCell class='text-right'>{{ exchange_type }}</TableCell>
                            </TableRow>
                            
                            <!--  Trading Incentive  -->
                            <TableRow>
                                <TableCell class='font-medium'>Trading Incentive</TableCell>
                                <TableCell class='text-right'>{{ exchange?.has_trading_incentive }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <div class='flex flex-col'>
                <!--  Socials  -->
                <p>{{ exchange?.facebook_url }}</p>
                <p>{{ exchange?.reddit_url }}</p>
                <p>{{ exchange?.telegram_url }}</p>
                <p>{{ exchange?.other_url_1 }}</p>
                <p>{{ exchange?.other_url_2 }}</p>
                <p>{{ exchange?.twitter_handle }}</p>
                
                <!--  Notice card  -->
                <p>{{ exchange?.public_notice }}</p>
                <p>{{ exchange?.alert_notice }}</p>
                
                <!--  Score card  -->
                <p>{{ exchange?.trust_score }}</p>
                <p>{{ exchange?.trust_score_rank }}</p>
                
                <!--  Trade Volume card  -->
                <p>{{ exchange?.trade_volume_24h_btc }}</p>
            </div>
        </template>
    </div>
</template>

<script setup>
    import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
    import PageLoadingSpinner from '~/components/PageLoadingSpinner.vue';
    import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import Title from '~/components/Title.vue';
    
    // Router
    const route = useRoute();
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getExchange } = MarketStore;
    
    // State
    const { exchange } = storeToRefs(MarketStore);
    console.log(JSON.parse(JSON.stringify(exchange.value)));
    const id = computed(() => route.params?.id);
    const exchange_type = computed(() => {
        if(exchange.value.centralized) return 'Centralised';
        return '-';
    });
    
    onMounted(async() => {
        await getExchange(id.value);
        console.log(id.value);
    });
</script>