<template>
    <CardHeader v-if='coin' class='coin-header flex w-full animate-fadeIn'>
        <Card class='bg-background flex flex-col items-center justify-center relative'>
            <GlowBorder
                v-if='dark_mode'
                :color='["#A07CFE", "#FE8FB5", "#FFBE7B"]'
                :border-radius='6'
                :duration='75'
                :borderWidth='1'
            />
            
            <!--  Go back -->
            <!--
            <NuxtLink
                @click='goBack(router, "/market")'
                to=''
                class='alert-go-back absolute top-0 left-0 h-full w-20 flex items-center justify-center px-2 border border-r-accent hover:bg-muted hover:cursor-pointer'
            >
                <NuxtIcon
                    name='mdi-light:arrow-left'
                    size='50'
                />
            </NuxtLink>
            -->
            
            <div class='flex flex-col items-center gap-12 p-10'>
                <div class='flex flex-col justify-center items-center gap-4'>
                    <!-- Logo + Name  -->
                    <div class='flex justify-center items-center gap-6'>
                        <NuxtImg
                            v-if='coingecko?.image?.large'
                            :src='coin.coingecko.image.large'
                            alt='symbol'
                            width='80'
                            height='80'
                        />
                        
                        <h2>{{ coingecko.name }}</h2>
                    </div>
                    
                    <CardDescription class='flex items-center gap-4'>
                        <!--  Rank  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger>
                                <Badge class='h-8 px-2 py-1 text-muted-foreground' variant='outline'>
                                
                                &#35;{{ coingecko.market_cap_rank }}
                                </Badge>
                            </HoverCardTrigger>
                            
                            <HoverCardContent>Ranked {{ coingecko.market_cap_rank }} by market cap out of all active cryptocurrencies listed on CoinGecko.</HoverCardContent>
                        </HoverCard>
                        
                        <!-- Symbol  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='symbol flex items-center gap-4'>
                                <h2 class='text-xl'>{{ coin.symbol }}</h2>
                                <h2 v-if='livecoinwatch.symbol' class='text-xl'>{{ livecoinwatch.symbol }}</h2>
                            </HoverCardTrigger>
                            
                            <!--  Ico Description -->
                            <HoverCardContent v-if='ico_description'>{{ ico_description }}.</HoverCardContent>
                        </HoverCard>
                        
                        <!--  Portfolio watchlist  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger>
                                <Badge class='h-8 px-2 flex items-center gap-2 text-xs text-muted-foreground' variant='outline'>
                                
                                <NuxtIcon
                                        name='ph:star-half-fill'
                                        class='text-yellow-selective'
                                        size='20'
                                    />
                                    {{ watchlist_portfolio }}
                                </Badge>
                            </HoverCardTrigger>
                            <HoverCardContent>{{ watchlist_portfolio }} watchlists on Coingecko include {{ coin.symbol }}.</HoverCardContent>
                        </HoverCard>
                    </CardDescription>
                </div>
                
                <!--  Price  -->
                <div class='flex flex-col xl:flex-row gap-10 xl:gap-24'>
                    <!--  Price in USD  -->
                    <div class='flex flex-col items-center gap-2 text-green-dollar'>
                        <h2 class='text-3xl md:text-5xl'>{{ current_price_label }}</h2>
                        
                        <!--  Price change % in USD $  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center gap-1'>
                                <NuxtIcon
                                    :name='getTrendIcon(price_change_percentage)'
                                    size='15'
                                    :class='getTrendClass(price_change_percentage)'
                                />
                                
                                <p
                                    :class='getTrendClass(price_change_percentage)'
                                    class='flex items-center text-sm'
                                >
                                    {{ price_change_percentage_label }}
                                    <span class='ml-1'>&#40;{{ timeframe_label }}&#41;</span>
                                </p>
                            </HoverCardTrigger>
                            
                            <HoverCardContent>Current coin price in &#65284;USD and price change percentage.</HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <!--  Price in BTC  -->
                    <div class='flex flex-col items-center gap-2 text-orange-bitcoin' v-if='not_bitcoin'>
                        <div class='flex items-center gap-2'>
                            <NuxtIcon
                                name='logos:bitcoin'
                                class='mb-0.5'
                                size='45'
                            />
                            
                            <h2 class='text-3xl md:text-5xl'>{{ current_price_in_btc_label }}</h2>
                        </div>
                        
                        <!--  Price change % in BTC  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center gap-1'>
                                <NuxtIcon
                                    :name='getTrendIcon(price_change_percentage_btc)'
                                    size='15'
                                    :class='getTrendClass(price_change_percentage_btc)'
                                />
                                
                                <p
                                    :class='[getTrendClass(price_change_percentage_btc)]'
                                    class='flex items-center text-sm'
                                >
                                    {{ price_change_percentage_btc_label }}
                                    <span class='ml-1'>&#40;{{ timeframe_label }}&#41;</span>
                                </p>
                            </HoverCardTrigger>
                            
                            <HoverCardContent>Current coin price in BTC and {{ coin.symbol }}'s price change percentage compared to Bitcoin&#40;BTC&#41;.</HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                
                <CoinPublicNotice :public-notice='coingecko.public_notice' />
            </div>
        </Card>
    </CardHeader>
