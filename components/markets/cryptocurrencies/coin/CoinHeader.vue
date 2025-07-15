<template>
    <CardHeader v-if='coin' class='flex flex-col justify-center items-center'>
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
                <h4 class='text-foreground mt-4'>{{ price }}</h4>
            </div>
        
        </section>
        <CoinPublicNotice
            :public-notice='coingecko.public_notice'
        />
    </CardHeader>
    
    <!--    <Separator class='my-4' />-->
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';
    import { formatNumberWithOptions, formatPrice } from '~/utils/formatUtils.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import CoinPublicNotice from '~/components/markets/cryptocurrencies/coin/CoinPublicNotice.vue';
    
    const props = defineProps({
        coin: {
            type: String,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const livecoinwatch = toRef(coin.value.livecoinwatch);
    const coingecko = toRef(coin.value.coingecko);
    const watchlist_portfolio = computed(() => formatNumberWithOptions(coingecko.value?.watchlist_portfolio_users, false, true));
    const price = computed(() => formatPrice(coingecko.value?.market_data?.current_price.usd, {
        truncate: true,
    }));
</script>

<style scoped>
    p {
        color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
    }
    
    span.iconify {
        color: oklch(0.828 0.189 84.429) !important;
    }
</style>