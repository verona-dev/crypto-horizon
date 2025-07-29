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
    
    onMounted(() => {
        console.log(route.params);
        const source_key = route.params.source_key;
        const guid = route.params.guid;
        console.log(source_key)
        console.log(guid);
        getCoindeskNewsSingle(source_key, guid);
    });
</script>

<style scoped>

</style>