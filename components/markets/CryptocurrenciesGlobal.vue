<template>
    <MazAnimatedElement
        direction='down'
        :duration='2000'
        class='cryptocurrencies-global flex flex-wrap justify-center my-20'
    >
        <Card class='card'>
            <CardHeader>
                <CardTitle>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Assets'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total number of coins</CardDescription>
                <p>{{ globalMarket.coins_count }}</p>
            </CardContent>
            
            <Separator />
            
            <CardHeader>
                <CardTitle>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Markets'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total exchange pairs</CardDescription>
                <p>{{ globalMarket.active_markets }}</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Market Cap'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total crypto market cap</CardDescription>
                <p>{{ totalMarketCap }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>ATH total market cap</CardDescription>
                <p>{{ athMarketCap }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p :class='marketCapTrendChange'>{{ globalMarket.mcap_change }}&#37;</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Volume'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total trading volume for last 24h</CardDescription>
                <p>{{ totalVolume }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>ATH total trading volume</CardDescription>
                <p>{{ athVolume }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p :class='changeVolumeTrend'>{{ globalMarket.volume_change }}&#37;</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Dominance'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription class='flex'>
                    <NuxtIcon
                        name='cryptocurrency-color:btc'
                        size='20'
                    />
                    <span class='ml-2'>BTC Dominance Index</span>
                </CardDescription>
                <p>{{ globalMarket.btc_d }}&#37;</p>
            </CardContent>
            <CardContent>
                <CardDescription class='flex'>
                    <NuxtIcon
                        name='cryptocurrency-color:eth'
                        size='20'
                    />
                    <span class='ml-2'>ETH Dominance Index</span>
                </CardDescription>
                <p>{{ globalMarket.eth_d }}&#37;</p>
            </CardContent>
        </Card>
    </MazAnimatedElement>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    import { Separator } from '@/components/ui/separator';
    
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendColor } from '~/utils/styleUtils.js';
    
    const { globalMarket } = storeToRefs(CryptocurrenciesStore);
    const { fetchCoinLoreData } = CryptocurrenciesStore;
    onMounted(() => fetchCoinLoreData('global'));
    
    const totalMarketCap = computed(() => formatNumber(globalMarket.value?.total_mcap));
    const athMarketCap = computed(() => formatNumber(globalMarket.value?.mcap_ath));
    const marketCapTrendChange = computed(() => getTrendColor(globalMarket.value?.mcap_change));
    
    const totalVolume = computed(() => formatNumber(globalMarket.value?.total_volume));
    const athVolume = computed(() => formatNumber(globalMarket.value?.volume_ath));
    const changeVolumeTrend = computed(() => getTrendColor(globalMarket.volume?.volume_change));
</script>

<style>
    .cryptocurrencies-global {
        .card {
            border-color: var(--border);
            min-height: 300px;
            margin: 25px;
            width: 250px;
        }
    }
</style>