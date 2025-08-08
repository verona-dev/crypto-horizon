<template>
    <MazAnimatedElement
        direction='down'
        :duration='2000'
        class='cryptocurrencies-global flex flex-wrap items-center justify-center my-20'
    >
        <div class='flex flex-col lg:flex-row'>
            <Card class='card'>
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
                <CardHeader class='mt-10'>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Markets'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
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
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Market Cap'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
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
        </div>
        
        <div class='flex flex-col lg:flex-row'>
            <!--  Volume  -->
            <Card class='card'>
                <CardHeader>
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Volume'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                    <Separator />
                </CardHeader>
                
                <CardContent>
                    <CardDescription>Total trading volume for last 24h</CardDescription>
                    <p v-if='marketOverview?.total_volume'>{{
                            formatNumberWithOptions(marketOverview?.total_volume)
                                                           }}</p>
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
                    <MazAnimatedText
                        tag='h4'
                        text=''
                        last-word='Dominance'
                        :delay='500'
                        :duration='2000'
                        direction='left'
                    />
                    <Separator />
                </CardHeader>
                
                <CardContent>
                    <NuxtLink
                        to='/market/bitcoin'
                        class='flex items-center'
                    >
                        <NuxtIcon
                            name='token-branded:btc'
                            size='50'
                            class='mr-4 mb-1'
                        />
                        
                        <div class='flex flex-col items-start'>
                            <CardDescription>
                                BTC Dominance Index
                            </CardDescription>
                            
                            <p v-if='marketOverview.btc_d'>{{ marketOverview.btc_d }}&#37;</p>
                            <p v-else>&#8208;</p>
                        </div>
                    </NuxtLink>
                </CardContent>
                
                <CardContent>
                    <NuxtLink
                        to='/market/ethereum'
                        class='flex items-center'
                    >
                        <NuxtIcon
                            name='token-branded:eth'
                            size='50'
                            class='mr-4'
                        />
                        
                        <div class='flex flex-col items-start'>
                            <CardDescription>
                                ETH Dominance Index
                            </CardDescription>
                            
                            <p v-if='marketOverview.eth_d'>{{ marketOverview.eth_d }}&#37;</p>
                            <p v-else>&#8208;</p>
                        </div>
                    </NuxtLink>
                </CardContent>
            </Card>
        </div>
    </MazAnimatedElement>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '~/components/ui/card/index.js';
    import { Separator } from '~/components/ui/separator/index.js';
    
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    import { formatNumberWithOptions } from '~/utils/formatUtils.js';
    import { getTextColor } from '~/utils/styleUtils.js';
    
    const { marketOverview } = storeToRefs(CryptocurrenciesStore);
    const { getCoinLore } = CryptocurrenciesStore;
    onMounted(() => getCoinLore('global'));
    
    const marketCapStyle = computed(() => getTextColor(marketOverview.value?.mcap_change));
    const volumeChangeStyle = computed(() => getTextColor(marketOverview.value?.volume_change));

</script>

<style>
    .cryptocurrencies-global {
        .card {
            border-color: var(--card-border);
            min-height: 375px;
            margin: 25px;
            width: 300px;
        }
    }
</style>