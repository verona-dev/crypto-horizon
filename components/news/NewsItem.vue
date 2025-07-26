<template>
    <Card class='news-item w-[350px]'>
        <CardHeader>
            <CardDescription>
                <NuxtImg
                    :src='imageUrl'
                    height='150px'
                    width='200px'
                />
            </CardDescription>
            <CardTitle>{{ title }}</CardTitle>
        </CardHeader>
        <CardContent>
            <div class='flex flex-col space-y-1.5'>
                <Label for='name'>Name</Label>
                <Input id='name' placeholder='Name of your project' />
            </div>
        </CardContent>
        <CardFooter class='flex justify-between px-6 pb-6'>
            <p>{{ author }}</p>
            <p>{{ date }}</p>
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
        href: String,
        title: String,
        author: String,
        date: String,
        imageUrl: String,
    });
    
    const {
        id,
        href,
        title,
        author,
        date,
        imageUrl,
    } = toRefs(props);
</script>

<style scoped>

</style>