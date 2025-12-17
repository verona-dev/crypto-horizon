<template>
    <Dialog v-model:open='authModal'>
        <DialogTrigger>Open</DialogTrigger>
        
        <DialogContent>
            <DialogHeader>
                <DialogTitle class='text-4xl'>Authenticate</DialogTitle>
                <DialogDescription>
                    Sign in via magic link with your email below.
                </DialogDescription>
                
                <form
                    class='row flex-center flex'
                    @submit.prevent='onHandleSubmit'
                >
                    <div class='col-6 form-widget'>
                        <input
                            v-model='email'
                            class='inputField'
                            type='email'
                            placeholder='Your email'
                        />
                    </div>
                </form>
            </DialogHeader>
            
            <DialogFooter class='w-96 mx-auto gap-4'>
                <DialogClose>
                    <Button variant='outline'>
                        Cancel
                    </Button>
                </DialogClose>
                
                <Button @click='onHandleSubmit'>Submit</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp } = AuthStore;
    
    // State
    const { loading, authModal } = storeToRefs(AuthStore);
    const email = ref('');
    
    const onHandleSubmit = async() => {
        await signInWithOtp(email.value);
    };
</script>