<template>
    <!--  Assets + Markets  -->
    <div class='slide'>
        <Card class='card'>
            <!--  Assets  -->
            <h3 class='text-center'>Assets</h3>
            <Separator />
            
            <CardContent class='mb-8'>
                <CardDescription>Total number of coins</CardDescription>
                <p v-if='active_cryptocurrencies'>{{ active_cryptocurrencies }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
            
            <!--  Markets  -->
            <h3 class='text-center'>Markets</h3>
            <Separator />
            
            <CardContent>
                <CardDescription>Total exchange pairs</CardDescription>
                <p v-if='markets'>{{ markets }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
        </Card>
    </div>
    
    <!--  Market Cap  -->
    <div class='slide'>
        <Card class='card'>
            <h3 class='text-center'>Market Cap</h3>
            <Separator />
            
            <CardContent>
                <CardDescription>Total crypto market cap</CardDescription>
                <p v-if='mcap_total'>{{ mcap_total_label }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
            
            <CardContent>
                <CardDescription>Change for last 24h</CardDescription>
                <p v-if='!!mcap_change' :class='mcap_change_class'>{{ mcap_change_label }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
        </Card>
    </div>
    
    <!--  Volume  -->
    <div class='slide'>
        <Card class='card'>
            <h3 class='text-center'>Volume</h3>
            <Separator />
            
            <CardContent>
                <CardDescription>Total trading volume for last 24h</CardDescription>
                <p v-if='total_volume'>{{ total_volume_label }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
            
            <!--  Ico  -->
            <h3 class='text-center'>ICO</h3>
            <Separator />
            
            <CardContent>
                <CardDescription>Ended ICO's</CardDescription>
                <p v-if='ended_icos'>{{ ended_icos }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
            
            <CardContent>
                <CardDescription>Ongoing ICO's</CardDescription>
                <p v-if='ongoing_icos'>{{ ongoing_icos }}</p>
                <span v-else>&#8208;</span>
            </CardContent>
            
            <CardContent>
                <CardDescription>Upcoming ICO's</CardDescription>
                <p>{{ upcoming_icos }}</p>
            </CardContent>
        </Card>
    </div>
    
    <!--  Dominance  -->
    <div class='slide'>
        <Card class='card'>
            <h3 class='text-center'>Dominance</h3>
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
                        
                        <p v-if='!!btc_dominance_label'>{{ btc_dominance_label }}&#37;</p>
                        <span v-else>&#8208;</span>
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
                        
                        <p v-if='!!eth_dominance_label'>{{ eth_dominance_label }}&#37;</p>
                        <span v-else>&#8208;</span>
                    </div>
                </NuxtLink>
            </CardContent>
        </Card>
    </div>
    
    <h6>Data updated at {{ updated_at }}</h6>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTextColorClass } from '~/utils/styleUtils.js';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);
    
    import {
        Card,
        CardContent,
        CardDescription,
    } from '~/components/ui/card/index.js';
    import { Separator } from '~/components/ui/separator/index.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalMarket } = storeToRefs(MarketStore);
    const { getCoingeckoGlobalMarket } = MarketStore;
    
    const active_cryptocurrencies = computed(() => globalMarket.value?.active_cryptocurrencies);
    const markets = computed(() => globalMarket.value?.markets);
    
    const mcap_total = computed(() => globalMarket.value?.total_market_cap?.usd);
    const mcap_total_label =  computed(() => formatNumber(mcap_total.value, {
        compact: true, decimals: 2
    }));
    const mcap_change = computed(() => globalMarket.value?.market_cap_change_percentage_24h_usd);
    const mcap_change_label = computed(() => formatNumber(mcap_change.value, {
        style: 'percent', compact: true, decimals: 2
    }));
    const mcap_change_class = computed(() => getTextColorClass(mcap_change.value));
    
    const total_volume = computed(() => globalMarket.value?.total_volume?.usd);
    const total_volume_label = computed(() => formatNumber(total_volume.value, {
        compact: true, decimals: 2
    }));
    
    const ended_icos = computed(() => globalMarket.value?.ended_icos);
    const ongoing_icos = computed(() => globalMarket.value?.ongoing_icos);
    const upcoming_icos = computed(() => globalMarket.value?.upcoming_icos);
    
    const btc_dominance_label = computed(() => formatNumber(globalMarket.value?.market_cap_percentage?.btc, {
        style: 'percent', compact: true, decimals: 2
    }));
    const eth_dominance_label = computed(() => formatNumber(globalMarket.value?.market_cap_percentage?.eth, {
        style: 'percent', compact: true, decimals: 2
    }));
    
    const updated_at = computed(() => dayjs.unix(globalMarket.value?.updated_at).format('MMM D YYYY, HH:mm[h]'));
    
    onMounted(() => getCoingeckoGlobalMarket());
</script>
