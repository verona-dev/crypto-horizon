<template>
    <Card v-if='article' class='news-card w-[450px] flex flex-col justify-around'>
        <!--  Article image + Title  -->
        <CardHeader class='p-4 gap-8'>
            <div class='flex flex-col gap-3 relative'>
                <!--  Categories / Tags  -->
                <div class='h-14 absolute top-2 left-0 px-2'>
                    <Badge
                        v-for='category in categories.slice(0, 4)'
                        class='m-1.5 p-1.5 bg-primary-foreground text-green-shamrock border text-[11px] font-extralight tracking-widest'
                        variant='outline'
                    >
                        {{ category.NAME }}
                    </Badge>
                </div>
                
                <NuxtImg
                    :src='image_url'
                    alt='article image'
                    class='rounded-xl object-cover'
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
                
                <div class='flex justify-between text-muted-custom px-2'>
                    <!--  Publish date  -->
                    <div class='flex items-center gap-2'>
                        <NuxtIcon name='iconoir:calendar' size='16' />
                        <span class='text-xxs'>{{ published_date }}</span>
                    </div>
                    
                    <!--  Reading duration  -->
                    <div v-if='show_reading_duration' class='flex items-center gap-2'>
                        <NuxtIcon name='iconoir:timer' size='16' />
                        <span class='text-xxs'>{{ reading_duration }} min read</span>
                    </div>
                </div>
            </div>
            
            <CardTitle class='text-lg min-h-32'>
                <NuxtLink
                    :to="{ path: `/news/${encodeURIComponent(guid)}`, query: { source_key, guid } }"
                    class='hover:underline'
                >
                    {{ title }}
                </NuxtLink>
            </CardTitle>
        </CardHeader>
        
        <!--  Author + Source  -->
        <CardContent>
            <HoverCard :openDelay='200' class='flex flex-col gap-6 p-3'>
                <HoverCardTrigger class='flex items-center gap-4 cursor-pointer'>
                    <!--  Avatar  -->
                    <Avatar class='h-8 w-8 rounded-lg'>
                        <AvatarImage :src='source_avatar' alt='avatar' />
                        <AvatarFallback class='rounded-lg'>
                            S
                        </AvatarFallback>
                    </Avatar>
                    
                    <!--  Author  -->
                    <div class='flex flex-col items-start text-left text-sm'>
                        <span>by {{ article_author_label }}</span>
                        <span class='text-muted-custom'>{{ source_name_label }}</span>
                    </div>
                </HoverCardTrigger>
                
                <!--  Source  -->
                <HoverCardContent class='news-hover-card flex !justify-between !content-between !items-between gap-6 p-10 w-fit'>
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
        </CardContent>
        
        <CardFooter class='flex justify-center mt-10 mb-4'>
            <!--  Read more  -->
            <Button as-child variant='outline' class='read-more p-5'>
                <NuxtLink
                    :to="{ path: `/news/${encodeURIComponent(guid)}`, query: { source_key, guid } }"
                    class='border-green-shamrock'
                >
                    Read More
                </NuxtLink>
            </Button>
        </CardFooter>
    </Card>
</template>

<script setup>
    import { useReadingTime } from 'maz-ui/composables';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    import { Card, CardTitle, CardFooter, CardHeader, CardContent } from '~/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton';
    import { Badge } from '~/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import { Button } from '~/components/ui/button';
    
    const props = defineProps({
        article: Object,
    });
    
    const { article } = toRefs(props);
    
    const guid = article.value?.GUID;
    const title = article.value?.TITLE;
    const image_url = article.value?.IMAGE_URL;
    const published_date = dayjs.unix(article.value?.PUBLISHED_ON).format('MMMM D, YYYY');
    console.log(published_date);
    // const published_date_from_now = computed(() => article.value?.PUBLISHED_ON && dayjs.unix(article.value?.PUBLISHED_ON).fromNow());
    
    const article_author = computed(() => article.value?.AUTHORS);
    const article_author_label = computed(() => {
        if(article_author.value?.length === 0) return 'Unknown author';
        if(source_name === 'CoinTelegraph') return article_author.value.replace('Cointelegraph by', '');
        return article_author.value;
    });
    
    const reading_duration = ref(0);
    const show_reading_duration = computed(() => reading_duration.value > 0);
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
        a.read-more:hover {
            border: 1px solid var(--green-shamrock)
        }
    }
</style>