<template>
    <Card class='bg-popover h-full xl:h-120 w-full md:w-4/5 xl:w-140 flex flex-col !justify-around p-6 gap-4 !shadow-none'>
        <CardHeader class='flex-row justify-between rounded-xl border'>
            <CardTitle class='text-2xl'>Personal Information</CardTitle>
            
            <Button
                @click='toggleEditDrawer'
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
        
        <div class='flex p-6 rounded-xl'>
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
        
        <!--  Edit Profile  -->
        <Drawer v-model:open='drawer_visibility'>
            <DrawerContent>
                <div class='mx-auto w-full max-w-sm lg:max-w-lg'>
                    <DrawerHeader class='my-6'>
                        <DrawerTitle class='text-3xl'>Edit Profile</DrawerTitle>
                        <DrawerDescription class='text-md'>Click on any field to update your profile.</DrawerDescription>
                    </DrawerHeader>
                    
                    <DrawerFooter class='mb-16 gap-4'>
                        <DrawerClose as-child>
                            <Button @click='onSubmit'>
                                Save
                            </Button>
                        </DrawerClose>
                        
                        <DrawerClose as-child>
                            <Button variant='outline'>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    </Card>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    
    const props = defineProps({
        profile: {
            type: Array,
            required: true,
        }
    });
    
    const { profile } = toRefs(props);
    
    const drawer_visibility = ref(false);
    
    const toggleEditDrawer = () => {
      drawer_visibility.value = !drawer_visibility.value;
    };
    
    const onSubmit = async() => {
        console.log('submit');
    };
</script>