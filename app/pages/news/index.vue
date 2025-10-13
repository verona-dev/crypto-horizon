<template>
    <section class='news'>
        <div v-if='loading' class='flex items-center'>
            <Spinner class='size-10 text-secondary' />
            
            <h4>Loading...</h4>
        </div>
        
        <div v-else class='flex flex-wrap justify-center gap-24'>
            <NewsCard
                v-for='article in articles'
                :key='article.ID'
                :article='article'
            />
        </div>
    </section>
</template>

<script setup>
    import NewsCard from '~/components/news/NewsCard.vue';
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore.js';
    import { Spinner } from '@/components/ui/spinner/index.js';
    const NewsStore = useNewsStore();
    
    const { news, loading } = storeToRefs(NewsStore);
    const { getNews } = NewsStore;
    const articles = computed(() => news.value);
    
    onMounted(async() => {
        await getNews({ limit: 10 });
    });
    
    definePageMeta({
        title: 'Latest News',
    });
</script>