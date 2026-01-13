<template>
    <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-160 flex flex-col !justify-around p-6 gap-4 !shadow-none'>
        <CardHeader class='flex-row justify-between rounded-xl border'>
            <CardTitle class='text-2xl'>Personal Information</CardTitle>
            
            <Button
                @click='onHandleDrawer(true)'
                class='w-fit'
                variant='ghost'
                size='sm'
            >
                <NuxtIcon
                    name='ph:pencil-simple-line'
                    size='14'
                />
                
                Edit
            </Button>
        </CardHeader>
        
        <CardContent class='space-y-2 flex justify-between flex-wrap'>
            <div
                v-for='item in profile'
                :key='item.name'
                class='flex flex-col p-2 h-16 w-full md:w-1/2 xl:w-64'
            >
                <span class='text-sm text-muted-foreground'>{{ item.label }}</span>
                
                <div v-if='item.name === "country"' class='flex items-center gap-2'>
                    <ProfileCountryFlag :country='item.value' size='w-4 h-4' />
                    <span>{{ item.value.name }}</span>
                </div>
                
                <template v-else>
                    <span :class='{ "capitalize" : item.name === "astronaut_type" }'>{{ item.value }}</span>
                </template>
            </div>
        </CardContent>
        
        <!--  Edit Profile  -->
        <ProfileEdit
            v-if='show_drawer'
            :profile='profile'
            :showDrawer='show_drawer'
            @handleDrawer='onHandleDrawer'
        />
    </Card>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import ProfileCountryFlag from '~/components/profile/ProfileCountryFlag.vue';
    import ProfileEdit from '~/components/profile/ProfileEdit.vue';
    
    const props = defineProps({
        profile: {
            type: Array,
            required: true,
        }
    });
    
    const { profile } = toRefs(props);
    const show_drawer = ref(false);
    const onHandleDrawer = bool => show_drawer.value = bool;
</script>