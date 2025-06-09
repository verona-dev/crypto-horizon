<template>
    <section class='cryptocurrencies-global flex flex-wrap gap-6'>
        <Card
            v-if='globalMarket'
            class='card'
        >
            <CardHeader>
                <CardTitle>Assets</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total</CardDescription>
                <p>{{ globalMarket.coins_count }}</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>Markets</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Active markets</CardDescription>
                <p>{{ globalMarket.active_markets }}</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total</CardDescription>
                <p>{{ totalMarketCap }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>All time high</CardDescription>
                <p>{{ athMarketCap }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>Change %</CardDescription>
                <p :class='marketCapTrendChange'>{{ globalMarket.mcap_change }}</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>Volume</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Total</CardDescription>
                <p>{{ totalVolume }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>All time high</CardDescription>
                <p>{{ athVolume }}</p>
            </CardContent>
            <CardContent>
                <CardDescription>Change %</CardDescription>
                <p :class='changeVolumeTrend'>{{ globalMarket.volume_change }}</p>
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>Dominance</CardTitle>
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
    </section>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    
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
            width: 275px;
            height: 300px;
        }
    }
</style>