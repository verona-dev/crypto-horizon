<template>
    <div class='news page'>
        <!--  <Breadcrumb />  -->
        
        <div v-if='loading' class='flex items-center h-[50vh]'>
            <Spinner class='size-10 text-green-shamrock' />
        </div>
        
        <Card v-else class='bg-transparent w-full h-full shadow-none gap-12 xl:gap-20 max-w-7xl pt-0 pb-10 xl:mt-10 mb-40 mx-auto'>
            <!--  Article not available  -->
            <CardContent
                v-if='error?.statusCode'
                class='flex flex-col justify-center items-center gap-8 w-[60vh] h-[60vh]'
            >
                <h1 v-if='errorCode'>{{ errorCode }}</h1>
                
                <h2 v-if='errorMessage' class='tracking-wide'>{{ errorMessage }}</h2>
                
                <h4 class='mb-3'>Sorry, the article is not available at the moment.</h4>
                
                <Button variant='link'>
                    <NuxtLink @click='goBack(router, "/news")' to=''>Go back</NuxtLink>
                </Button>
            </CardContent>
            
            <div v-else>
                <!--  Title + Categories + Author -->
                <CardHeader class='flex flex-col gap-10'>
                    <!--  Title  -->
                    <CardTitle v-if='title' class='article-title h-24'>{{ title }}</CardTitle>
                    
                    <!--  Subtitle  -->
                    <CardDescription v-if='subtitle'>{{ subtitle }}</CardDescription>
                    
                    <!--  Categories  -->
                    <div v-if='categories' class='flex items-center gap-2'>
                        <Badge
                            v-for='category in categories'
                            :key='category'
                            class='!px-4 !py-1.5 text-muted-foreground border border-sky/50 font-extralight tracking-widest'
                            variant='outline'
                        >
                            {{ category.NAME }}
                        </Badge>
                    </div>
                    
                    <!--  Author + Updated + Reading duration  -->
                    <div class='flex items-center gap-16'>
                        <div class='author flex items-center gap-6'>
                            <Avatar class='rounded-lg'>
                                <AvatarImage v-if='source_avatar' :src='source_avatar' alt='avatar' />
                                <AvatarFallback class='rounded-full'>S</AvatarFallback>
                            </Avatar>
                            
                            <div class='flex flex-col gap-1'>
                                <p v-if='author'>By {{ author }}</p>
                                <span v-if='published_on' class='text-muted-foreground text-sm'>{{ published_on_label }} UTC</span>
                            </div>
                        </div>
                        
                        <div class='vertical-separator' />
                        
                        <div v-if='reading_duration > 0' class='flex items-center gap-2 text-muted-foreground text-sm'>
                            <NuxtIcon name='ph:timer-light' size='18' />
                            <span>{{ reading_duration }} min read</span>
                        </div>
                        
                        <div class='vertical-separator' />
                        
                        <div v-if='updated_on_label' class='flex flex-col gap-1 text-muted-foreground text-sm'>
                            <span>Last updated:</span>
                            <span class='font-bold'>{{ updated_on_label }}</span>
                        </div>
                    </div>
                </CardHeader>
                
                <!--  Image  -->
                <CardContent class='my-8'>
                    <NuxtImg
                        v-if='image_url'
                        :src='image_url'
                        alt='article image'
                        class='w-140 h-100 rounded-lg'
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
                            class='w-3/4 h-120 rounded-lg'
                        />
                    </NuxtImg>
                </CardContent>
                
                <CardContent v-if='body' class='article-body'>
                    <p v-for='(par, index) in body_formatted' :key='index'>
                        {{ par }}
                    </p>
                </CardContent>
                
                <CardFooter class='pb-10 pl-0'>
                    <p v-if='keywords'>
                        Keywords:
                        <span style='font-size: inherit;'>{{ keywords }}</span>
                    </p>
                </CardFooter>
            </div>
        </Card>
        
        <!-- Reading/Scroll progress bar -->
        <template v-if='show_progress_bar'>
            <div class='progress-container'>
                <div class='bar-container'>
                    <div class='progress-bar' :style='{ width: `${progress * 100}%` }'></div>
                </div>
            </div>
        </template>
        
        <!--
                <div class='header-nav flex items-center justify-start gap-8'>
                    &lt;!&ndash;  Go back  &ndash;&gt;
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
                </div>
                -->
    </div>
</template>

<script setup>
    import { goBack } from '~/utils/formatUtils.js';
    import { useReadingTime } from 'maz-ui/composables';
    import Breadcrumb from '~/components/Breadcrumb.vue';
    
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useSidebar } from '~/components/ui/sidebar/utils.js';
    const { open } = useSidebar();
    
    // Components
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    import { Badge } from '~/components/ui/badge';
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Spinner } from '~/components/ui/spinner';
    
    // Router
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router  = useRouter();
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const { article, loading, errorFetch } = storeToRefs(NewsStore);
    const error = computed(() => errorFetch.value);
    const errorCode = computed(() => error.value?.statusCode);
    const errorMessage = computed(() => error.value?.statusMessage);
    /*    watch(article, (newValue) => {
            console.log(newValue);
        })*/
    const { getArticle } = NewsStore;
    
    const title = computed(() => article.value?.TITLE || '');
    const subtitle = computed(() => article.value?.SUBTITLE);
    const image_url = computed(() => article.value?.IMAGE_URL);
    const created_on = computed(() => article.value?.CREATED_ON);
    const published_on = computed(() => article.value?.PUBLISHED_ON);
    const published_on_label = computed(() => dayjs.unix(published_on.value).format('MMMM D, YYYY'));
    const updated_on = computed(() => article.value?.UPDATED_ON);
    const updated_on_label = computed(() => {
        if(updated_on.value) return dayjs.unix(updated_on.value).fromNow();
        if(created_on.value) return dayjs.unix(created_on.value).fromNow();
    });
    const categories = computed(() => article.value?.CATEGORY_DATA);
    const keywords = computed(() => article.value?.KEYWORDS);
    const author = computed(() => {
        if(article.value?.AUTHORS?.length === 0) return 'Unknown author';
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
        await getArticle(source_key, guid);
        window.addEventListener('scroll', onScroll);
    });
    
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
    });
</script>

<style scoped>
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
            left: calc(v-bind(SIDEBAR_WIDTH_ICON) + 15px);
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
            background-color: var(--green-patina);
            border-radius: 4px;
            box-shadow: 0 0 48px 1px var(--green-patina);
            height: 100%;
            transition: width 0.1s ease-out;
        }
    }
</style>