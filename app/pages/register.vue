<template>
    <Card class='bg-transparent flex flex-col !items-center justify-center gap-4 p-6 border-none'>
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
        
        <CardContent class='flex flex-col w-full'>
            <SignupOtp
                v-if='otp_signup'
                @otp-step-change='onOtpStepChange'
            />
            
            <SignupPassword v-else />
        </CardContent>
        
        <CardContent>
            <Field>
                <Button
                    @click='onToggleSignupMode'
                    type='button'
                    variant='link'
                >
                    
                    {{ otp_signup ? 'Use password signup instead' : 'Use OTP signup instead' }}
                </Button>
            </Field>
        </CardContent>
        
        <CardContent
            v-if='show_toggle'
            class='flex flex-col gap-8 w-full'
        >
            
            <FieldSeparator>Or</FieldSeparator>
            
            <SignupSocials />
            
            <FieldDescription class='text-center'>
                By clicking continue, you agree to our <a href='#'>Terms of Service</a>
                and <a href='#'>Privacy Policy</a>.
            </FieldDescription>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Button } from '@/components/ui/button/index';
    import { Card, CardContent } from '~/components/ui/card';
    import { Field, FieldDescription, FieldSeparator } from '@/components/ui/field/index';
    import SignupPassword from '@/components/auth/SignupPassword.vue';
    import SignupOtp from '@/components/auth/SignupOtp.vue';
    import SignupSocials from '@/components/auth/SignupSocials.vue';
    import { Skeleton } from '@/components/ui/skeleton/index';
    
    const otp_signup = ref(true);
    const onToggleSignupMode = () => otp_signup.value = !otp_signup.value;
    
    const otp_stepper = ref(1);
    const show_toggle = computed(() => otp_stepper.value === 1);
    const onOtpStepChange = otpStepIndex => otp_stepper.value = otpStepIndex;
</script>
