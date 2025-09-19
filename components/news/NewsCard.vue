<template>
    <Card v-if='article' class='news-card rounded-md border-card-border bg-transparent shadow-2xl justify-between w-[450px] py-0 gap-8'>
        <CardHeader class='p-0'>
            <div class='flex flex-col gap-6'>
                <!--  Main image  -->
                <NuxtImg
                    :src='image_url'
                    alt='article image'
                    class='main-image rounded-md rounded-b-none'
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
                        class='h-[350px] w-full'
                    />
                </NuxtImg>
                
                <!--  Author + Source  -->
                <div class='flex px-6 justify-between'>
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger class='flex items-center gap-4 cursor-pointer'>
                            <MazAvatar
                                :src='source_avatar'
                                size='1.2rem'
                                rounded-size='xl'
                            />
                            
                            <div class='flex flex-col items-start text-left'>
                                <span>{{ article_author_label }}</span>
                                <span class='text-muted-custom'>{{ source_name_label }}</span>
                            </div>
                        </HoverCardTrigger>
                        
                        <HoverCardContent class='news-hover-card flex !justify-between !content-between !items-between gap-6 p-10 w-fit'>
                            <!--  Hover card image -->
                            <NuxtImg
                                :src='source_avatar'
                                alt='source avatar'
                                class='rounded-md m-auto'
                                height='150px'
                                width='150px'
                            />
                            
                            <!--  Hover card content -->
                            <div class='flex flex-col justify-between'>
                                <div class='flex flex-col gap-2'>
                                    <h6 class='underline mb-2' v-if='source_name'>{{ source_name }}</h6>
                                    <span v-if='source_score > 0'>Score: {{ source_score }}</span>
                                    <span v-if='source_launch_date'>Launch date: {{ source_launch_date }}</span>
                                    
                                    <div v-if='source_lang' class='flex items-center gap-2'>
                                        <span>Language:</span>
                                        <span>{{ source_lang }}</span>
                                        <NuxtIcon :name="`circle-flags:lang-${source_lang.toLowerCase()}`" size='20px' class='self-center' />
                                    </div>
                                </div>
                                
                                <NuxtLink
                                    v-if='source_url_label'
                                    :to='source_url_label'
                                    external
                                    target='_blank'
                                    class='self-start hover:underline'
                                >
                                    <span>Website</span>
                                </NuxtLink>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    
                    <div class='flex flex-col justify-center gap-2 min-w-28'>
                        <!--  Publish date  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center gap-2'>
                                <NuxtIcon name='iconoir:calendar' size='16px' />
                                <span class='text-xs'>{{ published_date_from_now }}</span>
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content'>
                                <span class='text-sm'>{{ published_date }}</span>
                            </HoverCardContent>
                        </HoverCard>
                        
                        <!--  Reading duration  -->
                        <div class='flex items-center gap-2'>
                            <NuxtIcon
                                name='mdi-light:clock'
                                size='16'
                            />
                            <span class='text-xs'>{{ reading_duration }} min read</span>
                        </div>
                    </div>
                    

                </div>
                
                <!--  Categories / Tags  -->
                <div class='categories-container px-6 mt-2'>
                    <Badge
                        v-for='category in categories.slice(0, 4)'
                        class='mr-2 mb-2 border-muted-custom py-1 px-3 rounded-sm'
                        variant='outline'
                    >
                        {{ category.NAME }}
                    </Badge>
                </div>
                
                <!--  Article Title  -->
                <CardDescription class='text-foreground text-md text-left font-bold hover:underline px-6'>
                    <NuxtLink :to="{ path: `/news/${encodeURIComponent(guid)}`, query: { source_key, guid } }">
                        {{ title }}
                    </NuxtLink>
                </CardDescription>
            </div>
        </CardHeader>
        
        <CardFooter class='flex justify-center my-6'>
            <!--  Read more  -->
            <Button as-child variant='link' class='uppercase hover:text-foreground'>
                <NuxtLink :to="{ path: `/news/${encodeURIComponent(guid)}`, query: { source_key, guid } }">
                    Read More
                </NuxtLink>
            </Button>
        </CardFooter>
    </Card>
</template>

<script setup>
    import { useReadingTime } from 'maz-ui';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Badge } from '@/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
    import { Button } from '@/components/ui/button';
    
    const props = defineProps({
        article: Object,
    });
    
    const { article } = toRefs(props);
    console.log(JSON.parse(JSON.stringify(article.value)));
    
    const guid = article.value?.GUID;
    const title = article.value?.TITLE;
    const image_url = article.value?.IMAGE_URL;
    const published_date = dayjs.unix(article.value?.PUBLISHED_ON).format('MMMM D, YYYY, h:mm A');
    const published_date_from_now = computed(() => article.value?.PUBLISHED_ON && dayjs.unix(article.value?.PUBLISHED_ON).fromNow());
    
    const article_author = computed(() => article.value?.AUTHORS);
    const article_author_label = computed(() => {
        if(article_author.value?.length === 0) return 'Unknown author';
        if(source_name === 'CoinTelegraph') return article_author.value.replace('Cointelegraph by', '');
        return article_author.value;
    });
    
    const reading_duration = ref(0);
    const body = computed(() => article.value?.BODY);
    const body_formatted = computed(() => {
        if (!body.value) return '';
        
        let sentences = body.value
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
        
        return sentences.join('');
    });
    watch(body_formatted, (newVal) => {
        if (newVal && newVal.length > 0) {
            const { duration } = useReadingTime({
                content: newVal,
            });
            reading_duration.value = duration.value;
        }
    }, { immediate: true });
    
    const categories = article.value?.CATEGORY_DATA;
    
    const source_name = article.value?.SOURCE_DATA?.NAME;
    const source_name_label = computed(() => source_name || 'Unknown source');
    const source_avatar = article.value?.SOURCE_DATA?.IMAGE_URL;
    const source_score = article.value?.SOURCE_DATA?.BENCHMARK_SCORE;
    const source_launch_date = article.value?.SOURCE_DATA?.LAUNCH_DATE && dayjs.unix(article.value?.SOURCE_DATA.LAUNCH_DATE).format('MMMM D, YYYY');
    const source_lang = article.value?.SOURCE_DATA?.LANG;
    const source_key = article.value?.SOURCE_DATA?.SOURCE_KEY;
    const source_url = computed(() => article.value?.SOURCE_DATA?.URL);
    
    const source_url_label = computed(() => {
        let url = new URL(source_url.value);
        let protocol = url.protocol;
        let host = url.host;
        
        return `${protocol}//${host}`;
    });
</script>

<style scoped>
    .news-card {
        img.main-image {
            object-fit: cover;
            //height: 100%;
            height: 350px;
            //width: 100%;
        }
    }
</style>