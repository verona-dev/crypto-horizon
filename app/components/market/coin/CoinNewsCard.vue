<template>
    <Card class='w-full md:w-2/3 xl:w-120 shadow-none transition duration-300 hover:shadow-2xl' v-if='article'>
        <!--  Article image + Categories  -->
        <CardHeader class='gap-4'>
            <!--  Article image  -->
            <div class='h-52'>
                <NuxtImg
                    :src='image_url'
                    alt='article image'
                    class='w-full h-full rounded-lg object-cover'
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
                        class='w-full h-full rounded-lg'
                    />
                </NuxtImg>
            </div>
            
            <!-- Categories  -->
            <!--
            <div class='flex items-center gap-2'>
                <Badge
                    v-for='category in categories.slice(0, 16)'
                    class='py-1 px-1.5 text-muted-foreground border text-[10px] font-extralight tracking-widest'
                    variant='outline'
                >
                    {{ category.NAME }}
                </Badge>
            </div>
            -->
            
            <!-- Keywords  -->
            <div class='self-start'>
                    <span
                        v-for='keyword in keywords'
                        key='keyword'
                        class='text-sky text-xs truncate'
                    >
                        {{ keyword }}
                    </span>
            </div>
        </CardHeader>
        
        <!--  Article Title  -->
        <CardContent class='mb-4'>
            <NuxtLink :to="{ path: `/news/${encodeURIComponent(guid)}`, query: { source_key, guid } }">
                <CardTitle class='text-left text-base hover:underline line-clamp-2'>
                    {{ title }}
                </CardTitle>
            </NuxtLink>
        </CardContent>
        
        <CardFooter class='mb-4 flex items-start gap-12'>
            <!--  Author/Source + Publish date  -->
            <div class='flex flex-col xl:flex-row items-start gap-6 xl:gap-12'>
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger class='flex items-center gap-4 cursor-pointer'>
                        <!--  Avatar  -->
                        <Avatar class='h-10 w-10 rounded-full'>
                            <AvatarImage :src='source_avatar' alt='avatar' />
                            <AvatarFallback class='rounded-full'>S</AvatarFallback>
                        </Avatar>
                        
                        <!--  Author  -->
                        <div class='flex flex-col items-start text-sm gap-1'>
                            <span>{{ article_author_label }}</span>
                            <span class='text-muted-custom'>{{ source_name_label }}</span>
                        </div>
                    </HoverCardTrigger>
                    
                    <!--  Source  -->
                    <HoverCardContent class='flex !justify-between !content-between !items-between gap-10 !p-10 w-fit'>
                        <NuxtImg
                            :src='source_avatar'
                            alt='source avatar'
                            class='rounded-md m-auto'
                            height='150px'
                            width='150px'
                        />
                        
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
                
                <div class='flex flex-col text-muted-custom gap-2 mt-1'>
                    <!--  Publish date  -->
                    <div :openDelay='200' class='flex items-center gap-2'>
                        <NuxtIcon name='iconoir:calendar' size='16px' />
                        <span class='text-xs'>{{ published_date }}</span>
                    </div>
                    
                    <!--  Reading duration  -->
                    <div v-if='show_reading_duration' class='text-muted-foreground flex items-center gap-1'>
                        <NuxtIcon name='ph:timer-light' size='18' />
                        <span class='text-xxs'>{{ reading_duration }}m</span>
                    </div>
                </div>
            </div>
        </CardFooter>
    </Card>
</template>

<script setup>
    import { useReadingTime } from 'maz-ui/composables';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardTitle, CardContent, CardHeader, CardFooter } from '~/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Badge } from '~/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    
    const props = defineProps({
        article: Object,
    });
    
    const { article } = toRefs(props);
    console.log(JSON.parse(JSON.stringify(article.value)));
    
    const guid = article.value?.GUID;
    const title = article.value?.TITLE;
    const image_url = article.value?.IMAGE_URL;
    const body = article.value?.BODY;
    const published_date = dayjs.unix(article.value?.PUBLISHED_ON).format('MMMM D, YYYY, h:mm A');
    // const published_date_from_now = computed(() => article.value?.PUBLISHED_ON && dayjs.unix(article.value?.PUBLISHED_ON).fromNow());
    
    const article_author = computed(() => article.value?.AUTHORS);
    const article_author_label = computed(() => {
        if(article_author.value?.length === 0) return 'Unknown author';
        if(source_name === 'CoinTelegraph') return article_author.value.replace('Cointelegraph by', '');
        return article_author.value;
    });
    const categories = article.value?.CATEGORY_DATA;
    const keywords = article.value?.KEYWORDS;
    const show_reading_duration = computed(() => reading_duration.value > 0);
    const reading_duration = computed(() => {
        if(!body) return 0;
        
        const { duration } = useReadingTime({
            content: body,
        });
        return duration.value;
    });
    
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