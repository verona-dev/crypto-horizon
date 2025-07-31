<template>
    <div v-if='article.ID' class='news-single'>
        single new page
    </div>
</template>

<script setup>
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    
    // CryptocurrenciesStore
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { getCoindeskNewsSingle } = CryptocurrenciesStore;
    const article = ref({});
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        const response = await getCoindeskNewsSingle(source_key, guid);
        if(response) {
            article.value = response;
            console.log(JSON.parse(JSON.stringify(article.value)));
        }
    });
</script>