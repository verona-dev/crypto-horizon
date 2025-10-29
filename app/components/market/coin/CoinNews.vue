<template>
    <div v-if='articles' class='coin-news'>
        <h3 class='mt-10 mb-24 underline'>Latest {{ symbol }} related News</h3>
        
        <div class='flex justify-center flex-wrap gap-24'>
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
    import { useNewsStore } from '~/stores/NewsStore.js';
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