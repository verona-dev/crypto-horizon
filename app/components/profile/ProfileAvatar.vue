<template>
    <!--  Avatar + Username  -->
    <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-fit flex flex-col items-center p-6 gap-4 !shadow-none relative'>
        <CardHeader class='items-center gap-2'>
            <CardTitle class='text-4xl'>{{ username }}</CardTitle>
            <CardDescription class='text-lg capitalize'>&#8226; {{ astronaut_type }} &#8226;</CardDescription>
        </CardHeader>
        
        <CardContent>
            <div class='p-2 rounded-full shadow-lg'>
                <Avatar class='h-52 w-52 rounded-full ring-offset-background ring-10 ring-secondary ring-offset-1'>
                    <AvatarImage
                        src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757869820/cat-7710382_zqbc1t.jpg'
                        alt='avatar'
                    />
                    <AvatarFallback class='rounded-full'>A</AvatarFallback>
                </Avatar>
            </div>
        </CardContent>
        
        <CardFooter>
            <Badge class='bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full'>
                <div class='h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1' />
                <span class='text-xxs'>Connected</span>
            </Badge>
        </CardFooter>
    </Card>
</template>

<script setup>
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
    import { Badge } from '~/components/ui/badge';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    
    const props = defineProps({
        username: String,
        astronaut_type: String,
    });
    
    const { username, astronaut_type } = toRefs(props);
</script>