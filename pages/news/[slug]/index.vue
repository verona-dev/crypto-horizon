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
                    <!--  Article Title  -->
                    <CardTitle class=''>
                            {{ title }}
                    </CardTitle>
                    
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
                </CardHeader>
                
                <CardContent>
                    Content
                </CardContent>
                
                <CardFooter>
                    Footer
                </CardFooter>
            </Card>
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
    
    const title = article.value?.TITLE;
    const image_url = computed(() => article.value?.IMAGE_URL);
    const published_date = dayjs.unix(article.value?.PUBLISHED_ON).format('MMMM D, YYYY, h:mm A');
    const published_date_from_now = computed(() => article.value?.PUBLISHED_ON && dayjs.unix(article.value?.PUBLISHED_ON).fromNow());
    const article_author = computed(() => {
        if(article.value?.AUTHORS.length === 0) return 'Unknown author';
        return article.value?.AUTHORS;
    });
    const categories = article.value?.CATEGORY_DATA;
    
    const source_name = article.value?.SOURCE_DATA?.NAME || 'Unknown source';
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