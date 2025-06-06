<template>
    <section class='w-3/4 cryptocurrencies-global flex flex-wrap gap-6'>
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
                <CardDescription>Total crypto market cap</CardDescription>
            </CardHeader>
            <CardContent>
                {{ totalMarketCap }}
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
</script>

<style>
    .cryptocurrencies-global {
        .card {
            width: 300px;
            height: 300px;
        }
    }
</style>