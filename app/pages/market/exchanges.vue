<template>
    <LoadingContent v-if='loading' />
    
    <div v-else class='page'>
        <div class='flex flex-wrap gap-16 justify-center'>
            <div
                v-for='exchange in exchanges'
                :key='exchange.id'
            >
                <Card class='w-150 p-4 !rounded-xl hover:border-foreground/15 flex flex-col justify-between select-none'>
                    <CardHeader>
                        <div class='flex justify-between items-center'>
                            <div class='flex items-center gap-3'>
                                <NuxtImg
                                    :src='exchange.image'
                                    width='64'
                                    alt='exchange logo'
                                />
                                
                                <div class='flex flex-col'>
                                    <div class='flex items-center gap-4'>
                                        <Title :tag='4' class='font-semibold leading-none tracking-tight'>{{ exchange.name }}</Title>
                                        <p class='text-2xl text-primary font-bold'>#{{ exchange.trust_score_rank }}</p>
                                    </div>
                                    <CardDescription class='ml-0.5'>{{ exchange.country }}</CardDescription>
                                </div>
                            </div>
                            
                            <!--  Visit  -->
                            <NuxtLink
                                :to='exchange.url'
                                target='_blank'
                                aria-label='exchange link'
                            >
                                <NuxtIcon
                                    name='ph:arrow-circle-up-right'
                                    size='48'
                                    class='bg-muted-foreground/50 hover:bg-primary/75'
                                />
                            </NuxtLink>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        <CardDescription>{{ exchange.year_established }}</CardDescription>
                        <p>{{ exchange.description }}</p>
                    </CardContent>
                    
                    <CardContent>
                        <p>Trade vol: {{ exchange.trade_volume_24h_btc }}</p>
                    </CardContent>
                    
                    <CardFooter class='flex-col gap-4'>
                        <Badge variant='outline' class='text-lg text-progress/75 w-full py-3 flex justify-center'>Trust Score: {{ exchange.trust_score }}</Badge>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Badge } from '~/components/ui/badge';
    import { Button } from '~/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '~/components/ui/card';
    import LoadingContent from '~/components/LoadingContent.vue';
    import Title from '~/components/Title.vue';
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { loading, exchanges } = storeToRefs(MarketStore);
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