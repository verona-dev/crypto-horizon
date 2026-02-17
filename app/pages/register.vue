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
        
        <Card class='bg-transparent p-8 xl:min-w-150 flex flex-col items-center border-none shadow-none'>
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
                
                <div class='flex flex-col w-full'>
                    <RegisterOtp
                        v-if='is_otp_default'
                        @otp-step-change='onOtpStepChange'
                    />
                    
                    <Register
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
                            {{ is_otp_default ? 'Use password signup instead' : 'Use OTP signup instead' }}
                        </Button>
                    </Field>
                    
                    <FieldSeparator>Or</FieldSeparator>
                    
                    <RegisterOAuth />
                    
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
    import { Field, FieldDescription, FieldSeparator } from '@/components/ui/field/index';
    import Register from '@/components/auth/Register.vue';
    import RegisterOtp from '@/components/auth/RegisterOtp.vue';
    import RegisterOAuth from '@/components/auth/RegisterOAuth.vue';
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
