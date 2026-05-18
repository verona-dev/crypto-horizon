<template>
    <div class='grid min-h-svh min-w-svw max-w-5xl lg:grid-cols-2'>
        <Card class='bg-card-dark flex justify-center items-center !rounded-none !shadow-none border-t-none border-l-none border-b-none border-r-muted hover:border-muted'>
            <CardContent class='w-full max-w-lg flex flex-col items-center justify-center gap-4 pb-16'>
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
                
                <div class='flex flex-col w-full gap-12'>
                    <div v-if='first_step' class='flex flex-col items-center gap-2'>
                        <FieldTitle class='text-3xl font-bold'>Welcome</FieldTitle>
                        <FieldDescription>Don’t have an account? <NuxtLink to='/register'>Register</NuxtLink></FieldDescription>
                    </div>
                    
                    <LoginOtp
                        v-if='is_otp_default'
                        @otp-step-change='onOtpStepChange'
                    />
                    
                    <LoginEmailPassword
                        v-else
                        @password-step-change='onPasswordStepChange'
                    />
                </div>
                
                <div
                    v-if='first_step'
                    class='flex flex-col gap-8 w-full'
                >
                    <Field @click='onToggleSignupMode'>
                        <Button
                            variant='link'
                            size='lg'
                        >
                            <NuxtIcon
                                name='ph:arrows-left-right'
                                size='18'
                            />
                            {{ is_otp_default ? 'Login with password' : 'Use OTP login instead' }}
                        </Button>
                    </Field>
                    
                    <FieldSeparator>Or continue with</FieldSeparator>
                    
                    <LoginOAuth />
                    
                    <!--
                    <FieldDescription class='text-center'>
                        By clicking continue, you agree to our <a href='#'>Terms of Service</a>
                        and <a href='#'>Privacy Policy</a>.
                    </FieldDescription>
                    -->
                </div>
            </CardContent>
        </Card>
        
        <div class='relative hidden lg:flex w-full h-full flex-col items-center justify-center overflow-hidden'>
             <hspan class="text-8xl w-full select-none pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
                 Crypto Horizon
             </hspan>
            
            <div class="grid place-content-center p-6 w-full">
                <IconCloud :images="imageUrls" />
            </div>
            
            <SnowfallBg
                v-if='dark_mode'
                color='7393bc'
                class='absolute inset-0 !min-h-lvh !min-w-full'
                :min-radius='0.2'
                :max-radius='2'
                :speed='0.1'
                :quantity='150'
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Button } from '@/components/ui/button/index';
    import { Card, CardContent } from '~/components/ui/card';
    import { Field, FieldDescription, FieldSeparator, FieldTitle } from '@/components/ui/field/index';
    import LoginEmailPassword from '@/components/auth/LoginEmailPassword.vue';
    import LoginOtp from '@/components/auth/LoginOtp.vue';
    import LoginOAuth from '@/components/auth/LoginOAuth.vue';
    import { Skeleton } from '@/components/ui/skeleton/index';
    import { SnowfallBg } from '~/components/ui/snowfall-bg';
    import { IconCloud } from '~/components/ui/icon-cloud';
    
    const slugs = [
        "bitcoin",
        "ethereum",
        "cardano",
        "polkadot",
        "polygon",
        "solana",
        "tron",
        "base",
        "bnbchain",
        "arbitrum",
        "avalanche",
        "optimism",
        "stellar",
        "near",
        "kava",
        "hedera",
        "xrp",
        "internetcomputer",
        "litecoin",
        "dogecoin",
    ];
    
    const imageUrls = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    const is_otp_default = ref(true);
    const onToggleSignupMode = () => is_otp_default.value = !is_otp_default.value;
    
    const otp_stepper = ref(1);
    const password_stepper = ref(1);
    
    const first_step = computed(() => otp_stepper.value === 1 && password_stepper.value === 1);
    const onOtpStepChange = otpStepIndex => otp_stepper.value = otpStepIndex;
    const onPasswordStepChange = passwordStepIndex => password_stepper.value = passwordStepIndex;
    
    definePageMeta({
        middleware: 'auth',
        // layout: false,
    });
</script>
