<template>
    <div v-if='coinNews' class='coin-news w-full'>
        <h1 class='my-28'>Latest {{ symbol }} Crypto News</h1>
        
        <div class='flex flex-col'>
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
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    
    const { coinNews } = storeToRefs(CryptocurrenciesStore);
    const articles = computed(() => coinNews.value);
    const symbol = coin.value?.symbol;
</script>