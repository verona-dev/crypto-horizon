<template>
    <Drawer v-model:open='drawer_visibility'>
        <DrawerContent>
            <div class='mx-auto w-full max-w-sm lg:max-w-2xl grid gap-6'>
                <DrawerHeader>
                    <DrawerTitle class='text-3xl'>Edit Profile</DrawerTitle>
                    <DrawerDescription class='text-md'>Click on any field to update your profile.</DrawerDescription>
                </DrawerHeader>
                
                <div class='grid gap-12 p-4'>
                    <!--  Edit Username  -->
                    <div class='grid gap-2'>
                        <Label for='username' class='text-xl font-semibold tracking-tight'>Username</Label>
                        
                        <Input
                            :default-value='username'
                            id='username'
                            name='username'
                            type='text'
                            placeholder='Type username here'
                        />
                    </div>
                    
                    <!--  Edit Astronaut Type  -->
                    <div class='grid gap-4'>
                        <h3 class='text-xl font-semibold tracking-tight'>Astronaut Type</h3>
                        
                        <RadioGroup
                            v-model='astronaut_type'
                            @update:model-value='handleAstronautType'
                        >
                            <div class='grid gap-4 md:grid-cols-3'>
                                <template
                                    v-for='option in astronaut_type_options'
                                    :key='option.value'
                                >
                                    <Label
                                        :for='option.value'
                                        class='cursor-pointer'
                                    >
                                        <Card
                                            :class='cn(
                                          "relative transition-all shadow-none hover:shadow-xl h-full py-6",
                                                  astronaut_type === option.value && "border-primary/75 shadow-2xl",
                                            )'
                                        >
                                            <CircleCheck
                                                v-if='astronaut_type === option.value'
                                                class='absolute -top-3 -right-2 size-6 rounded-full fill-card text-primary/75'
                                            />
                                            
                                            <div class='p-6 space-y-12'>
                                                <div class='flex items-center justify-center'>
                                                    <NuxtIcon
                                                        :name='option.icon'
                                                        size='68'
                                                    />
                                                    
                                                    <RadioGroupItem
                                                        :value='option.value'
                                                        :id='option.value'
                                                        class='hidden'
                                                    />
                                                </div>
                                                
                                                <div class='space-y-1'>
                                                    <h4 class='font-semibold'>{{ option.title }}</h4>
                                                    <p class='text-sm text-muted-foreground'>
                                                        {{ option.description }}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Label>
                                </template>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                
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
</template>

<script setup>
    import { cn } from '@/lib/utils';
    import { CircleCheck } from 'lucide-vue-next';
    import { Button } from '~/components/ui/button';
    import { Card } from '~/components/ui/card';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    import { Input } from '~/components/ui/input';
    import { Label } from '~/components/ui/label';
    import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
    
    const props = defineProps({
        profile: {
            type: Array,
            required: true,
        },
        showDrawer: Boolean,
    });
    
    const { profile, showDrawer } = toRefs(props);
    
    // Drawer
    const drawer_visibility = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(drawer_visibility, bool => emit('handleDrawer', bool));
    
    console.log(profile.value);
    
    // Username
    const username = ref(profile.value[0]?.value || '');
    
    // Astronaut Type
    const astronaut_type = ref(profile.value[2]?.value || '');
    const astronaut_type_options = [
        {
            value: 'explorer',
            title: 'Explorer',
            description: 'Specializes in discovering planets.',
            icon: 'ph:compass-rose-thin',
        },
        {
            value: 'engineer',
            title: 'Engineer',
            description: 'Specializes in maintaining systems.',
            icon: 'ph:wrench-thin',
        },
        {
            value: 'pilot',
            title: 'Pilot',
            description: 'Specializes in piloting ships.',
            icon: 'ph:airplane-takeoff-thin',
        },
    ];
    
    const handleAstronautType = () => {
        console.log('changed type');
    };
    
    const onSubmit = async() => {
        console.log('submit');
    };
</script>yle>