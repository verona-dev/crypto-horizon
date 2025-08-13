<template>
    <CardHeader v-if='coin' class='coin-header flex flex-col justify-center items-center'>
        <section class='my-4 flex flex-col xl:flex-row items-center gap-10'>
            <div class='flex flex-col items-center gap-4'>
                <!--  Go back -->
                <NuxtLink @click='goBack(router, "/market")' to='' class='hover:bg-muted hover:cursor-pointer rounded-full p-2'>
                    <NuxtIcon name='mdi-light:arrow-left' size='45' />
                </NuxtLink>
                
                <!-- Logo  -->
                <NuxtImg
                    v-if='coingecko?.image?.large'
                    :src='coin.coingecko.image.large'
                    alt='symbol'
                    width='150'
                    height='150'
                />
            </div>
            
            <div>
                <div class='flex items-center'>
                    <!--  Name  -->
                    <div class='flex items-center'>
                        <h1>{{ coingecko.name }}</h1>
                        
                        <!--  Ico Description -->
                        <HoverCard v-if='ico_description' :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex ml-2 mt-2'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>{{ ico_description }}.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <div class='mt-2'>
                        <!--  Rank  -->
                        <HoverCard :openDelay='200' class='flex'>
                            <HoverCardTrigger class='info-icon'>
                                <MazBadge
                                    color='info'
                                    size='1.25rem'
                                    rounded-size='md'
                                    class='ml-8 cursor-default self-center'
                                    outline
                                >
                                    &#35;{{ coingecko.market_cap_rank }}
                                </MazBadge>
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Coin rank by market cap.</span>
                            </HoverCardContent>
                        </HoverCard>
                        
                        <!--  Portfolio watchlist  -->
                        <HoverCard :openDelay='200' class='flex'>
                            <HoverCardTrigger class='info-icon'>
                                <MazBadge
                                    color='theme'
                                    size='1.25rem'
                                    rounded-size='md'
                                    class='ml-8 cursor-default'
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
                                <span class='text-sm'>{{ watchlist_portfolio }} watchlists on Coingecko include {{ coin.symbol }}.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                
                <!-- Symbol  -->
                <div class='ml-1 mt-2 text-muted-custom'>
                    <p class='inline mr-3'>{{ coin.symbol }}</p>
                    <p v-if='livecoinwatch.symbol' class='inline'>{{ livecoinwatch.symbol }}</p>
                </div>
                
                <!--  Coin price  -->
                <div class='mt-4'>
                    <div class='flex items-center'>
                        <h4 class='text-foreground'>{{ current_price_label }}</h4>
                        
                        <!--  Price change % in USD $  -->
                        <div class='ml-4 mb-2 flex items-center'>
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_7d)'
                                size='35'
                                :class='getTextColorClass(price_change_percentage_7d)'
                            />
                            
                            <p :class='getTextColorClass(price_change_percentage_7d)'>{{ price_change_percentage_7d_label }}&#40;7d&#41;</p>
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='25'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>Price change&#40;&#37;&#41; in USD&#40;&#36;&#41;.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    
                    <!--  Price change % in BTC  -->
                    <div v-if='not_bitcoin' class='price-in-btc flex items-center'>
                        <p class='text-sm text-muted-custom'>{{ current_price_in_btc }} BTC</p>
                        
                        <div class='ml-3 flex items-center'>
                            <NuxtIcon
                                :name='getTrendIcon(price_change_percentage_7d_in_btc)'
                                size='25'
                                :class='getTextColorClass(price_change_percentage_7d_in_btc)'
                            />
                            
                            <p :class='[getTextColorClass(price_change_percentage_7d_in_btc), "text-sm"]'>{{ price_change_percentage_7d_in_btc_label }}&#40;7d&#41;</p>
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='25'
                                        class='flex ml-2'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>Current price in BTC and price change&#40;&#37;&#41; compared to Bitcoin&#40;BTC&#41;.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>
                
                <!--  Price 24h range -->
                <div class='mt-8 w-[450px] text-muted-custom'>
                    <Progress
                        v-model='progress'
                        :indicatorColor='progress_color'
                    />
                    <div class='flex justify-between'>
                        <p>{{ low_24h_label }}</p>
                        <p>24h Range</p>
                        <p>{{ high_24h_label }}</p>
                    </div>
                </div>
            </div>
        </section>
        
        <CoinPublicNotice :public-notice='coingecko.public_notice' />
    </CardHeader>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { formatNumber, goBack } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.ts';
    import CoinPublicNotice from '~/components/market/coin/CoinPublicNotice.vue';
    import { Progress } from '~/components/ui/progress/index.ts';
    
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
    const livecoinwatch = toRef(coin.value?.livecoinwatch);
    const coingecko = toRef(coin.value?.coingecko);
    const watchlist_portfolio = formatNumber(coingecko.value?.watchlist_portfolio_users, {
        style: 'decimal', compact: true, decimals: 2,
    });
    
    const not_bitcoin = coin.value?.symbol !== 'BTC';
    const current_price = coingecko.value?.market_data?.current_price?.usd;
    const current_price_label = formatNumber(coingecko.value?.market_data?.current_price?.usd, {
        maximumFractionDigits: 4,
    });
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
    const high_24h_label = formatNumber(high_24h_computed.value, {
        maximumFractionDigits: 4,
    });
    
    const low_24h = coingecko.value?.market_data?.low_24h?.usd;
    const low_24h_computed = computed(() => {
        // Coingecko Api has delays in updating the low24h value therefore the current price can temporarily be under the low24h
        if(current_price < low_24h) return current_price;
        return low_24h;
    });
    const low_24h_label = formatNumber(low_24h_computed.value, {
        maximumFractionDigits: 4,
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
    
    const ico_description = coingecko.value?.ico_data?.short_desc;
    
    const onClick = () => {
        const history = window.history.length > 1;
        if(history) router.back();
        else router.push('/market');
    };
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