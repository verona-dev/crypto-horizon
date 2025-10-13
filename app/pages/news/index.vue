<template>
    <section class='news flex flex-col items-center px-12'>
        <LoadingSpinner v-if='loading' />
        
        <div
            v-else
             class='flex flex-col items-center gap-20'
        >
            <h1 class='page-title'>Latest News</h1>
            
            <div class='flex flex-wrap justify-center gap-24'>
                <NewsCard
                    v-for='article in articles'
                    :key='article.ID'
                    :article='article'
                />
            </div>
        </div>
    </section>
</template>

<script setup>
    import NewsCard from '~/components/news/NewsCard.vue';
    import LoadingSpinner from '~/components/LoadingSpinner.vue';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore.js';
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