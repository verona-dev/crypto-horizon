<template>
    <div class='news max-w-[2000px] mx-auto flex flex-col'>
        <h1 class='my-28 self-center'>Latest Crypto News</h1>
        
        <div v-if='articles' class='flex flex-wrap justify-center gap-12'>
            <NewsCard
                v-for='article in articles'
                :key='article.ID'
                :article='article'
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
    console.log(articles.value);
    
    onMounted(async() => {
        await getCoindeskNews();
    });
</script>