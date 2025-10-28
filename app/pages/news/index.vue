<template>
    <div class='news page flex flex-col items-center px-12'>
        <h1 class='page-title'>Latest News</h1>
        
        <BentoGrid class='mx-auto max-w-7xl'>
            <BentoGridItem
                v-for='(article, index) in articles'
                :key='article.id'
                class='!bg-card'
                :class='index === 3 || index === 6 ? "md:col-span-2" : ""'
            >
                <template #header>
                    <NuxtImg
                        :src='article.image_url'
                        alt='article image'
                        class='h-full w-full object-cover'
                        :custom='true'
                        v-slot='{ src, isLoaded, imgAttrs }'
                        preload
                    >
                        <img
                            v-if='isLoaded'
                            v-bind='imgAttrs'
                            :src='src'
                            alt='article image'
                        >
                        
                        <Skeleton
                            v-else
                            class='h-full w-full'
                        />
                    </NuxtImg>
                </template>
                
                <template #title>
                    <strong>{{ article.title }}</strong>
                </template>
                
                <!--  Categories / Tags + Reading duration  -->
                <template #icon>
                    <div class='flex items-center justify-between'>
                        <div>
                            <Badge
                                v-for='category in article.categories.slice(0, 3)'
                                class='m-1.5 p-1.5 text-primary border text-[10px] font-extralight tracking-widest'
                                variant='outline'
                            >
                                {{ category.NAME }}
                            </Badge>
                        </div>
                        
                        <div v-if='article.reading_duration > 1' class='text-primary flex items-center gap-2'>
                            <NuxtIcon name='iconoir:timer' size='16' />
                            <span class='text-xxs'>{{ article.reading_duration }} min read</span>
                        </div>
                    </div>
                </template>
                
                <template #description>
                    <p>{{ article.authors }}</p>
                </template>
            </BentoGridItem>
        </BentoGrid>
        
        <div class='flex flex-col items-center gap-20'>
            <!--            <h1 class='page-title'>Latest News</h1>-->
            
            <div class='flex flex-wrap justify-center gap-24'>
                
                <NewsCard
                    v-for='article in news'
                    :key='article.ID'
                    :article='article'
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Badge } from '~/components/ui/badge';
    import { BentoGrid, BentoGridItem } from '~/components/ui/bento-grid';
    import { Skeleton } from '@/components/ui/skeleton';
    import NewsCard from '~/components/news/NewsCard.vue';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore.js';
    import { useReadingTime } from 'maz-ui/composables';
    const NewsStore = useNewsStore();
    
    const { news } = storeToRefs(NewsStore);
    const { getNews } = NewsStore;
    const articles = ref([]);
    
    const getAuthor = (authors, source_name) => {
        if(!authors || authors.length === 0) return 'Unknown author';
        if(source_name === 'Cointelegraph') return authors.replace('Cointelegraph by ', '');
        return authors;
    };
    
    const getReadingDuration = (body) => {
        if (!body) return '';
        
        let reading_duration;
        
        let sentences = body
            .split(/\. +|\.(?=\n)|\.(?=$)/)
            .map(s => s.trim())
            .filter(s => s.length);
        
        for (let i = 0; i < sentences.length; i++) {
            if (i % 3 < 2) {
                sentences[i] = sentences[i] + '. ';
            } else {
                sentences[i] = sentences[i] + '.<br><br>';
            }
        }
        
        const { duration } = useReadingTime({
            content: sentences.join(''),
        });
        
        return duration.value;
    };
    
    watch(news, (newValue) => {
        if (newValue) {
            // console.log(newValue[0]);
            
            articles.value = news.value?.map(article => ({
                authors: getAuthor(article.AUTHORS, article.SOURCE_DATA?.NAME),
                categories: article.CATEGORY_DATA,
                guid: article.GUID,
                id: article.ID,
                image_url: article.IMAGE_URL,
                published_date: dayjs.unix(article.PUBLISHED_ON).format('MMMM D, YYYY'),
                reading_duration: getReadingDuration(article.BODY),
                source_key: article.SOURCE_DATA?.SOURCE_KEY,
                source_name: article.SOURCE_DATA?.NAME || 'Unknown source',
                title: article.TITLE,
            }));
            
            // console.log(articles.value[0]);
        }
    });
    
    onMounted(async() => {
        await getNews({ limit: 10 });
    });
    
    definePageMeta({
        title: 'Latest News',
    });
</script>