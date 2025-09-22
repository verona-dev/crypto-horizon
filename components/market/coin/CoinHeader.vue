<template>
    <CardHeader v-if='coin' class='coin-header flex flex-col justify-center items-center'>
        <section class='flex flex-col xl:flex-row items-center gap-4'>
            <div class='flex items-center gap-4'>
                <!--  Go back -->
                <NuxtLink
                    @click='goBack(router, "/market")'
                    to=''
                    class='hover:bg-muted hover:cursor-pointer rounded-xl p-1'
                >
                    <NuxtIcon
                        name='mdi-light:arrow-left'
                        size='50'
                        class='flex'
                    />
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
            
            <div class='flex flex-col justify-center gap-6'>
                <!--  Name  -->
                <div class='flex items-center gap-6'>
                    <h2>{{ coingecko.name }}</h2>
                    
                    <!-- Symbol  -->
                    <div class='flex items-center text-muted-custom gap-2'>
                        <h5 class='great-font'>{{ coin.symbol }}</h5>
                        
                        <!--  Ico Description -->
                        <!--
                        <HoverCard v-if='ico_description' :openDelay='200'>
                            <HoverCardTrigger class='info-icon'>
                                <NuxtIcon
                                    name='radix-icons:info-circled'
                                    size='25'
                                    class='flex'
                                />
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>{{ ico_description }}.</span>
                            </HoverCardContent>
                        </HoverCard>
                        -->
                        
                        <!--   <h2 v-if='livecoinwatch.symbol' class='inline'>{{ livecoinwatch.symbol }}</h2>   -->
                    </div>
                </div>
                
                <!--  Coin price  -->
                <div class='flex flex-col justify-center gap-4'>
                    <!--  Price in USD  -->
                    <div class='flex flex-col gap-6'>
                        <h1 class='text-foreground'>{{ current_price_label }}</h1>
                        
                        <!--  Price change % in USD $  -->
                        <div class='flex items-center gap-2'>
                            <div class='flex items-center'>
                                <NuxtIcon
                                    :name='getTrendIcon(price_change_percentage_7d)'
                                    size='35'
                                    :class='getTextColorClass(price_change_percentage_7d)'
                                />
                                
                                <p :class='getTextColorClass(price_change_percentage_7d)'>
                                    {{ price_change_percentage_7d_label }}&#40;7d&#41;
                                </p>
                            </div>
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='25'
                                        class='flex'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>Price change&#40;&#37;&#41; in USD&#40;&#36;&#41;.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    
                    <!--  Price in BTC  -->
                    <div v-if='not_bitcoin' class='price-in-btc flex items-center gap-6'>
                        <p class='text-sm text-muted-custom'>{{ current_price_in_btc }} BTC</p>
                        
                        <!--  Price change % in BTC  -->
                        <div class='flex items-center gap-2'>
                            <div class='flex items-center'>
                                <NuxtIcon
                                    :name='getTrendIcon(price_change_percentage_7d_in_btc)'
                                    size='25'
                                    :class='getTextColorClass(price_change_percentage_7d_in_btc)'
                                />
                                
                                <p :class='[getTextColorClass(price_change_percentage_7d_in_btc), "text-sm"]'>
                                    {{ price_change_percentage_7d_in_btc_label }}&#40;7d&#41;</p>
                            </div>
                            
                            <HoverCard :openDelay='200'>
                                <HoverCardTrigger class='info-icon'>
                                    <NuxtIcon
                                        name='radix-icons:info-circled'
                                        size='25'
                                        class='flex'
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent class='hover-card-content'>
                                    <span class='text-sm'>Current price in BTC and price change&#40;&#37;&#41; compared to Bitcoin&#40;BTC&#41;.</span>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </div>
                
                <!--  Rank + Watchlist -->
                <div class='flex items-center gap-6'>
                    <!--  Rank  -->
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger class='info-icon'>
                            <MazBadge
                                color='info'
                                size='1.25rem'
                                rounded-size='md'
                                class='cursor-default'
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
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger class='info-icon'>
                            <MazBadge
                                color='theme'
                                size='1.25rem'
                                rounded-size='md'
                                class='cursor-default'
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
        </section>
        
        <CoinPublicNotice :public-notice='coingecko.public_notice' />
    </CardHeader>
</template>

<script setup>
    import { formatNumber, goBack } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.ts';
    import CoinPublicNotice from '~/components/market/coin/CoinPublicNotice.vue';
    
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
    const watchlist_portfolio = formatNumber(coingecko.value?.watchlist_portfolio_users, {
        style: 'decimal', compact: true, decimals: 2,
    });
    
    const not_bitcoin = coin.value?.symbol !== 'BTC';
    const current_price = coingecko.value?.market_data?.current_price?.usd;
    const current_price_label = formatNumber(current_price, {
        maximumFractionDigits: 4,
    });
    const current_price_in_btc = coingecko.value?.market_data?.current_price?.btc;
    
    const price_change_percentage_7d = coingecko.value?.market_data?.price_change_percentage_7d;
    const price_change_percentage_7d_label = formatNumber(price_change_percentage_7d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const price_change_percentage_7d_in_btc = computed(() => coingecko.value?.market_data?.price_change_percentage_7d_in_currency?.btc);
    const price_change_percentage_7d_in_btc_label = formatNumber(price_change_percentage_7d_in_btc.value, {
        style: 'percent', compact: true, decimals: 2,
    });
    const ico_description = coingecko.value?.ico_data?.short_desc;
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