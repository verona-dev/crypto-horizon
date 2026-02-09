<template>
    <div class='bg-background flex flex-col items-center justify-center gap-7 p-6 md:p-10 w-full max-w-xl'>
        <div class='flex flex-col items-center gap-3 text-center font-medium'>
            <!--  Logo  -->
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1766403245/astronaut-cartoon_tnp9t4.gif'
                alt='crypto horizon login logo'
                class='w-44 h-44 rounded-full select-none self-center p-1.5 border-2 border-secondary'
                :custom='true'
                v-slot='{ src, isLoaded, imgAttrs }'
                preload
            >
                <img
                    v-if='isLoaded'
                    v-bind='imgAttrs'
                    :src='src'
                >
                
                <Skeleton
                    v-else
                    class='w-44 h-44 rounded-full self-center'
                />
            </NuxtImg>
            
            <span class='sr-only'>Crypto Horizon</span>
            
            <h1 class='text-3xl font-bold'>
                Welcome to Crypto Horizon
            </h1>
            
            <FieldDescription>
                Already have an account? <a href='/login'>Login</a>
            </FieldDescription>
        </div>
        
        <SignupForm />
    </div>
</template>

<script setup>
    import SignupForm from '@/components/auth/SignupForm.vue';
    import { FieldDescription } from '@/components/ui/field/index.ts';
    import { Skeleton } from '@/components/ui/skeleton/index.ts';
</script>
