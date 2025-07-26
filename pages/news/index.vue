<template>
    <div class='news max-w-[2000px] mx-auto'>
        <div
            v-if='articles'
            class='flex flex-wrap xl:items-stretch justify-evenly gap-4 xl:px-32 mt-10'
        >
            <NewsItem
                v-for='article in articles'
                :key='article.GUID'
                :id='article.GUID'
                :url='article.URL'
                :title='article.TITLE'
                :author='article.AUTHORS'
                :published-on='article.PUBLISHED_ON'
                :imageUrl='article.IMAGE_URL'
            />
        </div>
        
    </div>
</template>

<script setup>
    import NewsItem from '~/components/news/NewsItem.vue';
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

<style scoped>

</style>