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
                <!--  Image  -->
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
                
                <!--  Title  -->
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
                
                <!--  Author + Source  -->
                <template #description>
                    <HoverCard>
                        <HoverCardTrigger class='flex items-center gap-4 cursor-pointer'>
                            <!--  Avatar  -->
                            <Avatar class='h-10 w-10 rounded-full'>
                                <AvatarImage :src='article.source_avatar' alt='avatar' />
                                <AvatarFallback class='rounded-lg'>
                                    S
                                </AvatarFallback>
                            </Avatar>
                            
                            <!--  Author  -->
                            <div class='flex flex-col items-start text-left text-sm'>
                                <span>{{ article.authors }}</span>
                                <span class='text-muted-custom'>{{ article.source_name }}</span>
                            </div>
                        </HoverCardTrigger>
                        
                        <!--  Source  -->
                        <HoverCardContent class='news-hover-card flex !justify-between !content-between !items-between gap-6 p-10 w-fit'>
                            <NuxtImg
                                :src='article.source_avatar'
                                alt='source avatar'
                                class='rounded-md m-auto'
                                height='150px'
                                width='150px'
                            />
                            
                            <div class='flex flex-col justify-between'>
                                <div class='flex flex-col gap-2'>
                                    <h6 class='underline mb-2' v-if='article.source_name'>{{ article.source_name }}</h6>
                                    <span v-if='article.source_score > 0'>Score: {{ article.source_score }}</span>
                                    <span v-if='article.source_launch_date'>Launch date: {{ article.source_launch_date }}</span>
                                    
                                    <div v-if='article.source_lang' class='flex items-center gap-2'>
                                        <span>Language:</span>
                                        <span>{{ article.source_lang }}</span>
                                        <NuxtIcon :name="`circle-flags:lang-${article.source_lang.toLowerCase()}`" size='20px' class='self-center' />
                                    </div>
                                </div>
                                
                                <NuxtLink
                                    v-if='article.source_url'
                                    :to='article.source_url'
                                    external
                                    target='_blank'
                                    class='self-start hover:underline'
                                >
                                    <span>Website</span>
                                </NuxtLink>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </template>
            </BentoGridItem>
        </BentoGrid>
        
        <div class='flex flex-col items-center gap-20'>
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
    
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    import { Badge } from '~/components/ui/badge';
    import { BentoGrid, BentoGridItem } from '~/components/ui/bento-grid';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
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
    
    const getSourceUrl = (source_url) => {
        let url = new URL(source_url);
        let protocol = url.protocol;
        let host = url.host;
        
        return `${protocol}//${host}`;
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
                source_avatar: article.SOURCE_DATA?.IMAGE_URL,
                source_key: article.SOURCE_DATA?.SOURCE_KEY,
                source_lang: article.SOURCE_DATA?.LANG,
                source_launch_date: dayjs.unix(article.SOURCE_DATA.LAUNCH_DATE).format('MMMM D, YYYY'),
                source_name: article.SOURCE_DATA?.NAME || 'Unknown source',
                source_score: article.SOURCE_DATA?.BENCHMARK_SCORE,
                source_url: getSourceUrl(article.SOURCE_DATA?.URL),
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