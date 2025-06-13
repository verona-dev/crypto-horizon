<template>
    <MazAnimatedElement
        direction='down'
        :duration='2000'
        class='cryptocurrencies-global flex flex-wrap justify-center my-20'
    >
        <Card class='card justify-between'>
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
                <Separator />
            </CardHeader>
            
            <CardContent>
                <CardDescription>Total number of coins</CardDescription>
                <p v-if='globalMarket.coins_count'>{{ globalMarket.coins_count }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
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
                <Separator />
            </CardHeader>
            
            <CardContent>
                <CardDescription>Total exchange pairs</CardDescription>
                <p v-if='globalMarket.active_markets'>{{ globalMarket.active_markets }}</p>
                <p v-else>&#8208;</p>
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
                <Separator />
            </CardHeader>
            
            <CardContent>
                <CardDescription>Total crypto market cap</CardDescription>
                <p v-if='globalMarket?.total_mcap'>{{ formatNumber(globalMarket?.total_mcap) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>ATH total market cap</CardDescription>
                <p v-if='globalMarket?.mcap_ath'>{{ formatNumber(globalMarket.mcap_ath) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p v-if='globalMarket?.mcap_change' :class='marketCapStyle'>{{ globalMarket.mcap_change }}&#37;</p>
                <p v-else>&#8208;</p>
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
                <Separator />
            </CardHeader>
            
            <CardContent>
                <CardDescription>Total trading volume for last 24h</CardDescription>
                <p v-if='globalMarket?.total_volume'>{{ formatNumber(globalMarket?.total_volume) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>ATH total trading volume</CardDescription>
                <p v-if='globalMarket?.volume_ath'>{{ formatNumber(globalMarket?.volume_ath) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p v-if='globalMarket.volume_change' :class='volumeChangeStyle'>{{ globalMarket.volume_change }}&#37;</p>
                <p v-else>&#8208;</p>
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
                <Separator />
            </CardHeader>
            
            <CardContent>
                <CardDescription class='flex'>
                    <NuxtIcon
                        name='cryptocurrency-color:btc'
                        size='20'
                    />
                    <span class='ml-2'>BTC Dominance Index</span>
                </CardDescription>
                <p v-if='globalMarket.btc_d'>{{ globalMarket.btc_d }}&#37;</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription class='flex'>
                    <NuxtIcon
                        name='cryptocurrency-color:eth'
                        size='20'
                    />
                    <span class='ml-2'>ETH Dominance Index</span>
                </CardDescription>
                <p v-if='globalMarket.eth_d'>{{ globalMarket.eth_d }}&#37;</p>
                <p v-else>&#8208;</p>
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
    const { fetchCoinLore } = CryptocurrenciesStore;
    onMounted(() => fetchCoinLore('global'));
    
    const marketCapStyle = computed(() => getTrendColor(globalMarket.value?.mcap_change));
    const volumeChangeStyle = computed(() => getTrendColor(globalMarket.volume?.volume_change));
</script>

<style>
    .cryptocurrencies-global {
        .card {
            border-color: var(--card-border);
            min-height: 300px;
            margin: 25px;
            width: 300px;
        }
    }
</style>