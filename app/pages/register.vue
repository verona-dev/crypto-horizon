<template>
    <Card class='bg-blue-bunker p-8 border-none mt-8 flex flex-col items-center'>
        <CardContent class='flex flex-col items-center justify-center gap-6'>
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
                <SignupOtp
                    v-if='otp_signup'
                    @otp-step-change='onOtpStepChange'
                />
                
                <SignupPassword
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
                        {{ otp_signup ? 'Use password signup instead' : 'Use OTP signup instead' }}
                    </Button>
                </Field>
                
                <FieldSeparator>Or</FieldSeparator>
                
                <SignupSocials />
                
                <FieldDescription class='text-center'>
                    By clicking continue, you agree to our <a href='#'>Terms of Service</a>
                    and <a href='#'>Privacy Policy</a>.
                </FieldDescription>
            </div>
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
    
    const otp_signup = ref(false);
    const onToggleSignupMode = () => otp_signup.value = !otp_signup.value;
    
    const otp_stepper = ref(1);
    const password_stepper = ref(1);
    
    const show_toggle = computed(() => {
        return otp_stepper.value === 1 && password_stepper.value === 1;
    });
    const onOtpStepChange = otpStepIndex => otp_stepper.value = otpStepIndex;
    const onPasswordStepChange = passwordStepIndex => password_stepper.value = passwordStepIndex;
</script>
