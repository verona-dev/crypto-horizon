<template>
    <Drawer v-model:open='drawer_visibility'>
        <DrawerContent>
            <div class='mx-auto w-full max-w-md md:max-w-2xl grid gap-6'>
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
                        
                        <RadioGroup v-model='selected_astronaut_type'>
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
                                          "relative transition-all shadow-none hover:shadow-xl h-full md:py-6 w-full",
                                                  selected_astronaut_type === option.value && "border-primary/75 shadow-2xl",
                                            )'
                                        >
                                            <CircleCheck
                                                v-if='selected_astronaut_type === option.value'
                                                class='absolute -top-3 -right-2 size-6 rounded-full fill-card text-primary/75'
                                            />
                                            
                                            <div class='flex md:flex-col items-center p-6 space-x-8 md:space-x-0 md:space-y-12'>
                                                <div class='flex items-center justify-center'>
                                                    <NuxtIcon
                                                        :name='option.icon'
                                                        :size='isMobile ? "44" : "68"'
                                                    />
                                                    
                                                    <RadioGroupItem
                                                        :value='option.value'
                                                        :id='option.value'
                                                        class='hidden'
                                                    />
                                                </div>
                                                
                                                <div class='md:space-y-1'>
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
                        <Button
                            @click='onSubmit'
                            :disabled='is_current_type_selected'
                            class='disabled:pointer-events-auto disabled:cursor-not-allowed'
                        >
                            {{ button_label }}
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
    import { displayToast } from '~/utils/toast.js';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    import { Input } from '~/components/ui/input';
    import { Label } from '~/components/ui/label';
    import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
    import { useSidebar } from '~/components/ui/sidebar';
    
    const props = defineProps({
        profile: {
            type: Array,
            required: true,
        },
        showDrawer: Boolean,
    });
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { updateProfile, getProfile } = ProfileStore;
    
    const { profile, showDrawer } = toRefs(props);
    const { isMobile } = useSidebar();
    
    // Drawer
    const drawer_visibility = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(drawer_visibility, bool => emit('handleDrawer', bool));
    const is_current_type_selected = computed(() => current_astronaut_type.value === selected_astronaut_type.value);
    const button_label = computed(() => is_current_type_selected.value ? 'Current Type' : 'Save Changes');
    
    console.log(profile.value);
    
    // Username
    const username = ref(profile.value[0]?.value || '');
    
    // Astronaut Type
    const current_astronaut_type = computed(() => profile.value[2]?.value || '');
    const selected_astronaut_type = ref(profile.value[2]?.value || '');
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
    
    const onSubmit = async() => {
        if(current_astronaut_type.value !== selected_astronaut_type.value) {
            const { success } = await updateProfile({ astronaut_type: selected_astronaut_type.value });
            
            if(success) {
                await getProfile();
                displayToast('Astronaut type updated successfully.')
            } else {
                displayToast('Cannot update astronaut type.');
            }
        }
    };
</script>yle>