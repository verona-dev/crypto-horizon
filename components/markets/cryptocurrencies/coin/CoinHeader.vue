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
                <div class='ml-1 mt-2'>
                    <p class='inline mr-3'>{{ coin.symbol }}</p>
                    <p v-if='livecoinwatch.symbol' class='inline'>{{ livecoinwatch.symbol }}</p>
                </div>
                
                <!--  Coin price  -->
                <h4 class='text-foreground mt-4'>{{ formatPrice(currentPrice, { truncate: true }) }}</h4>
                
                <!--  Price high 24h + low 24h -->
                <div class='mt-14 w-[450px]'>
                    <Progress
                        v-model='progress'
                        :indicatorColor='progressColor'
                    />
                    <div class='flex justify-between'>
                        <p>{{ formatPrice(low24hComputed) }}</p>
                        <p>24h Range</p>
                        <p>{{ formatPrice(high24hComputed) }}</p>
                    </div>
                
                </div>
            </div>
        </section>
        
        <CoinPublicNotice :public-notice='coingecko.public_notice' />
    </CardHeader>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { formatNumberWithOptions, formatPrice } from '~/utils/formatUtils.js';
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
    const currentPrice = computed(() => coingecko.value?.market_data?.current_price?.usd);
    const high24h = computed(() => coingecko.value?.market_data?.high_24h?.usd);
    const high24hComputed = computed(() => {
        // Coingecko Api has delays in updating the high24h value therefore the current price can temporarily be above the high24h
        if(currentPrice.value > high24h.value) return currentPrice;
        return high24h.value;
    });
    const low24h = computed(() => coingecko.value?.market_data?.low_24h?.usd);
    const low24hComputed = computed(() => {
        // Coingecko Api has delays in updating the low24h value therefore the current price can temporarily be under the low24h
        if(currentPrice.value < low24h.value) return currentPrice;
        return low24h.value;
    });
    const progress = computed(() => {
        const range = high24hComputed.value - low24hComputed.value;
        if (range < 0.005) return 99; // for stablecoins, since range can be as low as .001
        return ((currentPrice.value - low24hComputed.value) / range) * 100;
    });
    const progressColor = computed(() => {
        if(progress.value < 25) return '#E32D2D';
        else if(progress.value < 50) return 'linear-gradient(90deg, #E32D2D 75%, #EBAA28 100%)';
        return 'linear-gradient(90deg, #E32D2D 0%, #EBAA28 50%, #1AC914 100%)';
    });
</script>

<style scoped>
    .coin-header {
        p {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        }
        
        span.iconify {
            color: oklch(0.828 0.189 84.429) !important;
        }
    }
</style>