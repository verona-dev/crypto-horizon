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
                    <RadioGroup default-value='comfortable'>
                        <div class='flex items-center space-x-2'>
                            <RadioGroupItem id='r1' value='default' />
                            <Label for='r1'>Default</Label>
                        </div>
                        <div class='flex items-center space-x-2'>
                            <RadioGroupItem id='r2' value='comfortable' />
                            <Label for='r2'>Comfortable</Label>
                        </div>
                        <div class='flex items-center space-x-2'>
                            <RadioGroupItem id='r3' value='compact' />
                            <Label for='r3'>Compact</Label>
                        </div>
                    </RadioGroup>
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
    import { Button } from '~/components/ui/button';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    import { Input } from '~/components/ui/input';
    import { Label } from '~/components/ui/label';
    import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
    
    const props = defineProps({
        profile: {
            type: Array,
            required: true,
        },
        showDrawer: Boolean,
    });
    
    const { profile, showDrawer } = toRefs(props);
    console.log(profile.value);
    const username = ref(profile.value[0]?.value || '');
    
    const drawer_visibility = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(drawer_visibility, bool => emit('handleDrawer', bool));
    
    const onSubmit = async() => {
        console.log('submit');
    };
</script>