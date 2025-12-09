<template>
    <div class='news page'>
        <!--  <Breadcrumb />  -->
        
        <div v-if='loading' class='flex items-center h-[50vh]'>
            <Spinner class='size-10 text-green-shamrock' />
        </div>
        
        <Card v-else class='bg-transparent border-none shadow-none max-w-7xl pt-0 pb-10 mx-auto'>
            <!--  Article not available  -->
            <CardContent
                v-if='error?.statusCode'
                class='flex flex-col justify-center items-center gap-8 w-[60vh] h-[60vh]'
            >
                <NuxtIcon
                    name='my-icons:server'
                    class='w-40 h-40 xl:w-100 xl:h-100'
                />
                
                <h1 v-if='errorCode'>{{ errorCode }}</h1>
                
                <h2 v-if='errorMessage' class='tracking-wide'>{{ errorMessage }}</h2>
                
                <h4 class='mb-3'>Sorry, the article is not available at the moment.</h4>
                
                <Button variant='link'>
                    <NuxtLink @click='goBack(router, "/news")' to=''>Go back</NuxtLink>
                </Button>
            </CardContent>
            
            <div v-else-if='article && !error?.statusCode'>
                <!--  Title + Categories + Author -->
                <CardHeader class='flex flex-col gap-10'>
                    <!--  Title  -->
                    <CardTitle v-if='title' class='article-title'>{{ title }}</CardTitle>
                    
                    <!--  Subtitle  -->
                    <CardDescription v-if='subtitle'>{{ subtitle }}</CardDescription>
                    
                    <!--  Categories  -->
                    <div v-if='categories' class='flex flex-wrap items-center gap-2'>
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
                    <div class='flex flex-wrap items-center gap-2 md:gap-8 xl:gap-16'>
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
                        
                        <div v-if='reading_duration > 0' class='flex items-center gap-2 text-muted-foreground text-sm font-bold'>
                            <NuxtIcon name='ph:timer' size='18' />
                            <span>{{ reading_duration }} min read</span>
                        </div>
                        
                        <div class='vertical-separator' />
                        
                        <div v-if='updated_on_label' class='flex flex-col items-center gap-1 text-muted-foreground text-sm'>
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
                            class='w-140 h-100 rounded-lg'
                        />
                    </NuxtImg>
                </CardContent>
                
                <!--  Content  -->
                <CardContent v-if='body' class='article-body'>
                    <p v-for='(par, index) in body_formatted' :key='index'>
                        {{ par }}
                    </p>
                </CardContent>
                
                <!--  Sentiment + Article Link + Keywords  -->
                <CardFooter class='py-12 xl:py-24 flex flex-col !items-start gap-48'>
                    <div class='flex flex-wrap justify-between gap-16 w-full'>
                        <!--  Sentiment  -->
                        <Card
                            v-if='sentiment'
                            class='bg-background border-border shadow-none hover:shadow-2xl flex flex-col items-center justify-between gap-8 p-16 md:w-110 mx-auto'
                        >
                            <div class='flex items-center gap-3'>
                                <h4>Article sentiment</h4>
                                
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger>
                                        <InfoIcon />
                                    </HoverCardTrigger>
                                    
                                    <HoverCardContent class='flex-col gap-6'>
                                        The sentiment polarity of this article. We compute this using ChatGPT.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            
                            <NuxtIcon :name='sentiment?.icon' size='100' :class='sentiment?.class' />
                            
                            <h5 class='uppercase'>{{ sentiment?.label }}</h5>
                        </Card>
                        
                        <!--  Article Link  -->
                        <Card
                            v-if='article_url'
                            class='bg-background border-border shadow-none hover:shadow-2xl flex flex-col items-center justify-between gap-8 p-16 md:w-110 mx-auto'
                        >
                            <div class='flex items-center gap-3'>
                                <h4>Original Source</h4>
                                
                                <HoverCard :openDelay='200'>
                                    <HoverCardTrigger>
                                        <InfoIcon />
                                    </HoverCardTrigger>
                                    
                                    <HoverCardContent class='flex-col gap-6'>
                                        The web address that directs to the specific content or article on a source website.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            
                            <NuxtIcon name='ph:read-cv-logo-thin' size='100' class='' />
                            
                            <Button variant='link' class='!pb-0'>
                                <NuxtLink
                                    :to='article_url'
                                    target='_blank'
                                    class='flex items-center gap-1 uppercase text-foreground'
                                    external
                                >
                                    <h5>Visit Article</h5>
                                    
                                    <NewTabIcon />
                                </NuxtLink>
                            </Button>
                        </Card>
                    </div>
                    
                    <!--  Keywords  -->
                    <div class='flex flex-col items-start gap-8'>
                        <h5 class='underline'>Keywords</h5>
                        
                        <div class='flex flex-wrap items-center gap-3'>
                            <Badge
                                v-for='keyword in keywords_computed'
                                :key='keyword'
                                variant='outline'
                                class='text-muted-foreground'
                            >
                                {{ keyword }}
                            </Badge>
                        </div>
                    </div>
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
    import NewTabIcon from '~/components/NewTabIcon.vue';
    
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
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Spinner } from '~/components/ui/spinner';
    
    // Router
    const route = useRoute();
    const router  = useRouter();
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const { article, loading, errorFetch } = storeToRefs(NewsStore);
    const { getArticle } = NewsStore;
    
    const error = computed(() => errorFetch.value);
    const errorCode = computed(() => error.value?.statusCode);
    const errorMessage = computed(() => error.value?.statusMessage);
    
    const title = computed(() => article.value?.TITLE);
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
    const keywords_computed = computed(() => {
        const keywords_array = ref([]);
        
        if(keywords.value) {
            keywords_array.value = keywords.value?.split('|');
            
            keywords_array.value = keywords_array.value.map(keyword => {
                const lower_case = keyword.toLowerCase()
                return lower_case.charAt(0).toUpperCase() + lower_case.slice(1);
            })
        }
        return keywords_array.value;
    });
    
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
    const article_url = computed(() => article.value?.URL);
    const article_sentiment = computed(() => article.value?.SENTIMENT);
    const sentiment = computed(() => {
        switch(article_sentiment.value) {
            case 'POSITIVE':
                return { label: 'Positive', icon: 'ph:smiley-thin', class: 'text-progress' };
            case 'NEUTRAL':
                return { label: 'Neutral', icon: 'ph:smiley-meh-thin', class: 'text-gray-400' };
            case 'NEGATIVE':
                return { label: 'Negative', icon: 'ph:smiley-sad-thin', class: 'text-destructive' };
            default:
                return { label: 'Unknown', icon: 'ph:smiley-meh-thin', color: 'text-gray-400' };
        }
    });
    
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
    
    // SEO
    const description = computed(() => `${body_formatted.value[0]?.slice(0,150)}...`) || 'Read the full story on CryptoHorizon';
    const path = computed(() => route.fullPath);
    
    useHead({
        title: title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: path },
            { name: 'robots', content: 'index, follow' },
        ],
    });
    
    useSeoMeta({
        title: title,
        description: description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        ogUrl: path,
    });
    
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