<template>
    <CardHeader v-if='coin' class='coin-header flex min-w-full mx-auto'>
        <Alert class='bg-background flex flex-col items-center justify-center p-0'>
            <!--  Go back -->
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
            
            <div class='alert-content flex flex-col items-center ml-20'>
                <div class='flex flex-col items-center gap-4 p-10'>
                    <!-- Logo + Name  -->
                    <div class='flex items-center gap-6'>
                        <NuxtImg
                            v-if='coingecko?.image?.large'
                            :src='coin.coingecko.image.large'
                            alt='symbol'
                            width='80'
                            height='80'
                        />
                        
                        <h1>{{ coingecko.name }}</h1>
                    </div>
                    
                    <!-- Symbol + Rank  -->
                    <div class='flex items-center gap-6'>
                        <!--  Rank + Watchlist -->
                        <div class='flex items-center gap-6'>
                            <div class='flex gap-6'>
                                <!--  Rank  -->
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger>
                                        <MazBadge
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
                                
                                <!-- Symbol  -->
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger
                                        class='flex items-center text-muted-foreground gap-4 '
                                        :class='ico_description && "hover:cursor-help"'
                                    >
                                        
                                        <h2>{{ coin.symbol }}</h2>
                                        <h4 v-if='livecoinwatch.symbol'>{{ livecoinwatch.symbol }}</h4>
                                    </HoverCardTrigger>
                                    
                                    <!--  Ico Description -->
                                    <HoverCardContent v-if='ico_description' class='hover-card-content'>
                                        <span class='text-sm'>{{ ico_description }}.</span>
                                    </HoverCardContent>
                                </HoverCard>
                                
                                <!--  Portfolio watchlist  -->
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger>
                                        <MazBadge
                                            size='1.25rem'
                                            rounded-size='md'
                                            class='cursor-default'
                                            outline
                                        >
                                            <div class='flex items-center gap-2'>
                                                <NuxtIcon
                                                    name='uis:favorite'
                                                    size='20'
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
                    </div>
                </div>
                
                <!--  Price  -->
                <div class='flex flex-col 2xl:flex-row p-10 gap-6 2xl:gap-24'>
                    <!--  Price in USD  -->
                    <div class='flex flex-col items-center'>
                        <h2 class='text-6xl'>{{ current_price_label }}</h2>
                        
                        <!--  Price change % in USD $  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    :name='getTrendIcon(price_change_percentage_7d)'
                                    size='20'
                                    :class='getTextColorClass(price_change_percentage_7d)'
                                />
                                
                                <p
                                    :class='getTextColorClass(price_change_percentage_7d)'
                                    class='flex items-center'
                                >
                                    {{ price_change_percentage_7d_label }}
                                    <span class='ml-1 text-[size:inherit]'>&#40;7d&#41;</span>
                                </p>
                            </HoverCardTrigger>
                            
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Price change&#40;&#37;&#41; in USD&#40;&#36;&#41;.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    
                    <!--  Price in BTC  -->
                    <div class='flex flex-col items-center' v-if='not_bitcoin'>
                        <div class='flex items-center'>
                            <NuxtIcon
                                name='mynaui:bitcoin'
                                size='60'
                            />
                            
                            <h2 class='text-6xl'>{{ current_price_in_btc_label }}</h2>
                        </div>
                        
                        <!--  Price change % in BTC  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center'>
                                <NuxtIcon
                                    :name='getTrendIcon(price_change_percentage_7d_in_btc)'
                                    size='20'
                                    :class='getTextColorClass(price_change_percentage_7d_in_btc)'
                                />
                                
                                <p
                                    :class='[getTextColorClass(price_change_percentage_7d_in_btc)]'
                                    class='flex items-center'
                                >
                                    {{ price_change_percentage_7d_in_btc_label }}
                                    <span class='ml-1 text-[size:inherit]'>&#40;7d&#41;</span>
                                </p>
                            </HoverCardTrigger>
                            
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>Current price in BTC and price change&#40;&#37;&#41; compared to Bitcoin&#40;BTC&#41;.</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
                
                <CoinPublicNotice :public-notice='coingecko.public_notice' />
            </div>
        </Alert>
    </CardHeader>
</template>

<script setup>
    import { formatNumber, goBack } from '~/utils/formatUtils.js';
    import { getTrendIcon, getTextColorClass } from '~/utils/styleUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.ts';
    import { Alert } from '@/components/ui/alert';
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
    const livecoinwatch = toRef(coin.value?.livecoinwatch);
    const watchlist_portfolio = formatNumber(coingecko.value?.watchlist_portfolio_users, {
        style: 'decimal', compact: true, decimals: 2,
    });
    
    const not_bitcoin = coin.value?.symbol !== 'BTC';
    const current_price = coingecko.value?.market_data?.current_price?.usd;
    const current_price_label = formatNumber(current_price, {
        maximumFractionDigits: 4,
    });
    const current_price_in_btc = coingecko.value?.market_data?.current_price?.btc;
    const current_price_in_btc_label = formatNumber(current_price_in_btc, {
        style: 'decimal', maximumFractionDigits: 5,
    });
    
    const price_change_percentage_7d = coingecko.value?.market_data?.price_change_percentage_7d;
    const price_change_percentage_7d_label = formatNumber(price_change_percentage_7d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const price_change_percentage_7d_in_btc = coingecko.value?.market_data?.price_change_percentage_7d_in_currency?.btc;
    const price_change_percentage_7d_in_btc_label = formatNumber(price_change_percentage_7d_in_btc, {
        style: 'percent', compact: true, decimals: 2,
    });
    const ico_description = coingecko.value?.ico_data?.short_desc;
</script>

<style scoped>
    .coin-header {
        .m-badge {
            span.iconify {
                color: var(--yellow-selective) !important;
            }
        }
        
        [data-hover-card-trigger],
        .m-badge {
            color: var(--muted-foreground) !important;
            border: 1px solid var(--accent);
        }
    }
</style>