</template>

<script setup>
    import { formatNumber, goBack } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTrendClass } from '~/utils/styleUtils.js';
    import { Badge } from '~/components/ui/badge';
    import { Card, CardTitle, CardDescription, CardHeader } from '~/components/ui/card';
    import CoinPublicNotice from '~/components/market/id/CoinPublicNotice.vue';
    import { GlowBorder } from '~/components/ui/glow-border';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getTimeframe, getCoinPrice } = storeToRefs(MarketStore);
    
    // Router
    import { useRouter } from 'vue-router';
    const router  = useRouter();
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const livecoinwatch = toRef(coin.value?.livecoinwatch);
    const watchlist_portfolio = formatNumber(coingecko.value?.watchlist_portfolio_users, {
        style: 'decimal', compact: true, decimals: 2,
    });
    const not_bitcoin = coin.value?.symbol !== 'BTC';
    const timeframe = computed(() => coin.value.timeframe);
    const timeframe_label = computed(() => getTimeframe.value?.label);
    
    // Price in USD
    const current_price = computed(() => getCoinPrice.value);
    const current_price_label = computed(() => formatNumber(current_price.value));
    
    const price_change_percentage = computed(() => {
        if(timeframe.value === 1) return price_change_percentage_1d;
        if(timeframe.value === 7) return price_change_percentage_7d;
        if(timeframe.value === 30) return price_change_percentage_30d;
        if(timeframe.value === 365) return price_change_percentage_1y;
    });
    
    const price_change_percentage_label = computed(() => {
        if(timeframe.value === 1) return price_change_percentage_1d_label;
        if(timeframe.value === 7) return price_change_percentage_7d_label;
        if(timeframe.value === 30) return price_change_percentage_30d_label;
        if(timeframe.value === 365) return price_change_percentage_1y_label;
    });
    
    const price_change_percentage_1d = coingecko.value?.market_data?.price_change_percentage_24h;
    const price_change_percentage_1d_label = formatNumber(price_change_percentage_1d, {
        style: 'percent',
    });
    const price_change_percentage_7d = coingecko.value?.market_data?.price_change_percentage_7d;
    const price_change_percentage_7d_label = formatNumber(price_change_percentage_7d, {
        style: 'percent',
    });
    const price_change_percentage_30d = coingecko.value?.market_data?.price_change_percentage_30d;
    const price_change_percentage_30d_label = formatNumber(price_change_percentage_30d, {
        style: 'percent',
    });
    const price_change_percentage_1y = coingecko.value?.market_data?.price_change_percentage_1y;
    const price_change_percentage_1y_label = formatNumber(price_change_percentage_1y, {
        style: 'percent',
    });
    
    // Price in BTC
    const current_price_in_btc = coingecko.value?.market_data?.current_price?.btc;
    const current_price_in_btc_label = formatNumber(current_price_in_btc, {
        style: 'decimal', maximumFractionDigits: 5,
    });
    
    const price_change_percentage_btc = computed(() => {
        if(timeframe.value === 1) return price_change_percentage_1d_btc;
        if(timeframe.value === 7) return price_change_percentage_7d_btc;
        if(timeframe.value === 30) return price_change_percentage_30d_btc;
        if(timeframe.value === 365) return price_change_percentage_1y_btc;
    });
    
    const price_change_percentage_btc_label = computed(() => {
        if(timeframe.value === 1) return price_change_percentage_1d_btc_label;
        if(timeframe.value === 7) return price_change_percentage_7d_btc_label;
        if(timeframe.value === 30) return price_change_percentage_30d_btc_label;
        if(timeframe.value === 365) return price_change_percentage_1y_btc_label;
    });
    
    const price_change_percentage_1d_btc = coingecko.value?.market_data?.price_change_percentage_24h_in_currency?.btc;
    const price_change_percentage_1d_btc_label = formatNumber(price_change_percentage_1d_btc, {
        style: 'percent',
    });
    const price_change_percentage_7d_btc = coingecko.value?.market_data?.price_change_percentage_7d_in_currency?.btc;
    const price_change_percentage_7d_btc_label = formatNumber(price_change_percentage_7d_btc, {
        style: 'percent',
    });
    const price_change_percentage_30d_btc = coingecko.value?.market_data?.price_change_percentage_30d_in_currency?.btc;
    const price_change_percentage_30d_btc_label = formatNumber(price_change_percentage_30d_btc, {
        style: 'percent',
    });
    const price_change_percentage_1y_btc = coingecko.value?.market_data?.price_change_percentage_1y_in_currency?.btc;
    const price_change_percentage_1y_btc_label = formatNumber(price_change_percentage_1y_btc, {
        style: 'percent',
    });
    
    const ico_description = coingecko.value?.ico_data?.short_desc;
</script>