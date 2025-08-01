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
            <Card v-if='article && article.ID' class='bg-background gap-20 max-w-7xl my-10 xl:px-20 pt-20'>
                <!--  Header  -->
                <CardHeader class='flex flex-col gap-12 px-0'>
                    <!--  Categories + Title  -->
                    <CardContent v-if='title' class='flex flex-col gap-6'>
                        <div v-if='categories' class='categories-container'>
                            <MazBadge
                                v-for='category in categories'
                                class='badge m-2 !px-4 !py-1.5'
                                color='secondary'
                                size='1em'
                                outline
                            >
                                {{ category.NAME }}
                            </MazBadge>
                        </div>
                        
                        <h1>{{ title }}</h1>
                    </CardContent>
                    
                    <!--  Subtitle  -->
                    <CardDescription v-if='subtitle'>{{ subtitle }}</CardDescription>
                    
                    <!--  Main image  -->
                    <CardContent class='my-10'>
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
                    </CardContent>
                    
                    <!--  Author + Source + Publish date  -->
                    <CardContent class='flex justify-between w-full'>
                        <div class='author flex items-center gap-4'>
                            <MazAvatar
                                :src='source_avatar'
                                size='1.5rem'
                            />
                            
                            <div class='flex flex-col items-start'>
                                <p>Author:</p>
                                <p class=''>{{ author }}</p>
                            </div>
                        </div>
                        
                        <div class='flex flex-col justify-center'>
                            <span v-if='publish_date'>Published: {{ publish_date_label }}</span>
                            <span v-if='update_date'>Last updated: {{ update_date_label }}</span>
                        </div>
                    </CardContent>
                </CardHeader>
                
                <CardContent v-if='body'>
                    <p v-html='body_formated'></p>
                </CardContent>
                
                <CardFooter class='pb-10'>
                    <p>Keywords: {{keywords}}</p>
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
    import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
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
    const publish_date = computed(() => article.value?.PUBLISHED_ON);
    const publish_date_label = computed(() => dayjs.unix(publish_date.value).format('MMMM D, YYYY, h:mm A'));
    const update_date = computed(() => article.value?.UPDATED_ON);
    const update_date_label = computed(() => dayjs.unix(update_date.value).fromNow());
    const body = computed(() => article.value?.BODY);
    const categories = computed(() => article.value?.CATEGORY_DATA);
    const keywords = computed(() => article.value?.KEYWORDS);
    const author = computed(() => {
        if(article.value?.AUTHORS.length === 0) return 'Unknown author';
        return article.value?.AUTHORS;
    });
    
    const body_formated = computed(() => {
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
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        await getCoindeskNewsSingle(source_key, guid);
    });
</script>

<style scoped>
    .single-news {
        img.main-image {
            object-fit: cover;
            height: 500px;
            width: 800px;
        }
        
        .badge {
            border-radius: 4px !important;
        }
    }
</style>