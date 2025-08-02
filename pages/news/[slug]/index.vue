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
            <Card
                v-if='article && article.ID'
                class='bg-background gap-12 xl:gap-20 max-w-7xl my-10 xl:px-20 pt-20'
            >
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
                        
                        <h1 class='mt-4'>{{ title }}</h1>
                        
                        <!--  Reading duration  -->
                        <div class='flex items-center gap-2 mt-2'>
                            <NuxtIcon
                                name='mdi-light:clock'
                                size='25'
                            />
                            <p>{{ readingDuration }} min Read</p>
                        </div>
                    </CardContent>
                    
                    <!--  Subtitle  -->
                    <CardDescription v-if='subtitle'>{{ subtitle }}</CardDescription>
                    
                    <!--  Main image  -->
                    <CardContent class=''>
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
        
        <!-- Reading/Scroll progress bar -->
        <div class='progress-container'>
            <div class='progress-bar' :style='{ width: `${progress * 100}%` }'></div>
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    import { useReadingTime } from 'maz-ui';
    
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
    const categories = computed(() => article.value?.CATEGORY_DATA);
    const keywords = computed(() => article.value?.KEYWORDS);
    const author = computed(() => {
        if(article.value?.AUTHORS.length === 0) return 'Unknown author';
        return article.value?.AUTHORS;
    });
    const body = computed(() => article.value?.BODY);
    const body_formated = computed(() => {
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
    
    const progress = ref(0);
    
    const onScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.value = Math.min(1, Math.max(0, scrollTop / docHeight));
    };
    
    const readingDuration = ref(0);
    
    watch(body_formated, (newVal) => {
        if (newVal && newVal.length > 0) {
            const { duration } = useReadingTime({
                content: newVal,
            });
            readingDuration.value = duration;
        }
    }, { immediate: true });
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        await getCoindeskNewsSingle(source_key, guid);
        window.addEventListener('scroll', onScroll);
    });
    
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
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
        
        .progress-container {
            align-items: center;
            background-color: var(--background);
            bottom: 0;
            display: flex;
            height: 50px;
            padding: 0 40px;
            position: fixed;
            right: 0;
            width: 100%;
            z-index: 100;
        }
        
        .progress-bar {
            height: 2px;
            background-color: var(--secondary);
            transition: width 0.1s ease-out;
        }
    }
</style>