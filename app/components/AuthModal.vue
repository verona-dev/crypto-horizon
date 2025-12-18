<template>
    <Dialog v-model:open='authModal'>
        <DialogContent class='p-10 sm:max-w-150 flex flex-col !gap-12'>
            <DialogHeader class='flex flex-col gap-6'>
                <!--   Title   -->
                <div>
                    <DialogTitle class='text-4xl'>Authenticate</DialogTitle>
                    <DialogDescription>
                        Sign in via OTP code with your email below.
                    </DialogDescription>
                </div>
                
                <!--   Email input   -->
                <form
                    class='row flex-center flex'
                    @submit.prevent='onEmailSubmit'
                >
                    <div class='w-full'>
                        <Input
                            class='inputField !w-full focus-visible:border-foreground/75 focus-visible:ring-[0px] py-5'
                            placeholder='Enter email'
                            type='email'
                            :model-value='email'
                        />
                    </div>
                </form>
            </DialogHeader>
            
            <DialogFooter class='flex !flex-col gap-4 items-center'>
                <!--   Submit buttons   -->
                <div class='w-80 mx-auto flex flex-col gap-4'>
                    <Button @click='onEmailSubmit' class='py-5'>
                        <Spinner v-if='loading' class='animate-spin' />
                        <span>{{ button_label }}</span>
                    </Button>
                    
                    <DialogClose>
                        <Button variant='outline' class='w-full py-5'>Cancel</Button>
                    </DialogClose>
                </div>
                
                <!--   Status  -->
                <div class='h-4'>
                    <p v-if='status_label_visible' class='text-destructive text-sm'>
                        {{ status_label_computed }}
                    </p>
                </div>
                
                <!--   OTP Pin Input   -->
                <PinInput
                    v-if='show_otp_input'
                    id='pin-input'
                    v-model='otp_input'
                    placeholder='○'
                    @complete='onOtpSubmit'
                    otp
                    required
                >
                    <PinInputGroup class='gap-1'>
                        <template v-for='(id, index) in 8' :key='id'>
                            <PinInputSlot
                                class='rounded-md border'
                                :index='index'
                            />
                            <template v-if='index !== 7'>
                                <PinInputSeparator />
                            </template>
                        </template>
                    </PinInputGroup>
                </PinInput>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
    import { Input } from '~/components/ui/input';
    import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from '~/components/ui/pin-input';
    import { Spinner } from '~/components/ui/spinner';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp, verifyOtp } = AuthStore;
    const { loading, authModal } = storeToRefs(AuthStore);
    
    const email = ref('');
    const status_label = ref('');
    const status_label_computed = computed(() => status_label.value);
    const status_label_visible = ref(false);
    
    const onEmailSubmit = async() => {
        if (!email.value) {
            alert('Please enter a valid email');
            return;
        }
        
        const { error } = await signInWithOtp(email.value);
        
        if (error) {
            status_label_visible.value = true;
            status_label.value = error.message;
            
            setTimeout(() => {
                status_label_visible.value = false;
            }, 5000);
        } else {
            status_label_visible.value = true;
            status_label.value = 'Check your email';
            show_otp_input.value = true;
        }
    };
    
    const button_label = computed(() => {
        if(loading.value) return 'Sending...';
        else return 'Submit';
    });
    
    const otp_input = ref([]);
    const show_otp_input = ref(false);
    const onOtpSubmit = async() => {
        const joined_otp_input = otp_input.value.join('');
        const { data, error } = await verifyOtp(email.value, joined_otp_input);
        
        if(data) {
            console.log(data);
        }
        
        if(error) {
            console.log(error);
        }
    };
</script>