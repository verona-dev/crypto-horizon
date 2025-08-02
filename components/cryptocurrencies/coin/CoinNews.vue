<template>
    <div v-if='coinNews' class='coin-news'>
        this is coin news
        
        <div class='flex flex-wrap justify-center gap-12'>
            test
            <CoinNewsCard
                v-for='article in articles'
                :key='article.ID'
                :article='article'
            />
        </div>
    </div>
</template>

<script setup>
    import CoinNewsCard from '~/components/news/CoinNewsCard.vue';
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { coinNews } = storeToRefs(CryptocurrenciesStore);
    const articles = computed(() => coinNews.value);
</script>