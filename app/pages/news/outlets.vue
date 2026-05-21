<template>
    <div class='w-full'>
        <LoadingContent v-if='loading' />
        
        <!--  Margin top because of market bar in markets  -->
        <div
            v-else
            class='page mt-20'
        >
            <Title tag='h1' class='page-title'>News Outlets</Title>
            
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
    import LoadingContent from '@/components/LoadingContent.vue';
    import LoadingSpinner from '~/components/LoadingSpinner.vue';
    import OutletCard from '~/components/news/OutletCard.vue';
    import Title from '~/components/Title.vue';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore.js';
    const NewsStore = useNewsStore();
    
    const { newsOutlets, loading } = storeToRefs(NewsStore);
    const { getNewsOutlets } = NewsStore;
    
    // SEO
    const title = 'News Outlets Directory';
    const description = 'Discover the most reliable and trusted sources for cryptocurrency news, analysis, and insights. Browse by outlet and visit their websites.';
    
    definePageMeta({
        title,
        description,
    });
    
    onMounted(async() => {
        await getNewsOutlets();
    });
</script>