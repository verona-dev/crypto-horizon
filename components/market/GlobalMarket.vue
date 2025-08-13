<template>
    <MazAnimatedElement
        direction='down'
        :duration='2000'
        class='global-market flex flex-wrap items-center justify-center my-20'
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
                    <p v-if='coins_count'>{{ coins_count }}</p>
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
                    <p v-if='active_markets'>{{ active_markets }}</p>
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
                    <p v-if='total_mcap'>{{ formatNumber(total_mcap, { compact: true, decimals: 2 }) }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>ATH total market cap</CardDescription>
                    <p v-if='mcap_ath'>{{ formatNumber(mcap_ath, { compact: true, decimals: 2 }) }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>Change for last 24h</CardDescription>
                    <p v-if='mcap_change' :class='mcap_change_style'>{{ formatNumber(mcap_change, { style: 'percent', compact: true, decimals: 2, }) }}</p>
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
                    <p v-if='total_volume'>{{ formatNumber(total_volume, { compact: true, decimals: 2 }) }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>ATH total trading volume</CardDescription>
                    <p v-if='volume_ath'>{{ formatNumber(volume_ath, { compact: true, decimals: 2 }) }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>Change for last 24h</CardDescription>
                    <p v-if='volume_change' :class='volume_change_style'>{{ formatNumber(volume_change, { style: 'percent', compact: true, decimals: 2, }) }}</p>
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
    } from '~/components/ui/card/index.js';
    import { Separator } from '~/components/ui/separator/index.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { marketOverview } = storeToRefs(MarketStore);
    const { getCoinLore } = MarketStore;
    
    const active_markets = computed(() => marketOverview.value?.active_markets);
    const coins_count = computed(() => marketOverview.value?.coins_count);
    const total_mcap = computed(() => marketOverview.value?.total_mcap);
    const mcap_ath = computed(() => marketOverview.value?.mcap_ath);
    const mcap_change = computed(() => marketOverview.value?.mcap_change);
    const mcap_change_style = computed(() => getTextColor(mcap_change.value));
    const total_volume = computed(() => marketOverview.value?.total_volume);
    const volume_ath = computed(() => marketOverview.value?.volume_ath);
    const volume_change = computed(() => marketOverview.value?.volume_change);
    const volume_change_style = computed(() => getTextColor(volume_change.value));

    onMounted(() => getCoinLore('global'));
</script>

<style>
    .global-market {
        .card {
            border-color: var(--card-border);
            min-height: 375px;
            margin: 25px;
            width: 300px;
        }
    }
</style>