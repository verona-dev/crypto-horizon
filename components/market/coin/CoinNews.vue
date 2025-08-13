<template>
    <div v-if='coinNews' class='coin-news w-full px-10'>
        <h3 class='mt-20 mb-14 underline'>Latest {{ symbol }} related Crypto News</h3>
        
        <div class='flex flex-col'>
            <CoinNewsItem
                v-for='article in articles'
                :key='article.ID'
                :article='article'
            />
        </div>
    </div>
</template>

<script setup>
    import CoinNewsItem from '~/components/market/coin/CoinNewsItem.vue';
    // NewsStore
    import {storeToRefs} from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    
    const { coinNews } = storeToRefs(NewsStore);
    const articles = computed(() => coinNews.value);
    const symbol = coin.value?.symbol;
</script>