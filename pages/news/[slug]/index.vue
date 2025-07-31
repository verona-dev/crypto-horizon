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
                    <CardContent><h2>{{ title }}</h2></CardContent>
                    
                    <!--  Subtitle  -->
                    <CardDescription>{{ subtitle }}</CardDescription>
                    
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
                    <CardContent v-if='categories' class='categories-container'>
                        <MazBadge
                            v-for='category in categories'
                            class='badge m-2 !px-4 !py-2'
                            color='gray'
                            size='1em'
                            outline
                        >
                            {{ category.NAME }}
                        </MazBadge>
                    </CardContent>
                    
                    <!--  Author + Source + Publish date  -->
                    <CardContent class='flex justify-between items-center gap-6 w-full'>
                        <div class='flex items-center gap-4'>
                            <Avatar>
                                <AvatarImage :src='source_avatar' alt='source url' />
                                <AvatarFallback>Av</AvatarFallback>
                            </Avatar>
                            
                            <div class='flex flex-col items-start'>
                                <span>Author:</span>
                                <span class=''>{{ article_author }}</span>
                            </div>
                        </div>
                        
                        <div>
                            <span>Last updated: {{ update_date }}</span>
                        </div>
                    </CardContent>
                </CardHeader>
                
                <CardContent v-if='body'>
                    <p>{{ body }}</p>
                </CardContent>
                
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
            
            <!--  Article not available  -->
            <CardContent
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
            </CardContent>
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
    const update_date = computed(() => dayjs.unix(article.value?.UPDATED_ON).format('MMMM D, YYYY, h:mm A'));
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
        
        .badge {
            border-radius: 4px !important;
        }
    }
</style>