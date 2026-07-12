<template>
    <div class='page market w-full'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <!--  Page Title  -->
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
            <Card class='max-w-full flex flex-col xl:flex-row py-4 gap-6'>
                <!--  Trust Score  -->
                <div class='flex-1 xl:border-r xl:border-r-muted-foreground/25 xl:px-6 xl:py-2'>
                    <CardHeader>
                        <Title :tag='4'>{{ exchange?.name }} Trust Score</Title>
                        <CardDescription>
                            Trust Score is a rating algorithm developed by CoinGecko to evaluate the
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
                    
                    <CardFooter>
                        <Button variant='link'>
                            <NuxtLink
                                to='https://support.coingecko.com/hc/en-us/articles/36442561461657-Trust-Score-Methodology'
                                class='flex items-center gap-1'
                                target='_blank'
                                aria-label='Trust score methodology link'
                                external
                            >
                                <span>View methodology</span> <ChevronRight />
                            </NuxtLink>
                        </Button>
                    </CardFooter>
                </div>
                
                <!--  Trading Volume 24h in BTC  -->
                <div v-if='exchange.trade_volume_24h_btc' class='progress-bar-item-container !items-start flex-1 xl:px-6 xl:py-2'>
                    <CardHeader>
                        <Title :tag='4'>{{ glossary.volume.label }}</Title>
                        <CardDescription>{{ glossary.volume.description }}</CardDescription>
                    </CardHeader>
                    
                    <CardContent class='flex gap-4'>
                        <MazCircularProgressBar
                            :percentage='100'
                            :duration='3000'
                        >
                            <template #default>
                                <h5>{{ trading_volume_in_usd }}</h5>
                            </template>
                        </MazCircularProgressBar>
                        
                        <div class='flex items-center gap-2'>
                            <NuxtIcon
                                name='logos:bitcoin'
                                size='32'
                                class='mb-0.5'
                            />
                            
                            <Title :tag='4'>{{ trading_volume_formatted }}</Title>
                        </div>
                    </CardContent>
                </div>
            </Card>
            
            <!--  Info Table  -->
            <Card class='w-full p-6 flex flex-col gap-8'>
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
            
            <!--  Connect  -->
            <Card class='w-full p-6 flex flex-col'>
                <CardHeader>
                    <Title :tag='4'>Connect</Title>
                </CardHeader>
                
                <CardContent class='flex flex-wrap gap-8'>
                    <template
                        v-for='item in connects'
                        :key='item.url'
                    >
                        <NuxtLink
                            :to='item.url'
                            target='_blank'
                            class='w-full 2xl:!w-130 !h-40'
                            aria-label='exchange social link'
                            external
                        >
                            <PixelCard variant='blue' class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'>
                                <CardHeader>
                                    <NuxtIcon
                                        v-if='item.icon'
                                        :name=item.icon
                                        size='64'
                                    />
                                </CardHeader>
                                
                                <CardContent class='w-full flex flex-col items-start pt-6 pl-0'>
                                    <Title :tag='5'>{{ item.label }}</Title>
                                    
                                    <CardDescription>{{ item.url }}</CardDescription>
                                </CardContent>
                            </PixelCard>
                        </NuxtLink>
                    </template>
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
        </template>
    </div>
</template>

<script setup>
    import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
    import { Badge } from '~/components/ui/badge';
    import { Button } from '@/components/ui/button/index';
    import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { ChevronRight } from 'lucide-vue-next';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrustScoreStyle } from '~/utils/styleUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import PageLoadingSpinner from '~/components/PageLoadingSpinner.vue';
    import PixelCard from '~/components/ui/pixel-card/PixelCard.vue';
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
    const MarketStore = useMarketStore();
    const { getExchange, getCoingeckoCoin } = MarketStore;
    
    // Exchange
    const { exchange, coin } = storeToRefs(MarketStore);
    const id = computed(() => route.params?.id);
    const exchange_type = computed(() => {
        if(exchange.value?.centralized) return 'Centralised';
        return '-';
    });
    
    // Connect
    const website = computed(() => exchange.value?.url);
    const facebook_url = computed(() => exchange.value?.facebook_url);
    const reddit_url = computed(() => exchange.value?.reddit_url);
    const telegram_url = computed(() => exchange.value?.telegram_url);
    const other_url_1 = computed(() => exchange.value?.other_url_1);
    const other_url_2 = computed(() => exchange.value?.other_url_2);
    const twitter_handle = computed(() => exchange.value?.twitter_handle);
    
    const connects = computed(() =>
        [
            { url: website.value, label: 'Website', icon: 'ph:house-line-fill' },
            { url: facebook_url.value, label: 'Facebook', icon: 'ph:facebook-logo-fill' },
            { url: reddit_url.value, label: 'Reddit', icon: 'ph:reddit-logo-fill' },
            { url: telegram_url.value, label: 'Telegram', icon: 'logos:telegram' },
            { url: other_url_1.value, label: 'Other 1', icon: 'ph:link-bold' },
            { url: other_url_2.value, label: 'Other 2', icon: 'ph:link-bold' },
            { url: twitter_handle.value ? `https://x.com/${twitter_handle.value}` : null, label: 'Twitter', icon: 'ph:twitter-logo-fill' },
        ].filter(item => item.url)
    );
    
    const trading_volume = computed(() => exchange.value?.trade_volume_24h_btc);
    const trading_volume_formatted = computed(() => formatNumber(trading_volume.value, {
        style: 'decimal',
    }));
    const trading_volume_in_usd = computed(() => {
        return formatNumber(coin.value?.coingecko?.market_data?.current_price?.usd * trading_volume.value , {
            compact: true, decimals: 2
        });
    });
    
    // SEO
    const title = computed(() =>
        exchange.value?.name
            ? `${exchange.value?.name} Exchange | Rank #${exchange.value?.trust_score_rank} | Volume & Trust Score`
            : 'Exchange page.'
    );
    
    const description = computed(() =>
        exchange.value?.exchange
            ? `Explore ${exchange.value?.exchange} exchange and check its trading volume, trust score, and socials.`
            : 'Exchange description.'
    );
    
    const path = computed(() => route.fullPath);
    
    useHead({
        title: title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: path },
            { name: 'robots', content: 'index, follow' },
        ],
    });
    
    useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        ogUrl: path,
    });
    
    onMounted(async() => {
        await getExchange(id.value);
        await getCoingeckoCoin('bitcoin');
    });
</script>