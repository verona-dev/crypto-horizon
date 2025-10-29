<template>
    <div class='news page flex flex-col items-center px-6 md:px-12 xl:px-24'>
        <div v-if='!dark_mode' class='h-[450px]'>
            <div class='h-[350px] flex items-center'>
                <h1 class='page-title'>Latest News</h1>
            </div>
        </div>
        
        <div v-else class="w-[900px] h-[450px]">
            <ParticleImage
                :image-src='titleImage'
                :responsive-width='true'
                canvasWidth='900'
                canvasHeight='400'
                :noise='5'
                gravity='0.1'
                mouseForce='7'
            />
        </div>
        
        <BentoGrid class='max-w-full xl:max-w-6xl'>
            <BentoGridItem
                v-for='(article, index) in articles'
                :key='article.id'
                class='!bg-card lg:row-span-2 !border-border/50'
                :class='index === 3 || index === 6 ? "xl:col-span-2" : ""'
            >
                <!--  Image + Categories  -->
                <template #header>
                    <NuxtImg
                        v-if='article.image_url'
                        :src='article.image_url'
                        alt='article image'
                        class='h-full w-full object-cover rounded-md'
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
                            class='h-full w-full rounded-md'
                        />
                    </NuxtImg>
                    
                    <!--  Categories / Tags + Reading duration  -->
                    <div class='flex items-center justify-between px-2'>
                        <div class='flex items-center gap-2'>
                            <Badge
                                v-for='category in article.categories.slice(0, 3)'
                                class='py-1 px-1.5 text-muted-foreground border text-[10px] font-extralight tracking-widest'
                                variant='outline'
                            >
                                {{ category.NAME }}
                            </Badge>
                        </div>
                        
                        <div v-if='article.reading_duration > 1' class='text-muted-foreground flex items-center gap-1'>
                            <NuxtIcon name='ph:timer-light' size='18' />
                            <span class='text-xxs'>{{ article.reading_duration }}m</span>
                        </div>
                    </div>
                </template>
                
                <!--  Title  -->
                <template #title>
                    <div class='px-2'>
                        <NuxtLink
                            :to="{
                                    path: `/news/${encodeURIComponent(article.guid)}`,
                                    query: {
                                        source_key: article.source_key,
                                        guid: article.guid,
                                    }
                                }"
                            class='hover:underline'
                        >
                            <h6>{{ article.title }}</h6>
                        </NuxtLink>
                    </div>
                </template>
                
                <!--  Author + Source + Publish date + Read more  -->
                <template #description>
                    <div class='flex items-center justify-between px-2'>
                        <HoverCard>
                            <HoverCardTrigger class='flex items-center gap-4 cursor-pointer'>
                                <!--  Avatar  -->
                                <Avatar class='h-12 w-12 rounded-full'>
                                    <AvatarImage :src='article.source_avatar' alt='avatar' />
                                    <AvatarFallback class='rounded-lg'>S</AvatarFallback>
                                </Avatar>
                                
                                <!--  Author  -->
                                <div class='flex flex-col items-start text-left'>
                                    <p>{{ article.authors }}</p>
                                    <span class='text-sm'>{{ article.source_name }}</span>
                                    
                                    <!--  Publish date  -->
                                    <div class='flex gap-1 text-muted-custom'>
                                        <!--  <NuxtIcon name='ph:calendar-blank-light' size='18' /> . -->
                                        <span class='pt-0.5 text-xs'>{{ article.published_date }}</span>
                                    </div>
                                </div>
                            </HoverCardTrigger>
                            
                            <!--  Source  -->
                            <HoverCardContent class='flex !justify-between !content-between !items-between !border-border/50 gap-6 p-10 w-fit'>
                                <NuxtImg
                                    v-if='article.source_avatar'
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
                                            <NuxtIcon
                                                :name="`circle-flags:lang-${article.source_lang.toLowerCase()}`"
                                                size='20px' class='self-center'
                                            />
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
                        
                        <!--  Read more  -->
                        <Button variant='outline' class='read-more !bg-transparent pt-2.5'>
                            <NuxtLink
                                :to="{
                                    path: `/news/${encodeURIComponent(article.guid)}`,
                                    query: {
                                        source_key: article.source_key,
                                        guid: article.guid,
                                    }
                                }"
                            >
                                Read More
                            </NuxtLink>
                        </Button>
                    </div>
                </template>
            </BentoGridItem>
        </BentoGrid>
    </div>
</template>

<script setup>
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    import { Badge } from '~/components/ui/badge';
    import { BentoGrid, BentoGridItem } from '~/components/ui/bento-grid';
    import { Button } from '~/components/ui/button';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { ParticleImage } from '~/components/ui/particle-image';
    import { Skeleton } from '~/components/ui/skeleton';
    import titleImage from '~/assets/images/latest-news.png';
    console.log(titleImage);
    
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
    
    const getSourceName = (source_name) => {
        if(!source_name || source_name.length === 0) return 'Unknown source';
        if(source_name === 'Investing.Com Crypto Opinion and Analysis') return source_name.replace('Investing.Com Crypto Opinion and Analysis', 'Investing.Com');
        return source_name;
    };
    
    const getReadingDuration = (body) => {
        if (!body) return '';
        
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
                source_launch_date: article?.SOURCE_DATA?.LAUNCH_DATE && dayjs.unix(article?.SOURCE_DATA?.LAUNCH_DATE).format('MMMM D, YYYY'),
                source_name: getSourceName(article.SOURCE_DATA?.NAME),
                source_score: article.SOURCE_DATA?.BENCHMARK_SCORE,
                source_url: getSourceUrl(article.SOURCE_DATA?.URL),
                title: article.TITLE,
            }));
            console.log(articles.value);
        }
    });
    
    onMounted(async() => {
        await getNews({ limit: 10 });
    });
    
    definePageMeta({
        title: 'Latest News',
    });
</script>

<style scoped>
    button.read-more {
        &:hover {
            border: 1px solid var(--green-shamrock) !important;
        }
    }
</style>