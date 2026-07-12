<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
        <div v-else class='flex flex-col flex-wrap gap-16 justify-center items-center'>
            <Title :tag='1' :level='3'>Top Crypto Exchanges Ranked by Trust Score</Title>
            
            <div class='flex flex-wrap gap-16 justify-center'>
                <div
                    v-for='exchange in exchanges'
                    :key='exchange.id'
                >
                    <Card class='w-150 min-h-90 p-4 !rounded-xl border-secondary/25 hover:border-foreground/15 flex flex-col justify-between'>
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
                                            <Title :tag='2' :level='4' class='text-2xl xl:text-3xl font-semibold leading-none tracking-tight'>{{ exchange.name }}
                                                <span class='text-muted-foreground text-xl mt-0.5'>#{{ exchange.trust_score_rank }}</span>
                                            </Title>
                                        </div>
                                        <CardDescription class='ml-0.5'>{{ exchange.country }} since {{ exchange.year_established }}</CardDescription>
                                    </div>
                                </div>
                                
                                <div class='flex items-center gap-4'>
                                    <!--  Visit Page  -->
                                    <NuxtLink
                                        :to='`/market/exchanges/${exchange.id}`'
                                        aria-label='exchange link'
                                    >
                                        <Button>Open</Button>
                                    </NuxtLink>
                                    
                                    <!--  Website  -->
                                    <NuxtLink
                                        :to='exchange.url'
                                        target='_blank'
                                        aria-label='exchange website'
                                    >
                                        <Button variant='link'>
                                            Website
                                            
                                            <NuxtIcon
                                                name='ph:arrow-up-right-light'
                                                size='16'
                                                class='bg-primary'
                                            />
                                        </Button>
                                    </NuxtLink>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent class='my-4 flex items-center justify-between'>
                            <!--  Trade Volume 24h  -->
                            <div class='flex-1 flex flex-col gap-1.5'>
                                <CardDescription>Trade Volume 24h in BTC</CardDescription>
                                
                                
                                <Badge variant='outline' class='py-1.5 px-3.5 shadow-lg w-fit' :class='getTrustScoreStyle(exchange.trust_score)'>
                                    <div class='flex items-center gap-2'>
                                        <NuxtIcon
                                            name='logos:bitcoin'
                                            class='mb-0.5'
                                            size='24'
                                        />
                                        
                                        <Title :tag='3' :level='5' class='font-semibold leading-none tracking-tight'>
                                            {{
                                                formatNumber(exchange.trade_volume_24h_btc, {
                                                    style: 'decimal',
                                                    maximumFractionDigits: 3
                                                })
                                            }}
                                        </Title>
                                    </div>
                                </Badge>
                            </div>
                            
                            <!--  Trust Score  -->
                            <div class='flex-1 text-center flex flex-col items-center gap-1.5'>
                                <CardDescription>Trust Score</CardDescription>
                                
                                <Badge variant='outline' class='py-1.5 px-3.5 shadow-lg' :class='getTrustScoreStyle(exchange.trust_score)'>
                                    <Title
                                        :tag='3' :level='5'
                                        class='font-semibold leading-none tracking-tight'
                                        :class='getTrustScoreStyle(exchange.trust_score)'
                                    >
                                        {{ exchange.trust_score }}/10
                                    </Title>
                                </Badge>
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
    </div>
</template>

<script setup>
    import { Badge } from '~/components/ui/badge';
    import { Button } from '~/components/ui/button';
    import { Card, CardHeader, CardDescription, CardContent } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrustScoreStyle } from '~/utils/styleUtils.js';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import Title from '~/components/Title.vue';
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { exchanges } = storeToRefs(MarketStore);
    const { getExchanges } = MarketStore;
    
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