<template>
    <div class='single-coin page'>
        <LoadingSpinner v-if='loading' />
        
        <div v-else class='z-10'>
            <Card
                v-if='coin'
                class='bg-transparent border-none shadow-none flex flex-col items-center'
            >
                <CoinHeader :coin='coin' />
                
                <CoinBody :coin='coin'/>
                
                <CoinFooter :coin='coin' />
            </Card>
        </div>
        
        <!--
        <div v-if='dark_mode' class='absolute top-0 right-0 w-full h-full overflow-visible'>
            <StarsBackground
                class='pl-[1200px]'
                :factor='0.25'
                :speed='150'
                star-color='#fff'
            />
        </div>
        -->
    </div>
</template>

<script setup>
    import { Card  } from '~/components/ui/card';
    import CoinHeader from '@/components/market/id/CoinHeader.vue';
    import CoinBody from '@/components/market/id/CoinBody.vue';
    import CoinFooter from '@/components/market/id/CoinFooter.vue';
    import LoadingSpinner from '~/components/LoadingSpinner.vue';
    // import { StarsBackground } from '~/components/ui/bg-stars';
    
    // const colorMode = useColorMode();
    // const dark_mode = computed(() => colorMode.value === 'dark');
    
    // Router
    const route = useRoute();
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoin } = MarketStore;
    
    // State
    const { coin, loading } = storeToRefs(MarketStore);
    const id = computed(() => route.params?.id);
    
    // SEO
    const title = computed(() =>
        coin.value?.name
            ? `${coin.value.name} Price: ${coin.value?.symbol} Live Price Chart, Market Cap, and News Today`
            : 'Price: Live Price Chart, Market Cap, and News Today'
    );
    
    const description = computed(() =>
        coin.value?.name
            ? `${coin.value.name} (${coin.value.symbol}) price, market cap, charts, and trading information.`
            : `Coin price, market cap, charts, and trading information.`
    );
    
    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
    });
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(async() => {
        await getCoin(id.value);
    });
</script>