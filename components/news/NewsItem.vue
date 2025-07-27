<template>
    <Card class='news-item justify-between w-[450px] my-6'>
        <CardHeader>
            <CardDescription>
                <NuxtImg
                    :src='imageUrl'
                    alt='article image'
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
            </CardDescription>
            
            <p class='my-4'>{{ title }}</p>
        </CardHeader>
        
        <CardContent class='flex flex-col justify-between px-6 pb-6'>
            <span>by {{ article_author }}</span>
            <span>from {{ sourceData.NAME }}</span>
            <span>{{ published_on }}</span>
        </CardContent>
        
        <!--
        <CardFooter class='flex justify-between px-6 pb-6'>
            <p>{{ author }}</p>
            <p>{{ publishedOn }}</p>
        </CardFooter>
        -->
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
    } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    
    const props = defineProps({
        id: String,
        url: String,
        title: String,
        author: String,
        publishedOn: Number,
        imageUrl: String,
        sourceData: Object,
    });
    
    const {
        id,
        url,
        title,
        author,
        publishedOn,
        imageUrl,
        sourceData,
    } = toRefs(props);
    
    const published_on = computed(() => publishedOn.value && dayjs.unix(publishedOn.value).fromNow());
    const article_author = computed(() => {
        if(author.value.length === 0) return 'Unknown author';
        return author.value;
    });
</script>

<style scoped>
    .news-item {
        img {
            border-radius: 6px;
            object-fit: cover;
            height: 250px;
            width: 100%;
        }
    }
</style>