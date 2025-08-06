<template>
    <div class='news-sources max-w-[2000px] mx-auto flex flex-col'>
        <div v-if='loading' class='flex items-center h-[75vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div v-else class='flex flex-col items-center'>
            <div class='my-28 flex flex-col items-center gap-4'>
                <h1>News Outlets</h1>
                <NuxtLink
                    to='https://developers.coindesk.com/documentation/data-api/introduction'
                    external
                    target='_blank'
                    class='text-muted-custom underline'
                >
                    <span>data from Coindesk Api</span>
                </NuxtLink>
            </div>
            
            <div v-if='newsOutlets' class='flex flex-wrap justify-center gap-6 xl:gap-20'>
                <OutletCard
                    v-for='source in newsOutlets'
                    :key='source.ID'
                    :source='source'
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import OutletCard from '~/components/news/OutletCard.vue';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const { newsOutlets, loading } = storeToRefs(NewsStore);
    const { getNewsOutlets } = NewsStore;
    
    onMounted(async() => {
        await getNewsOutlets();
    });
</script>

<style scoped>
    .news-sources {}
</style>