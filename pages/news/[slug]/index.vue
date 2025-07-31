<template>
    <div class='single-news custom-flex'>
        <div v-if='loading' class='flex items-center h-[75vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div v-else>
            <Card v-if='article && article.ID' class='bg-background gap-20 w-[1000px] mx-auto'>
                <!--  Header  -->
                <CardHeader class='flex flex-col gap-10'>
                    <!--  Title  -->
                    <CardTitle class=''>
                            {{ title }}
                    </CardTitle>
                    
                    <!--  Subtitle  -->
                    <CardDescription>
                        {{ subtitle }}
                    </CardDescription>
                    
                    <!--  Main image  -->
                    <NuxtImg
                        :src='image_url'
                        alt='article image'
                        class='main-image'
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
                            class='h-[400px] w-full'
                        />
                    </NuxtImg>
                    
                    <!--  Categories / Tags  -->
                    <div class='categories-container px-6 mt-2'>
                        <Badge
                            v-for='category in categories'
                            class='mr-2 border-muted-custom py-1 px-3 rounded-sm'
                            variant='outline'
                        >
                            {{ category.NAME }}
                        </Badge>
                    </div>
                    
                    <!--  Author + Source  -->
                    <div class='flex mt-2 px-6 justify-between items-center gap-6'>
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center gap-4 cursor-pointer'>
                                <Avatar>
                                    <AvatarImage :src='source_avatar' alt='source url' />
                                    <AvatarFallback>Av</AvatarFallback>
                                </Avatar>
                                
                                <div class='flex flex-col items-start'>
                                    <span class=''>{{ article_author }}</span>
                                    <span class='text-muted-custom'>{{ source_name }}</span>
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
                        
                        <!--  Publish date  -->
                        <HoverCard :openDelay='200'>
                            <HoverCardTrigger class='flex items-center gap-2'>
                                <NuxtIcon name='iconoir:calendar' size='16px' />
                                <span class='text-xs'>{{ published_date_from_now }}</span>
                            </HoverCardTrigger>
                            <HoverCardContent class='hover-card-content w-fit'>
                                <span class='text-sm'>{{ published_date }}</span>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </CardHeader>
                
                <CardContent v-if='body'>
                    {{ body }}
                </CardContent>
                
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
            
            <div
                v-else
                class='flex flex-col gap-8'
            >
                <h4>Sorry, the article is not available.</h4>
                <Button
                    as-child
                    variant='link'
                >
                    <NuxtLink to='/news'>
                        Go back
                    </NuxtLink>
                    
                </Button>
            </div>
        </div>
    </div>

</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    
    // Components
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import { Badge } from '~/components/ui/badge/index.js';
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar/index.js';
    import { Button } from '~/components/ui/button/index.js';
    
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { article, loading } = storeToRefs(CryptocurrenciesStore);
    const { getCoindeskNewsSingle } = CryptocurrenciesStore;
    
    const title = computed(() => article.value?.TITLE);
    const subtitle = computed(() => article.value?.SUBTITLE);
    const image_url = computed(() => article.value?.IMAGE_URL);
    const published_date = computed(() => dayjs.unix(article.value?.PUBLISHED_ON).format('MMMM D, YYYY, h:mm A'));
    const published_date_from_now = computed(() => article.value?.PUBLISHED_ON && dayjs.unix(article.value?.PUBLISHED_ON).fromNow());
    const article_author = computed(() => {
        if(article.value?.AUTHORS.length === 0) return 'Unknown author';
        return article.value?.AUTHORS;
    });
    const categories = computed(() => article.value?.CATEGORY_DATA);
    
    const source_name = computed(() => article.value?.SOURCE_DATA?.NAME || 'Unknown source');
    const source_avatar = computed(() => article.value?.SOURCE_DATA?.IMAGE_URL);
    const source_score = computed(() => article.value?.SOURCE_DATA?.BENCHMARK_SCORE);
    const source_launch_date = computed(() => article.value?.SOURCE_DATA?.LAUNCH_DATE && dayjs.unix(article.value?.SOURCE_DATA.LAUNCH_DATE).format('MMMM D, YYYY'));
    const source_lang = computed(() => article.value?.SOURCE_DATA?.LANG);
    const source_url = computed(() => article.value?.SOURCE_DATA?.URL);
    
    const source_url_label = computed(() => {
        let url = new URL(source_url.value);
        let protocol = url.protocol;
        let host = url.host;
        
        return `${protocol}//${host}`;
    });
    
    const body = computed(() => article.value?.BODY);
    const article_score = computed(() => article.value?.SCORE);
    const sentiment = computed(() => article.value?.SENTIMENT);
    const upvotes = computed(() => article.value?.UPVOTES);
    const downvotes = computed(() => article.value?.DOWNVOTES);
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        await getCoindeskNewsSingle(source_key, guid);
    });
</script>

<style scoped>
    .single-news {
        img.main-image {
            object-fit: cover;
            height: 400px;
            margin: auto;
            width: 600px;
        }
    }
</style>