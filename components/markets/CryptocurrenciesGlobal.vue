<template>
    <section class='cryptocurrencies-global flex flex-wrap gap-6'>
        <Card class='card'>
            <CardHeader>
                <CardTitle>Coins</CardTitle>
                <CardDescription>Total crypto assets</CardDescription>
            </CardHeader>
            <CardContent>
                {{ globalMarket.coins_count }}
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>Markets</CardTitle>
                <CardDescription>Active crypto markets</CardDescription>
            </CardHeader>
            <CardContent>
                {{ globalMarket.active_markets }}
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
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>Volume</CardTitle>
                <CardDescription>Total crypto volume</CardDescription>
            </CardHeader>
            <CardContent>
                {{ totalVolume }}
            </CardContent>
        </Card>
        
        <Card class='card'>
            <CardHeader>
                <CardTitle>BTC Dominance</CardTitle>
                <CardDescription>BTC Dominance Index</CardDescription>
            </CardHeader>
            <CardContent>
                {{ globalMarket.btc_d }}&#37;
            </CardContent>
        </Card>
    </section>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const { globalMarket } = storeToRefs(CryptocurrenciesStore);
    const { fetchCoinLoreData } = CryptocurrenciesStore;
    onMounted(() => fetchCoinLoreData('global'));
    
    const totalMarketCap = computed(() => formatNumber(globalMarket.value?.total_mcap));
    const totalVolume = computed(() => formatNumber(globalMarket.value?.total_volume));
    const athMarketCap = computed(() => formatNumber(globalMarket.value?.mcap_ath));
</script>

<style>
    .cryptocurrencies-global {
        .card {
            width: 335px;
            height: 225px;
        }
    }
</style>