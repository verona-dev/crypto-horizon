<template>
    <div class='page'>
        <section class='absolute inset-0 h-screen w-screen'>
            <SnowfallBg
                v-if='dark_mode'
                color='7393bc'
                class='absolute inset-0 !z-0'
                :min-radius='0.2'
                :max-radius='2'
                :speed='0.1'
                :quantity='150'
            />
        </section>
        
        <Card class='bg-card-dark p-8 xl:min-w-150 flex flex-col items-center border-none shadow-none'>
            <CardContent class='w-full flex flex-col items-center justify-center gap-6'>
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
                
                <div class='flex flex-col items-center gap-2'>
                    <FieldTitle class='text-3xl font-bold'>Welcome to Crypto Horizon</FieldTitle>
                    <FieldDescription>Don’t have an account? <NuxtLink to='/register'>Register</NuxtLink></FieldDescription>
                </div>
                
                <div class='flex flex-col w-full'>
                    <LoginOtp
                        v-if='is_otp_default'
                        @otp-step-change='onOtpStepChange'
                    />
                    
                    <Login
                        v-else
                        @password-step-change='onPasswordStepChange'
                    />
                </div>
                
                <div
                    v-if='show_toggle'
                    class='flex flex-col gap-8'
                >
                    <Field @click='onToggleSignupMode'>
                        <Button type='button' variant='link'>
                            <Button variant='ghost' size='icon'>
                                <NuxtIcon
                                    name='ph:arrows-left-right'
                                    size='18'
                                />
                            </Button>
                            {{ is_otp_default ? 'Use password login instead' : 'Use OTP login instead' }}
                        </Button>
                    </Field>
                    
                    <FieldSeparator>Or continue with</FieldSeparator>
                    
                    <LoginOAuth />
                    
                    <FieldDescription class='text-center'>
                        By clicking continue, you agree to our <a href='#'>Terms of Service</a>
                        and <a href='#'>Privacy Policy</a>.
                    </FieldDescription>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup>
    import { Button } from '@/components/ui/button/index';
    import { Card, CardContent } from '~/components/ui/card';
    import { Field, FieldDescription, FieldSeparator, FieldTitle } from '@/components/ui/field/index';
    import Login from '@/components/auth/Login.vue';
    import LoginOtp from '@/components/auth/LoginOtp.vue';
    import LoginOAuth from '@/components/auth/LoginOAuth.vue';
    import { Skeleton } from '@/components/ui/skeleton/index';
    import { SnowfallBg } from '~/components/ui/snowfall-bg';
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    const is_otp_default = ref(true);
    const onToggleSignupMode = () => is_otp_default.value = !is_otp_default.value;
    
    const otp_stepper = ref(1);
    const password_stepper = ref(1);
    
    const show_toggle = computed(() => otp_stepper.value === 1 && password_stepper.value === 1);
    const onOtpStepChange = otpStepIndex => otp_stepper.value = otpStepIndex;
    const onPasswordStepChange = passwordStepIndex => password_stepper.value = passwordStepIndex;
    
    definePageMeta({
        middleware: 'auth',
    });
</script>
