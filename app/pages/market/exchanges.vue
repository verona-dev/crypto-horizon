<template>
    <LoadingContent v-if='loading' />
    
    <div v-else class='page'>
        <div class='flex justify-around flex-wrap'>
            <div
                v-for='exchange in exchanges'
                :key='exchange.id'
            >
                <Card class='bg-muted/25 w-150 gap-10 p-4 !rounded-xl hover:border-foreground/15 flex flex-col justify-between select-none'>
                    <CardHeader>
                        <div class='flex justify-between'>
                            <div class='flex items-center gap-3'>
                                <NuxtImg
                                    :src='exchange.image'
                                    width='64'
                                    alt='exchange logo'
                                />
                                
                                <div class='flex flex-col gap-1.5'>
                                    <Title :tag='4' class='font-semibold leading-none tracking-tight'>{{ exchange.name }}</Title>
                                    <CardDescription>{{ exchange.country }}</CardDescription>
                                </div>
                            </div>
                            
                            <Button variant="link">
                                Visit
                            </Button>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        <CardTitle>{{ exchange.name }}</CardTitle>
                        <p>{{ exchange.year_established }}</p>
                        <p>{{ exchange.description }}</p>
                        <p>Trade vol: {{ exchange.trade_volume_24h_btc }}</p>
                        <p>Trust score: {{ exchange.trust_score }}</p>
                        <p>Trust score rank: {{ exchange.trust_score_rank }}</p>
                        <p>{{ exchange.url }}</p>
                    </CardContent>
                    
                    <CardFooter>
                    
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
</template>

<script setup>
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