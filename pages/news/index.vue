<template>
    <div class='news max-w-[2000px] mx-auto px-20 flex flex-col'>
        <div v-if='loading' class='flex items-center h-[75vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div
            v-else
            class='flex flex-col items-center'
        >
            <h1 class='my-28'>Latest Crypto News</h1>
            
            <div v-if='articles' class='flex flex-wrap justify-center gap-12'>
                <NewsCard
                    v-for='article in articles'
                    :key='article.ID'
                    :article='article'
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import NewsCard from '~/components/news/NewsCard.vue';
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { news, loading } = storeToRefs(CryptocurrenciesStore);
    const articles = computed(() => news.value);
    const { getNews } = CryptocurrenciesStore;
    
    onMounted(async() => {
        await getNews({ limit: 10 });
    });
</script>