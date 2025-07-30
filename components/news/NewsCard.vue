<template>
    <Card class='news-item bg-transparent shadow-2xl rounded-md	border-card-border justify-between w-[450px] px-3 py-8 gap-4'>
        <CardHeader>
            <CardDescription class='flex flex-col gap-6'>
                <!--  Header  -->
                <HoverCard :openDelay='200'>
                    <HoverCardTrigger class='flex items-center gap-3 cursor-pointer w-fit'>
                        <Avatar>
                            <AvatarImage :src='source_avatar' alt='source url' />
                            <AvatarFallback>Av</AvatarFallback>
                        </Avatar>
                        
                        <span>{{ source_name }}</span>
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
                
                <!--  Main image  -->
                <NuxtLink :to="`/news/source_key=${source_key}&guid=${guid}`">
                    <NuxtImg
                        :src='imageUrl'
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
                            class='h-[250px] w-full rounded-lg'
                        />
                    </NuxtImg>
                </NuxtLink>
                
                <!--  Title  -->
                <p class='mb-10 text-foreground'>{{ title }}</p>
            </CardDescription>
        </CardHeader>
        
        <CardFooter class='flex justify-between'>
            <!--  Author  -->
            <div class='flex flex-col justify-between'>
                <span>by {{ article_author }}</span>
                <!-- <Badge class='rounded-xs py-1'>{{ source_name }}</Badge> -->
            </div>
            
            <!--  Publish date  -->
            <HoverCard :openDelay='200'>
                <HoverCardTrigger class='flex items-center gap-2'>
                    <NuxtIcon name='iconoir:calendar' size='20px' />
                    <span>{{ published_date_from_now }}</span>
                </HoverCardTrigger>
                <HoverCardContent class='hover-card-content w-fit'>
                    <span class='text-sm'>{{ published_date }}</span>
                </HoverCardContent>
            </HoverCard>
        </CardFooter>
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Badge } from '@/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    
    const props = defineProps({
        guid: String,
        url: String,
        title: String,
        author: String,
        publishedOn: Number,
        imageUrl: String,
        source: Object,
    });
    
    const {
        guid,
        url,
        title,
        author,
        publishedOn,
        imageUrl,
        source,
    } = toRefs(props);
    
    const published_date = dayjs.unix(publishedOn.value).format('MMMM D, YYYY, h:mm A');
    const published_date_from_now = computed(() => publishedOn.value && dayjs.unix(publishedOn.value).fromNow());
    const article_author = computed(() => {
        if(author.value.length === 0) return 'Unknown author';
        return author.value;
    });
    const source_name = source.value?.NAME || 'Unknown source';
    const source_avatar = source.value?.IMAGE_URL;
    const source_score = source.value?.BENCHMARK_SCORE;
    const source_launch_date = source.value?.LAUNCH_DATE && dayjs.unix(source.value?.LAUNCH_DATE).format('MMMM D, YYYY');
    const source_lang = source.value?.LANG;
    const source_key = source.value?.SOURCE_KEY;
    const source_url = computed(() => source.value?.URL);
    
    console.log(source_key);
    
    const source_url_label = computed(() => {
        let url = new URL(source_url.value);
        let protocol = url.protocol;
        let host = url.host;
        
        return `${protocol}//${host}`;
    });
</script>

<style>
    .news-item {
        img.main-image {
            border-radius: 6px;
            object-fit: cover;
            height: 250px;
            width: 100%;
        }
    }
    
    /*[data-slot='hover-card-content'].news-hover-card {}*/
</style>