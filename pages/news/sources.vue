<template>
    <div class='news-sources max-w-[2000px] mx-auto flex flex-col'>
        <div v-if='loading' class='flex items-center h-[75vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div v-else>
            <h1 class='my-28 self-center'>News Sources</h1>
        </div>
    </div>
</template>

<script setup>
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { newsSources, loading } = storeToRefs(CryptocurrenciesStore);
    const { getCoindeskNewsSources } = CryptocurrenciesStore;
    
    onMounted(async() => {
        await getCoindeskNewsSources();
    });
</script>

<style scoped>
    .news-sources {}
</style>