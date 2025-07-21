<template>
    <CardHeader v-if='coin' class='coin-header flex flex-col justify-center items-center'>
        <section class='my-10 flex flex-col lg:flex-row items-center gap-y-10 lg:gap-y-0 gap-x-10'>
            <!-- Logo  -->
            <NuxtImg
                v-if='coingecko?.image?.large'
                :src='coin.coingecko.image.large'
                alt='symbol'
                width='150'
                height='150'
            />
            
            <div>
                <!--  Name + Rank  -->
                <div class='flex items-center'>
                    <h2>{{ coingecko.name }}</h2>
                    
                    <HoverCard
                        :openDelay='200'
                        class='flex'
                    >
                        <HoverCardTrigger class='info-icon'>
                            <MazBadge
                                color='info'
                                size='1.25rem'
                                rounded-size='md'
                                class='ml-8 mt-1 cursor-default'
                                outline
                            >
                                &#35;{{ coingecko.market_cap_rank }}
                            </MazBadge>
                        </HoverCardTrigger>
                        <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>
                                    Coin rank by market cap
                                </span>
                        </HoverCardContent>
                    </HoverCard>
                    
                    <!--  Portfolio watchlist  -->
                    <HoverCard
                        :openDelay='200'
                        class='flex'
                    >
                        <HoverCardTrigger class='info-icon'>
                            <MazBadge
                                color='theme'
                                size='1.25rem'
                                rounded-size='md'
                                class='ml-8 mt-1 cursor-default'
                                outline
                            >
                                <div class='flex items-center'>
                                    <NuxtIcon
                                        name='iconoir:star-solid'
                                        size='25'
                                        class='mr-2'
                                    />
                                    {{ watchlist_portfolio }}
                                </div>
                            </MazBadge>
                        </HoverCardTrigger>
                        <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>
                                    {{ watchlist_portfolio }} watchlists on Coingecko include {{ coin.symbol }}
                                </span>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                
                <!-- Symbol  -->
                <div class='ml-1 mt-2 text-muted-custom'>
                    <p class='inline mr-3'>{{ coin.symbol }}</p>
                    <p v-if='livecoinwatch.symbol' class='inline'>{{ livecoinwatch.symbol }}</p>
                </div>
                
                <!--  Coin price + Trend  -->
                <div class='mt-4'>
                    <div class='flex items-center'>
                        <h4 class='text-foreground'>{{ formatNumber(current_price, { truncate: true }) }}</h4>
                        
                        <!--  Price change % in USD $  -->
                        <div class='ml-4 mb-2 flex items-center'>
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_7d)'
                                size='35'
                                :class='getTextColor(price_change_percentage_7d)'
                            />
                            
                            <p :class='getTextColor(price_change_percentage_7d)'>{{ price_change_percentage_7d_label }}&#40;7d&#41;</p>
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='25'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>Price change percent in USD $</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    
                    <!--  Price change % in BTC  -->
                    <div v-if='not_bitcoin' class='price-in-btc flex items-center'>
                        <p class='text-sm'>{{ current_price_in_btc }} BTC</p>
                        
                        <div class='ml-3 flex items-center'>
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_7d_in_btc)'
                                size='25'
                                :class='getTextColor(price_change_percentage_7d_in_btc)'
                            />
                            
                            <p :class='[getTextColor(price_change_percentage_7d_in_btc), "text-sm"]'>{{ price_change_percentage_7d_in_btc_label }}&#40;7d&#41;</p>
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='25'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>Price change percent compared to Bitcoin BTC</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>
                
                <!--  Price 24h range -->
                <div class='mt-14 w-[450px] text-muted-custom'>
                    <Progress
                        v-model='progress'
                        :indicatorColor='progress_color'
                    />
                    <div class='flex justify-between'>
                        <p>{{ formatNumber(low_24h_computed) }}</p>
                        <p>24h Range</p>
                        <p>{{ formatNumber(high_24h_computed) }}</p>
                    </div>
                </div>
            </div>
        </section>
        
        <CoinPublicNotice :public-notice='coingecko.public_notice' />
    </CardHeader>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { formatNumberWithOptions, formatNumber } from '~/utils/formatUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import CoinPublicNotice from '~/components/markets/cryptocurrencies/coin/CoinPublicNotice.vue';
    import { Progress } from '~/components/ui/progress/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const livecoinwatch = toRef(coin.value?.livecoinwatch);
    const coingecko = toRef(coin.value?.coingecko);
    const watchlist_portfolio = formatNumberWithOptions(coingecko.value?.watchlist_portfolio_users, false, true);
    
    const not_bitcoin = coin.value?.symbol !== 'BTC';
    const current_price = coingecko.value?.market_data?.current_price?.usd;
    const current_price_in_btc = coingecko.value?.market_data?.current_price?.btc;
    
    const price_change_percentage_7d = coingecko.value?.market_data?.price_change_percentage_7d;
    const price_change_percentage_7d_label = formatNumber(price_change_percentage_7d, { style: 'percent', truncate: true });
    const price_change_percentage_7d_in_btc = coingecko.value?.market_data?.price_change_percentage_7d_in_currency?.btc;
    const price_change_percentage_7d_in_btc_label = formatNumber(coingecko.value?.market_data?.price_change_percentage_7d_in_currency?.btc, { style: 'percent', truncate: true });
   
    const high_24h = coingecko.value?.market_data?.high_24h?.usd;
    const high_24h_computed = computed(() => {
        // Coingecko Api has delays in updating the high24h value therefore the current price can temporarily be above the high24h
        if(current_price > high_24h) return current_price;
        return high_24h;
    });
    
    const low_24h = coingecko.value?.market_data?.low_24h?.usd;
    const low_24h_computed = computed(() => {
        // Coingecko Api has delays in updating the low24h value therefore the current price can temporarily be under the low24h
        if(current_price < low_24h) return current_price;
        return low_24h;
    });
    
    const progress = computed(() => {
        const range = high_24h_computed.value - low_24h_computed.value;
        if (range < 0.005) return 99; // for stablecoins, since range can be as low as .001
        return ((current_price - low_24h_computed.value) / range) * 100;
    });
    const progress_color = computed(() => {
        if(progress.value < 25) return '#E32D2D';
        else if(progress.value < 50) return 'linear-gradient(90deg, #E32D2D 75%, #EBAA28 100%)';
        return 'linear-gradient(90deg, #E32D2D 0%, #EBAA28 50%, #1AC914 100%)';
    });
</script>

<style scoped>
    .coin-header {
        .m-badge {
            span.iconify {
                color: oklch(0.828 0.189 84.429) !important;
            }
        }
    }
</style>