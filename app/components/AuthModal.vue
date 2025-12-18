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
            
            <DialogFooter>
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
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
    import { Input } from '~/components/ui/input';
    import { Spinner } from '~/components/ui/spinner';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp } = AuthStore;
    const { loading, authModal } = storeToRefs(AuthStore);

    const email = ref('veronadev@tuta.io');
    const onEmailSubmit = async() => {
        await signInWithOtp(email.value);
    };
    
    const button_label = computed(() => {
        if(loading.value) return 'Sending...';
        else return 'Submit';
    });
</script>