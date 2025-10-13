<template>
    <div class='news-outlets page'>
        <LoadingSpinner v-if='loading' />
        
        <div
            v-else
            class='flex flex-col items-center gap-20'
        >
            <h1 class='page-title'>News Outlets</h1>
            
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
    import LoadingSpinner from '~/components/LoadingSpinner.vue';
    
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