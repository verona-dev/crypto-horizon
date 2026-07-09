<template>
    <div class='page market w-full xl:max-w-7xl'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <div class='flex items-center gap-4 self-start'>
                <NuxtImg
                    :src='exchange.image'
                    width='52'
                    alt='exchange logo'
                    class='inline mb-1'
                />
                
                <Title :tag='1' :level='3'>{{ exchange.name }}</Title>
                
                <Badge variant='outline' class='py-2 px-3 shadow-lg bg-muted text-foreground/75 text-sm'>{{ exchange_type }} exchange</Badge>
            </div>
            
            <!--  Trust Score + Trading Volume  -->
            <Card class='w-full flex flex-col xl:flex-row items-center p-6'>
                <!--  Trust Score  -->
                <div class='flex-1 xl:border-r xl:border-r-muted-foreground/25 p-6'>
                    <CardHeader>
                        <Title :tag='4'>{{ exchange?.name }} Trust Score</Title>
                        <CardDescription>Trust Score is a rating algorithm developed by CoinGecko to evaluate the
                                         legitimacy of an exchange’s trading volume. Trust Score is calculated on a
                                         range of metrics such as liquidity, scale of operations, cybersecurity score,
                                         and more.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <Badge
                            variant='outline' class='py-1.5 px-3.5 shadow-lg'
                            :class='getTrustScoreStyle(exchange.trust_score)'
                        >
                            <Title
                                :tag='3'
                                class='font-semibold leading-none tracking-tight'
                                :class='getTrustScoreStyle(exchange.trust_score)'
                            >
                                {{ exchange.trust_score }}/10
                            </Title>
                        </Badge>
                    </CardContent>
                </div>
                
                <!--  Trading Volume 24h in BTC  -->
                <div v-if='exchange.trade_volume_24h_btc' class='progress-bar-item-container flex-1 p-6'>
                    <CardHeader>
                        <Title :tag='4'>{{ glossary.volume.label }}</Title>
                        <CardDescription>{{ glossary.volume.description }}</CardDescription>
                    </CardHeader>
                    
                    <CardContent class='flex flex-col gap-4'>
                        <MazCircularProgressBar
                            :percentage='100'
                            :duration='3000'
                        >
                            <template #default>
                                <h5>{{ volume_compact }}</h5>
                            </template>
                        </MazCircularProgressBar>
                    </CardContent>
                    
                    <CardContent class='flex items-center gap-2'>
                        <NuxtIcon
                            name='logos:bitcoin'
                            size='32'
                            class='mb-0.5'
                        />
                        
                        <Title :tag='4'>{{ volume_value }}</Title>
                    </CardContent>
                </div>
            </Card>
            
            <!--  Info Table  -->
            <Card class='w-full p-12 flex flex-col gap-8'>
                <CardHeader>
                    <Title :tag='4' class='flex items-center gap-2'>What is {{ exchange?.name }} exchange?</Title>
                    <CardDescription>{{ exchange?.description }}</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <Table>
                        <TableBody>
                            <!--  Rank  -->
                            <TableRow>
                                <TableCell class='font-medium'>Rank</TableCell>
                                <TableCell class='text-right'>&#35;{{ exchange?.trust_score_rank }}</TableCell>
                            </TableRow>
                            
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
                                <TableCell class='text-right capitalize'>{{ exchange?.has_trading_incentive }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <!--  Notice card  -->
            <Alert
                v-if='exchange.public_notice || exchange.alert_notice'
                class='my-6 px-0 w-3/4 flex items-center animate-fadeIn border border-warning/25'
            >
                <div class='flex px-8'>
                    <NuxtIcon
                        name='ph:shield-warning-light'
                        size='30'
                        class='text-warning'
                    />
                </div>
                
                <div class='flex flex-col gap-2 border-l border-warning/25 p-6'>
                    <div v-if='exchange.public_notice'>
                        <AlertTitle class='uppercase underline text-warning'>Public notice</AlertTitle>
                        <AlertDescription v-html='exchange.public_notice || "Public notice description"' class='text-xs' />
                    </div>
                    
                    <div v-if='exchange.alert_notice'>
                        <AlertTitle class='uppercase underline text-warning'>Alert notice</AlertTitle>
                        <AlertDescription v-html='exchange.alert_notice || "Alert notice description"' class='text-xs' />
                    </div>
                </div>
            </Alert>
            
            <div class='flex flex-col'>
                <!--  Socials  -->
                <p>{{ exchange?.facebook_url }}</p>
                <p>{{ exchange?.reddit_url }}</p>
                <p>{{ exchange?.telegram_url }}</p>
                <p>{{ exchange?.other_url_1 }}</p>
                <p>{{ exchange?.other_url_2 }}</p>
                <p>{{ exchange?.twitter_handle }}</p>
            </div>
        </template>
    </div>
</template>

<script setup>
    import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
    import { Badge } from '~/components/ui/badge';
    import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
    import { getTrustScoreStyle } from '~/utils/styleUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import PageLoadingSpinner from '~/components/PageLoadingSpinner.vue';
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table';
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
    import InfoIcon from '@/components/InfoIcon.vue';
    import { formatNumber } from '@/utils/formatUtils.js';
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
    
    const trading_volume = computed(() => exchange.value?.trade_volume_24h_btc);
    const volume_value = formatNumber(trading_volume.value, {
        style: 'decimal',
    });
    const volume_compact = computed(() => formatNumber(trading_volume.value, {
        compact: true, decimals: 1
    }));
    
    onMounted(async() => {
        await getExchange(id.value);
        console.log(id.value);
    });
</script>