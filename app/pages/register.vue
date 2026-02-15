<template>
    <div class='bg-background flex flex-col items-center justify-center gap-4 p-6 border md:p-0'>
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
        
        <div class='flex flex-col gap-4 w-full md:w-md lg:w-lg'>
            <SignupOtp
                v-if='otp_signup'
                @otp-step-change='onOtpStepChange'
            />
            
            <SignupPassword v-else />
        </div>
        
        <div>
            <Field>
                <Button
                    @click='onToggleSignupMode'
                    type='button'
                    variant='link'
                >
                    
                    {{ otp_signup ? 'Use password signup instead' : 'Use OTP signup instead' }}
                </Button>
            </Field>
        </div>
        
        <div
            v-if='show_toggle'
            class='flex flex-col gap-8 w-full md:w-md lg:w-lg'
        >
            
            <FieldSeparator>Or</FieldSeparator>
            
            <SignupSocials />
            
            <FieldDescription class='px-6 text-center'>
                By clicking continue, you agree to our <a href='#'>Terms of Service</a>
                and <a href='#'>Privacy Policy</a>.
            </FieldDescription>
        </div>
    </div>
</template>

<script setup>
    import { Field, FieldDescription, FieldSeparator } from '@/components/ui/field/index.ts';
    import { Skeleton } from '@/components/ui/skeleton/index.ts';
    import SignupPassword from '@/components/auth/SignupPassword.vue';
    import SignupOtp from '@/components/auth/SignupOtp.vue';
    import SignupSocials from '@/components/auth/SignupSocials.vue';
    import { Button } from '@/components/ui/button/index.ts';
    
    const otp_signup = ref(true);
    const onToggleSignupMode = () => otp_signup.value = !otp_signup.value;
    
    const otp_stepper = ref(1);
    const show_toggle = computed(() => otp_stepper.value === 1);
    const onOtpStepChange = otpStepIndex => otp_stepper.value = otpStepIndex;
</script>
