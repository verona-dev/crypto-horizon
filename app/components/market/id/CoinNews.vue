<template>
    <section v-if='articles' class='news flex flex-col items-center gap-16 py-12'>
        <Title :tag='3' class='text-primary underline'>Latest {{ symbol }} related News</Title>
        
        <div class='flex justify-center flex-wrap w-full gap-12'>
            <CoinNewsCard
                v-for='article in articles'
                :key='article.ID'
                :article='article'
            />
        </div>
    </section>
</template>

<script setup>
    import CoinNewsCard from '@/components/market/id/CoinNewsCard.vue';
    import Title from '~/components/Title.vue';
    
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