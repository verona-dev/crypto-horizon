<template>
    <Drawer v-model:open='drawer_visibility'>
        <DrawerContent>
            <div class='mx-auto w-full max-w-md md:max-w-2xl grid gap-6'>
                <DrawerHeader class='mt-4'>
                    <DrawerTitle class='text-3xl'>Edit Profile</DrawerTitle>
                    <DrawerDescription class='text-md'>Click on any field to update your profile.</DrawerDescription>
                </DrawerHeader>
                
                <div class='grid gap-12 p-4'>
                    <div class='flex flex-col gap-6 md:flex-row justify-between'>
                        <!--  Edit Username  -->
                        <div class='grid gap-2 w-full md:w-64'>
                            <Label for='username' class='font-semibold tracking-tight'>Username</Label>
                            
                            <Input
                                v-model='selected_username'
                                :default-value='selected_username'
                                id='username'
                                name='username'
                                type='text'
                                placeholder='Type username here'
                            />
                        </div>
                        
                        <!--  Edit Country  -->
                        <div class='grid gap-2 w-full md:w-64'>
                            <Label for='country' class='font-semibold tracking-tight'>Country</Label>
                            
                            <Popover v-model:open='countries_dropdown'>
                                <PopoverTrigger as-child>
                                    <Button
                                        variant='outline'
                                        role='combobox'
                                        :aria-expanded='countries_dropdown'
                                        id='country'
                                        name='country'
                                        class='justify-between px-3 py-5'
                                    >
                                        <div class='flex items-center gap-2'>
                                            <ProfileCountryFlag :country='selected_country' />
                                            
                                            <span>{{ selected_country?.name || 'Select Country...' }}</span>
                                        </div>
                                        <ChevronsUpDownIcon class='opacity-50' />
                                    </Button>
                                </PopoverTrigger>
                                
                                <PopoverContent class='w-full md:w-64 p-0'>
                                    <Command>
                                        <CommandInput class='h-9' placeholder='Search Country...' />
                                        
                                        <CommandList>
                                            <CommandEmpty>No country found.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem
                                                    v-for='country in countries'
                                                    :key='country.code'
                                                    :value='country.code'
                                                    @select='(ev) => selectCountry(ev.detail.value as string)'
                                                    class='py-3 px-2 pl-1 gap-3 cursor-pointer'
                                                >
                                                    <ProfileCountryFlag :country='country' class='ml-1' />
                                                    
                                                    <span>{{ country.name }}</span>
                                                    
                                                    <CheckIcon
                                                        :class='cn(
                                                      "ml-auto",
                                                             old_selection === country.code ? "opacity-100" : "opacity-0",
                                                        )'
                                                    />
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    
                    <!--  Edit Astronaut Type  -->
                    <div class='grid gap-4'>
                        <Label for='astronaut-type' class='font-semibold tracking-tight'>Astronaut Type</Label>
                        
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
                            class='disabled:pointer-events-auto disabled:cursor-not-allowed'
                        >
                            Save Changes
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

<script lang='ts' setup>
    import { cn } from '@/lib/utils';
    import { CircleCheck } from 'lucide-vue-next';
    import { Button } from '~/components/ui/button';
    import { Card } from '~/components/ui/card';
    import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
    import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
    import { displayToast, displayCustomToast } from '~/utils/toast.js';
    import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
    import { Input } from '~/components/ui/input';
    import { Label } from '~/components/ui/label';
    import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
    import ProfileCountryFlag from '~/components/profile/ProfileCountryFlag.vue';
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
    import { storeToRefs } from 'pinia';
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { updateProfile, getProfile, getCountries } = ProfileStore;
    const { countries } = storeToRefs(ProfileStore);
    
    const { profile, showDrawer } = toRefs(props);
    const { isMobile } = useSidebar();
    
    // Drawer
    const drawer_visibility = ref(showDrawer.value);
    const emit = defineEmits(['handleDrawer']);
    watch(drawer_visibility, bool => emit('handleDrawer', bool));
    
    // console.log(profile.value);
    
    // Username
    const current_username = computed(() => profile.value[0]?.value || '');
    const selected_username = ref(current_username.value || '');
    const is_username_current = computed(() => current_username.value === selected_username.value);
    
    // Astronaut Type
    const current_astronaut_type = computed(() => profile.value[2]?.value || '');
    const selected_astronaut_type = ref(profile.value[2]?.value || '');
    const is_current_type_selected = computed(() => current_astronaut_type.value === selected_astronaut_type.value);
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
    
    // Country
    const countries_dropdown = ref(false);
    const current_country = ref(profile.value[3]?.value || '');
    const old_selection = ref(current_country.value?.code);
    const selected_country = computed(() => countries.value?.find(country => country.code === old_selection.value));
    const is_current_country_selected = computed(() => current_country.value === selected_country.value);
    
    const selectCountry = (selectedValue: string) => {
        old_selection.value = selectedValue === old_selection.value ? '' : selectedValue
        countries_dropdown.value = false
    };
    
    const onSubmit = async() => {
        let payload = {};
        
        if(!is_username_current.value) {
            payload.username = selected_username.value;
        }
        
        if(!is_current_type_selected.value) {
            payload.astronaut_type = selected_astronaut_type.value;
        }
        
        if(!is_current_country_selected.value && selected_country.value) {
            payload.country = selected_country.value;
        }
        
        if(Object.keys(payload).length === 0) {
            displayToast('No changes detected.');
            return;
        }
        
        const success = await updateProfile(payload);
        
        if(success) {
            await getProfile();
            displayToast('Successfully updated profile.');
        } else {
            displayToast('Cannot update astronaut type.');
        }
    };
    
    onMounted(async() => {
        if(!countries.value?.length) {
            await getCountries();
        }
    });
</script>