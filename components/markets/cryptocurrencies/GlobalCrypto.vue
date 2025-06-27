<template>
    <MazAnimatedElement
        direction='down'
        :duration='2000'
        class='cryptocurrencies-global flex flex-wrap justify-center my-20'
    >
        <Card class='card justify-between'>
            <!--  Assets  -->
            <CardHeader>
                    <MazAnimatedText
                        tag='h2'
                        text=''
                        last-word='Assets'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                <Separator />
            </CardHeader>
            
            <CardContent>
                <CardDescription>Total number of coins</CardDescription>
                <p v-if='marketOverview.coins_count'>{{ marketOverview.coins_count }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <!--  Markets  -->
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
                <p v-if='marketOverview.active_markets'>{{ marketOverview.active_markets }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
        </Card>
        
        <!--  Market Cap  -->
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
                <p v-if='marketOverview?.total_mcap'>{{ formatNumberWithOptions(marketOverview?.total_mcap) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>ATH total market cap</CardDescription>
                <p v-if='marketOverview?.mcap_ath'>{{ formatNumberWithOptions(marketOverview.mcap_ath) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p v-if='marketOverview?.mcap_change' :class='marketCapStyle'>{{ marketOverview.mcap_change }}&#37;</p>
                <p v-else>&#8208;</p>
            </CardContent>
        </Card>
        
        <!--  Volume  -->
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
                <p v-if='marketOverview?.total_volume'>{{ formatNumberWithOptions(marketOverview?.total_volume) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>ATH total trading volume</CardDescription>
                <p v-if='marketOverview?.volume_ath'>{{ formatNumberWithOptions(marketOverview?.volume_ath) }}</p>
                <p v-else>&#8208;</p>
            </CardContent>
            
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p v-if='marketOverview.volume_change' :class='volumeChangeStyle'>{{ marketOverview.volume_change }}&#37;</p>
                <p v-else>&#8208;</p>
            </CardContent>
        </Card>
        
        <!--  Dominance  -->
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
            
            <CardContent class='flex items-center'>
                <NuxtIcon
                    name='cryptocurrency-color:btc'
                    size='30'
                    class='mr-4'
                />
                
                <div class='flex flex-col'>
                    <CardDescription class='flex items-center'>
                        BTC Dominance Index
                    </CardDescription>
                    
                    <p v-if='marketOverview.btc_d'>{{ marketOverview.btc_d }}&#37;</p>
                    <p v-else>&#8208;</p>
                </div>
            </CardContent>
            
            <CardContent class='flex items-center'>
                <NuxtIcon
                    name='cryptocurrency-color:eth'
                    size='30'
                    class='mr-4'
                />
                
                <div class='flex flex-col'>
                    <CardDescription class='flex items-center'>
                        ETH Dominance Index
                    </CardDescription>
                    
                    <p v-if='marketOverview.eth_d'>{{ marketOverview.eth_d }}&#37;</p>
                    <p v-else>&#8208;</p>
                </div>
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
    import { formatNumberWithOptions } from '~/utils/formatUtils.js';
    import { getTextColor } from '~/utils/styleUtils.js';
    
    const { marketOverview } = storeToRefs(CryptocurrenciesStore);
    const { fetchCoinLore } = CryptocurrenciesStore;
    onMounted(() => fetchCoinLore('global'));
    
    const marketCapStyle = computed(() => getTextColor(marketOverview.value?.mcap_change));
    const volumeChangeStyle = computed(() => getTextColor(marketOverview.value?.volume_change));

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