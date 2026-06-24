<template>
    <div class='page'>
        <LoadingContent v-if='loading' />
        
        <div v-else class='flex flex-wrap gap-16 justify-center'>
            <div
                v-for='exchange in exchanges'
                :key='exchange.id'
            >
                <Card class='w-150 min-h-90 p-4 !rounded-xl hover:border-foreground/15 flex flex-col justify-between'>
                    <CardHeader>
                        <div class='flex justify-between'>
                            <div class='flex items-center gap-3'>
                                <NuxtImg
                                    :src='exchange.image'
                                    width='54'
                                    alt='exchange logo'
                                />
                                
                                <!--  Name + Rank + Country  -->
                                <div class='flex flex-col'>
                                    <div class='flex items-center gap-3'>
                                        <Title :tag='4' class='text-2xl xl:text-3xl font-semibold leading-none tracking-tight'>{{ exchange.name }}</Title>
                                        <p class='text-muted-foreground text-xl mt-0.5'>#{{ exchange.trust_score_rank }}</p>
                                    </div>
                                    <CardDescription class='ml-0.5'>{{ exchange.country }} since {{ exchange.year_established }}</CardDescription>
                                </div>
                            </div>
                            
                            <!--  Visit  -->
                            <NuxtLink
                                :to='exchange.url'
                                target='_blank'
                                aria-label='exchange link'
                                class='mt-1.5'
                            >
                                <Button variant='link'>
                                    Visit
                                    
                                    <NuxtIcon
                                        name='ph:arrow-up-right-light'
                                        size='16'
                                        class='bg-primary'
                                    />
                                </Button>
                            </NuxtLink>
                        </div>
                    </CardHeader>
                    
                    <CardContent class='my-4 flex items-center justify-between'>
                        <!--  Trade Volume 24h  -->
                        <div>
                            <CardDescription>Trade Volume 24h in BTC</CardDescription>
                            
                            <div class='flex items-center gap-2'>
                                <NuxtIcon
                                    name='logos:bitcoin'
                                    class='mb-0.5'
                                    size='24'
                                />
                                
                                <Title :tag='5' class='font-semibold leading-none tracking-tight'>{{ formatNumber(exchange.trade_volume_24h_btc, { style: 'decimal', maximumFractionDigits: 3 }) }}</Title>
                            </div>
                        </div>
                        
                        <!--  Trust Score  -->
                        <div class='flex-1 text-center'>
                            <CardDescription>Trust Score</CardDescription>
                            <Title
                                :tag='5'
                                class='font-semibold leading-none tracking-tight'
                                :class='trustScoreStyle(exchange.trust_score)'
                            >
                                {{ exchange.trust_score }}
                            </Title>
                        </div>
                    </CardContent>
                    
                    <!--  Description  -->
                    <CardContent>
                        <p>{{ exchange.description }}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card, CardHeader, CardDescription, CardContent } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    import LoadingContent from '~/components/LoadingContent.vue';
    import Title from '~/components/Title.vue';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { loading, exchanges } = storeToRefs(MarketStore);
    const { getExchanges } = MarketStore;
    
    const trustScoreStyle = (number) => {
        if(number >= 7 && number <= 10) return '!text-progress';
        if(number >= 5 && number <= 6) return '!text-warning';
        return '!text-destructive';
    };
    
    // SEO
    const title = 'Crypto Exchanges: Ranked by Volume & Trust Score';
    const description = 'Compare crypto exchanges by trading volume, trust score, supported coins, fees, and more. Find the best CEX and DEX platforms for trading Bitcoin, Ethereum, and altcoins.';
    
    onMounted(async() => {
        if(!exchanges.value.length) await getExchanges();
    })
    
    definePageMeta({
        layout: 'market',
        title,
        description,
    });
</script>