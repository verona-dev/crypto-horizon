<template>
    <div class='news custom-flex'>
        
        <div v-if='computedArticle'>
            {{ computedArticle.TYPE }}
            {{ computedArticle.ID }}
            {{ computedArticle.GUID }}
        </div>
    </div>
</template>

<script setup>
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { news } = storeToRefs(CryptocurrenciesStore);
    const computedArticle = computed(() => news.value[0]);
    const { getCoindeskNews } = CryptocurrenciesStore;
    
    onMounted(async() => {
        await getCoindeskNews();
    });
</script>

<style scoped>

</style>