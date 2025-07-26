<template>
    <Card class='news-item w-[500px]'>
        <CardHeader>
            <CardDescription>
                <img
                    :src='imageUrl'
                    alt='alt'
                />
            </CardDescription>
            
            <h6 class='my-4'>{{ title }}</h6>
        </CardHeader>
        <CardContent>
            <div class='flex flex-col space-y-1.5'>
                <p>Name</p>
                <p>description</p>
            </div>
        </CardContent>
        <CardFooter class='flex justify-between px-6 pb-6'>
            <p>{{ author }}</p>
            <p>{{ publishedOn }}</p>
        </CardFooter>
    </Card>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
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