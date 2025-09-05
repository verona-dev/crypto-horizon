<template>
    <section class='news'>
        <h1 class='page-title'>Latest News</h1>
        
        <div v-if='loading' class='flex items-center'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
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
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const { news, loading } = storeToRefs(NewsStore);
    const { getNews } = NewsStore;
    const articles = computed(() => news.value);
    
    onMounted(async() => {
        await getNews({ limit: 10 });
    });
</script>