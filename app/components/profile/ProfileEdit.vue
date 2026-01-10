<template>
    <Drawer v-model:open='drawer_visibility'>
        <DrawerContent>
            <div class='mx-auto w-full max-w-sm lg:max-w-lg'>
                <DrawerHeader class='my-6'>
                    <DrawerTitle class='text-3xl'>Edit Profile</DrawerTitle>
                    <DrawerDescription class='text-md'>Click on any field to update your profile.</DrawerDescription>
                </DrawerHeader>
                
                <div class='grid gap-12 my-6 p-4'>
                    <!--  Edit Username  -->
                    <div class='grid gap-2'>
                        <Label for='username'>Username</Label>
                        <Input
                            :default-value='username'
                            id='username'
                            name='username'
                            type='text'
                            placeholder='Type username here'
                        />
                    </div>
                    
                    <!--  Edit Astronaut Type  -->
                    <ToggleGroup
                        v-model='astronaut_type'
                        @update:model-value='handleAstronautType'
                        type='single'
                        class='flex flex-wrap my-12 xl:h-64 p-4'
                    >
                        <template
                            v-for='option in astronaut_type_options'
                            :key='option'
                        >
                            <ToggleGroupItem
                                v-slot='{ pressed }'
                                :id='option.value'
                                :value='option.value'
                                class='w-24 h-24 m-2 relative rounded-lg border border-transparent data-[state=on]:bg-transparent'
                            >
                                {{ option.label }}
                                
                                <BadgeCheck
                                    v-if='pressed'
                                    class='absolute bottom-1 -right-1 size-4.5 rounded-full fill-progress/80 text-white'
                                />
                            </ToggleGroupItem>
                        </template>
                    </ToggleGroup>
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
    import { BadgeCheck, CircleCheck, CpuIcon } from 'lucide-vue-next';
    import { Button } from '~/components/ui/button';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    import { Input } from '~/components/ui/input';
    import { Label } from '~/components/ui/label';
    import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
    
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
            label: 'Explorer',
            description: 'Specializes in discovering new planets.',
        },
        {
            value: 'engineer',
            label: 'Engineer',
            description: 'Specializes in repairing systems.',
        },
        {
            value: 'pilot',
            label: 'Pilot',
            description: 'Specializes in piloting ships through asteroid fields, gravitational anomalies, and hyperspace jumps.',
        },
    ];
    
    const handleAstronautType = () => {
        console.log('changed type');
    };
    
    const onSubmit = async() => {
        console.log('submit');
    };
</script>