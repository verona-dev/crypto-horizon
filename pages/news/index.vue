<template>
    <div class='news max-w-[2000px] mx-auto'>
        <h6>Latest News</h6>
        <div v-if='articles' class='flex flex-wrap justify-center gap-8 mt-10'>
            <NewsCard
                v-for='article in articles'
                :key='article.GUID'
                :guid='article.GUID'
                :url='article.URL'
                :title='article.TITLE'
                :author='article.AUTHORS'
                :published-on='article.PUBLISHED_ON'
                :imageUrl='article.IMAGE_URL'
                :source='article.SOURCE_DATA'
            />
        </div>
    </div>
</template>

<script setup>
    import NewsCard from '~/components/news/NewsCard.vue';
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { news } = storeToRefs(CryptocurrenciesStore);
    const articles = computed(() => news.value);
    const { getCoindeskNews } = CryptocurrenciesStore;
    
    onMounted(async() => {
        await getCoindeskNews();
    });
</script>