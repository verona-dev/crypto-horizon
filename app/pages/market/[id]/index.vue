<template>
    <div class='page'>
        <LoadingContent v-if='loading' />
        
        <template v-else>
            <Card
                v-if='coin'
                class='bg-transparent flex flex-col items-center border-none gap-6'
            >
                <CoinHeader :coin='coin' />
                
                <CoinBody :coin='coin'/>
            </Card>
        </template>
    </div>
</template>

<script setup>
    import { Card  } from '~/components/ui/card';
    import CoinHeader from '@/components/market/id/CoinHeader.vue';
    import CoinBody from '@/components/market/id/CoinBody.vue';
    import LoadingContent from '@/components/LoadingContent.vue';
    
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
            ? `${coin.value?.name} Price: ${coin.value?.symbol} Live Price Chart, Market Cap, and News Today`
            : 'Price: Live Price Chart, Market Cap, and News Today'
    );
    
    const description = computed(() =>
        coin.value?.name
            ? `${coin.value?.name} (${coin.value?.symbol}) price, market cap, charts, and trading information.`
            : `Coin price, market cap, charts, and trading information.`
    );
    
    const path = computed(() => route.fullPath);
    
    useHead({
        title: title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: path },
            { name: 'robots', content: 'index, follow' },
        ],
    });
    
    useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        ogUrl: path,
    });
    
    onMounted(async() => {
        await getCoin(id.value);
    });
</script>