<template>
    <div class='news-sources mx-auto flex flex-col'>
        <div v-if='loading' class='flex items-center gap-4'>
            <Spinner class='size-10 text-secondary' />
            
            <h4>Loading...</h4>
        </div>
        
        <div v-else class='flex flex-col items-center gap-32'>
            <div class='xl:mt-10 flex flex-col items-center gap-4'>
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
    import { Spinner } from '~/components/ui/spinner';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore.js';
    const NewsStore = useNewsStore();
    
    const { newsOutlets, loading } = storeToRefs(NewsStore);
    const { getNewsOutlets } = NewsStore;
    
    onMounted(async() => {
        await getNewsOutlets();
    });
    
    definePageMeta({
        title: 'News Outlets',
    });
</script>