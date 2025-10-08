<template>
    <section class='single-news'>
        <div v-if='loading' class='flex items-center h-[75vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-3'>Loading...</h4>
        </div>
        
        <div v-else>
            <Card
                v-if='body && body_formatted'
                class='bg-transparent border-none gap-12 xl:gap-20 max-w-7xl pt-0 pb-10 xl:mt-10 mb-40 mx-auto'
            >
                <!--  Header  -->
                <CardHeader class='flex flex-col gap-12'>
                    <!--  Categories + Title  -->
                    <CardContent v-if='title' class='flex flex-col gap-8'>
                        
                        <div class='header-nav flex items-center justify-start gap-8'>
                            <!--  Go back  -->
                            <NuxtLink
                                @click='goBack(router, "/news")'
                                to=''
                                class='hover:bg-muted hover:cursor-pointer rounded-xl p-1'
                            >
                                <NuxtIcon
                                    name='mdi-light:arrow-left'
                                    size='50'
                                    class='flex'
                                />
                            </NuxtLink>
                            
                            <div v-if='categories' class='categories-container'>
                                <Badge
                                    v-for='category in categories'
                                    :key='category'
                                    class='m-2 !px-4 !py-1.5'
                                    variant='outline'
                                >
                                    {{ category.NAME }}
                                </Badge>
                            </div>
                        </div>
                        
                        <h3 class='mt-4'>{{ title }}</h3>
                        
                        <!--  Reading duration  -->
                        <div class='flex items-center gap-2 text-muted-foreground'>
                            <NuxtIcon
                                name='mdi-light:clock'
                                size='25'
                            
                            />
                            <p>{{ reading_duration }} min Read</p>
                        </div>
                    </CardContent>
                    
                    <!--  Subtitle  -->
                    <CardDescription v-if='subtitle'>{{ subtitle }}</CardDescription>
                    
                    <!--  Main image  -->
                    <CardContent class='p-0'>
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
                    <CardContent class='flex justify-between w-2/3'>
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
                        
                        <div class='flex flex-col justify-center text-muted-foreground'>
                            <span v-if='publish_date'>Published: {{ publish_date_label }}</span>
                            <span v-if='update_date'>Last updated: {{ update_date_label }}</span>
                        </div>
                    </CardContent>
                </CardHeader>
                
                <CardContent v-if='body'>
                    <p v-for='(par, index) in body_formatted' :key='index' class='mb-14'>{{ par }}</p>
                </CardContent>
                
                <CardFooter class='pb-10 pl-0 text-muted-foreground'>
                    <p v-if='keywords'>
                        Keywords:
                        <span style='font-size: inherit;'>{{ keywords }}</span>
                    </p>
                </CardFooter>
            </Card>
            
            <!--  Article not available  -->
            <CardContent
                v-else
                class='flex flex-col justify-center gap-8 h-[50vh]'
            >
                <h4 class='mb-3'>Sorry, the article is not available at the moment.</h4>
                <Button
                    as-child
                    variant='link'
                >
                    <NuxtLink @click='goBack(router, "/news")' to='' class='hover:cursor-pointer'>
                        Go back
                    </NuxtLink>
                </Button>
            </CardContent>
        </div>
        
        <!-- Reading/Scroll progress bar -->
        <template v-if='show_progress_bar'>
            <div class='progress-container'>
                <div class='bar-container'>
                    <div class='progress-bar' :style='{ width: `${progress * 100}%` }'></div>
                </div>
            </div>
        </template>
    </section>
</template>

<script setup>
    import { goBack } from '~/utils/formatUtils.js';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    import { useReadingTime } from 'maz-ui';
    import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useSidebar } from '~/components/ui/sidebar/utils.js';
    const { open, isMobile } = useSidebar()
    
    // Router
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router  = useRouter();
    
    // Components
    import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Button } from '~/components/ui/button/index.js';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const { article, loading } = storeToRefs(NewsStore);
    const { getNewsArticle } = NewsStore;
    
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
    const body_formatted = computed(() => {
        if (!body.value) return '';
        
        let sentences = body.value
            .split(/\. +|\.(?=\n)|\.(?=$)/)
            .map(s => s.trim())
            .filter(s => s.length);
        
        let paragraphs = [];
        
        for (let i = 0; i < sentences.length; i += 3) {
            let par = sentences.slice(i, i + 3).map(s => s + '.').join(' ');
            paragraphs.push(par);
        }
        
        return paragraphs;
    });
    
    const source_avatar = computed(() => article.value?.SOURCE_DATA?.IMAGE_URL);
    // const source_url = computed(() => article.value?.SOURCE_DATA?.URL);
    // const source_name = computed(() => article.value?.SOURCE_DATA?.NAME || 'Unknown source');
    // const source_score = computed(() => article.value?.SOURCE_DATA?.BENCHMARK_SCORE);
    // const source_launch_date = computed(() => article.value?.SOURCE_DATA?.LAUNCH_DATE && dayjs.unix(article.value?.SOURCE_DATA.LAUNCH_DATE).format('MMMM D, YYYY'));
    // const source_lang = computed(() => article.value?.SOURCE_DATA?.LANG);
    /*
    const source_url_label = computed(() => {
        let url = new URL(source_url.value);
        let protocol = url.protocol;
        let host = url.host;
        
        return `${protocol}//${host}`;
    });
    */
    
    const progress = ref(0);
    const reading_duration = ref(0);
    const show_progress_bar = computed(() => reading_duration.value > 1 && !open.value);
    
    const onScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.value = Math.min(1, Math.max(0, scrollTop / docHeight));
    };
    
    watch(body_formatted, (newVal) => {
        if (newVal && newVal.length > 0) {
            const joined = newVal.join(' ');
            const { duration } = useReadingTime({
                content: joined,
            });
            reading_duration.value = duration.value;
        }
    }, { immediate: true });
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        await getNewsArticle(source_key, guid);
        window.addEventListener('scroll', onScroll);
    });
    
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
    });
</script>

<style scoped>
    .single-news {
        [data-slot='card-header'],
        [data-slot='card-content'] {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
        
        img.main-image {
            object-fit: cover;
            height: 500px;
            width: 800px;
        }
        
        .progress-container {
            align-items: center;
            background-color: var(--background);
            bottom: 0;
            display: flex;
            height: 50px;
            left: 20px;
            padding-right: 50px;
            position: fixed;
            width: 100vw;
            z-index: 10;
            
            @media (min-width: 770px) {
                left: calc(v-bind(SIDEBAR_WIDTH_ICON) + 20px);
                padding-right: calc(v-bind(SIDEBAR_WIDTH_ICON) + 50px);
            }
        }
        
        .bar-container {
            background: var(--accent);
            border-radius: 4px;
            margin: 0 auto;
            height: 4px;
            width: 100%;
            
            .progress-bar {
                background-color: var(--secondary);
                border-radius: 4px;
                box-shadow: 0 0 48px 1px var(--secondary);
                height: 100%;
                transition: width 0.1s ease-out;
            }
        }
    }
</style>