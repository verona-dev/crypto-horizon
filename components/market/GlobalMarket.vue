<template>
    <MazAnimatedElement
        direction='down'
        :duration='2000'
        class='global-market flex flex-wrap items-center justify-center'
    >
        <div class='flex flex-col lg:flex-row'>
            <Card class='card'>
                <!--  Assets  -->
                <h5 class='text-center'>Assets</h5>
                <Separator />
                
                <CardContent class='mb-8'>
                    <CardDescription>Total number of coins</CardDescription>
                    <p v-if='coins_count'>{{ coins_count }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <!--  Markets  -->
                <h5 class='text-center'>Markets</h5>
                <Separator />
                
                <CardContent>
                    <CardDescription>Total exchange pairs</CardDescription>
                    <p v-if='active_markets'>{{ active_markets }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
            </Card>
            
            <!--  Market Cap  -->
            <Card class='card'>
                <h5 class='text-center'>Market Cap</h5>
                <Separator />
                
                <CardContent>
                    <CardDescription>Total crypto market cap</CardDescription>
                    <p v-if='mcap_total'>{{ mcap_total_label }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>ATH total market cap</CardDescription>
                    <p v-if='mcap_ath'>{{ mcap_ath_label }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>Change for last 24h</CardDescription>
                    <p v-if='!!mcap_change' :class='mcap_change_class'>{{ mcap_change_label }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
            </Card>
        </div>
        
        <div class='flex flex-col lg:flex-row'>
            <!--  Volume  -->
            <Card class='card'>
                <h5 class='text-center'>Volume</h5>
                <Separator />
                
                <CardContent>
                    <CardDescription>Total trading volume for last 24h</CardDescription>
                    <p v-if='total_volume'>{{ total_volume_label }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>ATH total trading volume</CardDescription>
                    <p v-if='volume_ath'>{{ volume_ath_label }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
                
                <CardContent>
                    <CardDescription>Change for last 24h</CardDescription>
                    <p v-if='!!volume_change' :class='volume_change_class'>{{ volume_change_label }}</p>
                    <p v-else>&#8208;</p>
                </CardContent>
            </Card>
            
            <!--  Dominance  -->
            <Card class='card'>
                <h5 class='text-center'>Dominance</h5>
                <Separator />
                
                <CardContent>
                    <NuxtLink
                        to='/market/bitcoin'
                        class='flex items-center'
                    >
                        <NuxtIcon
                            name='token-branded:btc'
                            size='70'
                            class='mr-4 mb-1'
                        />
                        
                        <div class='flex flex-col items-start'>
                            <CardDescription class='text-left'>
                                BTC Dominance Index
                            </CardDescription>
                            
                            <p v-if='!!btc_dominance'>{{ btc_dominance }}&#37;</p>
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
                            size='70'
                            class='mr-4'
                        />
                        
                        <div class='flex flex-col items-start'>
                            <CardDescription class='text-left'>
                                ETH Dominance Index
                            </CardDescription>
                            
                            <p v-if='!!eth_dominance'>{{ eth_dominance }}&#37;</p>
                            <p v-else>&#8208;</p>
                        </div>
                    </NuxtLink>
                </CardContent>
            </Card>
        </div>
    </MazAnimatedElement>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTextColorClass } from '~/utils/styleUtils.js';
    
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
    const btc_dominance = computed(() => marketOverview.value?.btc_d);
    const eth_dominance = computed(() => marketOverview.value?.eth_d);
    
    const mcap_total = computed(() => marketOverview.value?.total_mcap);
    const mcap_total_label =  computed(() => formatNumber(mcap_total.value, {
        compact: true, decimals: 2
    }));
    const mcap_ath = computed(() => marketOverview.value?.mcap_ath);
    const mcap_ath_label = computed(() => formatNumber(mcap_ath.value, {
        compact: true, decimals: 2
    }));
    const mcap_change = computed(() => marketOverview.value?.mcap_change);
    const mcap_change_label = computed(() => formatNumber(mcap_change.value, {
        style: 'percent', compact: true, decimals: 2
    }));
    const mcap_change_class = computed(() => getTextColorClass(mcap_change.value));
    
    const total_volume = computed(() => marketOverview.value?.total_volume);
    const total_volume_label = computed(() => formatNumber(total_volume.value, {
        compact: true, decimals: 2
    }));
    const volume_ath = computed(() => marketOverview.value?.volume_ath);
    const volume_ath_label = computed(() => formatNumber(volume_ath.value, { compact: true }));
    const volume_change = computed(() => marketOverview.value?.volume_change);
    const volume_change_label = computed(() => formatNumber(volume_change.value, {
        style: 'percent', compact: true, decimals: 2
    }));
    const volume_change_class = computed(() => getTextColorClass(volume_change.value));
    
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