<template>
    <Card class='news-item justify-between w-[450px] my-6'>
        <CardHeader>
            <CardDescription>
                <img
                    :src='imageUrl'
                    alt='alt'
                />
            </CardDescription>
            
            <p class='my-4'>{{ title }}</p>
        </CardHeader>
        
        <CardContent class='flex justify-between px-6 pb-6'>
            <span>{{ article_author }}</span>
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
    
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
    } from '@/components/ui/card';
    
    const props = defineProps({
        id: String,
        url: String,
        title: String,
        author: String,
        publishedOn: Number,
        imageUrl: String,
    });
    
    const {
        id,
        url,
        title,
        author,
        publishedOn,
        imageUrl,
    } = toRefs(props);
    
    const published_on = computed(() => publishedOn.value && dayjs.unix(publishedOn.value).format('MMMM D, YYYY'));
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