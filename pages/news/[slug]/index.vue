<template>
    <div class='news-single'>
        single new page
    </div>
</template>

<script setup>
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { getCoindeskNewsSingle } = CryptocurrenciesStore;
    const single_news = ref({});
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        const response = await getCoindeskNewsSingle(source_key, guid);
        if(response) {
            single_news.value = response;
            console.log(single_news.value);
        }
    });
</script>