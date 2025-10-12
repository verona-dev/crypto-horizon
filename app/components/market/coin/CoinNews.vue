<template>
    <div v-if='articles' class='coin-news w-full'>
        <h3 class='my-10 underline'>Latest {{ symbol }} related Crypto News</h3>
        
        <div class='flex flex-col'>
            <CoinNewsCard
                v-for='article in articles'
                :key='article.ID'
                :article='article'
            />
        </div>
    </div>
</template>

<script setup>
    import CoinNewsCard from '~/components/market/coin/CoinNewsCard.vue';
    // NewsStore
    import {storeToRefs} from 'pinia';
    import { useNewsStore } from '../../../../stores/NewsStore.js';
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