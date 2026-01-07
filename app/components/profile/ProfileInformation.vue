<template>
    <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-140 flex flex-col p-6 gap-4 !shadow-none'>
        <CardHeader class='xl:mt-1'>
            <CardTitle class='text-2xl'>Personal Information</CardTitle>
        </CardHeader>
        
        <div class='flex'>
            <CardContent class='flex-1 flex flex-col gap-6'>
                <div
                    v-for='item in profile.slice(0, 4)'
                    :key='item.name'
                    class='flex flex-col gap-0'
                >
                    <span class='text-md text-muted-foreground'>{{ item.label }}</span>
                    <span :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                </div>
            </CardContent>
            
            <CardContent class='flex-1 flex flex-col gap-6'>
                <div
                    v-for='item in profile.slice(4, profile.length)'
                    :key='item.name'
                    class='flex flex-col gap-0'
                >
                    <span class='text-md text-muted-foreground'>{{ item.label }}</span>
                    <span :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                </div>
            </CardContent>
        </div>
    </Card>
</template>

<script setup>
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    
    const props = defineProps({
        profile: {
            type: Object,
            required: true,
        }
    });
    
    const { profile } = toRefs(props);
</script>