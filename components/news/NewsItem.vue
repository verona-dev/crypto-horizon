<template>
    <Card class='news-item justify-between w-[450px] px-3 py-8 gap-4'>
        <CardHeader>
            <CardDescription class='flex flex-col gap-6'>
                <div class='flex items-center gap-3'>
                    <!--  Avatar  -->
                    <HoverCard :openDelay='200'>
                        <HoverCardTrigger>
                            <Avatar>
                                <AvatarImage :src='source_avatar' alt='source url' />
                                <AvatarFallback>Av</AvatarFallback>
                            </Avatar>
                        </HoverCardTrigger>
                        
                        <HoverCardContent class='news-hover-card'>
                            <Avatar>
                                <AvatarImage :src='source_avatar' alt='source url' class='w-32' />
                                <AvatarFallback>Av</AvatarFallback>
                            </Avatar>
                            
                            <span>{{ source_name }}</span>
                            
                            <span>({{ source_score }})</span>
                        </HoverCardContent>
                    </HoverCard>
                    
                    <!--  Source  -->
                    <span>{{ source_name }}</span>
                    <span>({{ source_score }})</span>
                </div>
                
                <!--  Main image  -->
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
            <div class='flex items-center gap-2'>
                <NuxtIcon name='iconoir:calendar' size='20px' />
                <span>{{ published_on }}</span>
            </div>
        </CardFooter>
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Badge } from '@/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    
    const props = defineProps({
        id: String,
        url: String,
        title: String,
        author: String,
        publishedOn: Number,
        imageUrl: String,
        source: Object,
    });
    
    const {
        id,
        url,
        title,
        author,
        publishedOn,
        imageUrl,
        source,
    } = toRefs(props);
    
    const published_on = computed(() => publishedOn.value && dayjs.unix(publishedOn.value).fromNow());
    const article_author = computed(() => {
        if(author.value.length === 0) return 'Unknown author';
        return author.value;
    });
    const source_name = source.value?.NAME || 'Unknown source';
    const source_avatar = source.value?.IMAGE_URL;
    const source_url = source.value?.URL;
    const source_score = source.value?.BENCHMARK_SCORE;
    
    console.log(JSON.parse(JSON.stringify(source.value)));
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
    
    [data-slot='hover-card-content'].news-hover-card {
        background-color: red !important;
    }
</style>