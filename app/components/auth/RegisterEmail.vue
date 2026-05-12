<template>
    <Form
        v-slot='{ meta, validate }'
        as=''
        keep-values
        :validation-schema='validation_schema'
    >
        <Stepper
            v-slot='{ nextStep, modelValue }'
            v-model='current_step'
            class='block'
        >
            <form
                @submit.prevent='() => validate()'
                class='flex flex-col gap-8'
            >
                <div class='flex flex-col gap-6'>
                    <!--   Stepper Title   -->
                    <div
                        v-for='step in steps'
                        :key='step.step'
                    >
                        <div
                            v-if='current_step === step.step'
                            class='flex flex-col items-center gap-2'
                        >
                            <FieldTitle class='text-3xl font-bold' v-html='step.title'></FieldTitle>
                            <FieldDescription v-if='step.description' v-html='step.description'></FieldDescription>
                        </div>
                    </div>
                    
                    <!--   Stepper Body   -->
                    <FieldGroup :class='{ "mx-auto gap-10" : current_step === 2}'>
                        <!--  Step 1: Email input  -->
                        <template v-if='current_step === 1'>
                            <FormField
                                v-slot='{ componentField }'
                                v-model='email'
                                name='email'
                                :validateOnBlur='false'
                                :validateOnChange='false'
                            >
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    
                                    <FormControl>
                                        <Input
                                            v-bind='componentField'
                                            type='email'
                                            placeholder='Enter your email'
                                            class='dark:bg-blue-bunker/75'
                                            required
                                        />
                                    </FormControl>
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--   Resend email   -->
                        <template v-if='current_step === 2'>
                            <VerificationSent @vue:mounted='startCountdown' />
                            
                            <div class='flex flex-col gap-2 text-sm text-center text-muted-foreground'>
                                <span>Didn't get the email?&nbsp;</span>
                                
                                <div>
                                    <span
                                        @click='onResendEmail()'
                                        class='font-bold underline cursor-pointer'
                                    >Resend email</span>
                                    
                                    <span v-if='remaining !== 0'>&nbsp;{{ remaining }}s</span>
                                </div>
                            </div>
                            
                            <!--   Back button   -->
                            <Button
                                variant='link'
                                size='sm'
                                @click='current_step = 1'
                            >
                                Back
                            </Button>
                        </template>
                    </FieldGroup>
                </div>
                
                <!--   Stepper Buttons   -->
                <template v-if='current_step === 1'>
                    <Button
                        @click='onCreateAccount(nextStep)'
                        :type='meta.valid ? "button" : "submit"'
                        class='w-full disabled:opacity-75'
                        size='lg'
                        :disabled='!meta.valid'
                    >
                        <Spinner v-if='loading' class='animate-spin' />
                        <span>Create Account</span>
                    </Button>
                </template>
            </form>
        </Stepper>
    </Form>
</template>

<script setup lang='ts'>
    import * as z from 'zod';
    import { Button } from '@/components/ui/button';
    import { FieldTitle, FieldDescription, FieldGroup } from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { toTypedSchema } from '@vee-validate/zod';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper } from '@/components/ui/stepper';
    import { toast } from 'vue-sonner';
    import { useCountdown } from '@vueuse/core';
    import VerificationSent from '@/components/auth/VerificationSent.vue';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { loginOtp } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    // Stepper
    const validation_schema = toTypedSchema(
        z.object({
            email: z.string().email(),
        })
    );
    
    const current_step = ref(1);
    const emit = defineEmits(['otpStepChange']);
    watch(current_step, () => emit('otpStepChange', current_step.value));
    
    const steps = [
        {
            step: 1,
            title: '',
            description: '',
        },
        {
            step: 2,
            title: 'Verify Your Account',
            description: '',
        },
    ];
    
    // Email
    const email = ref('');
    
    const onCreateAccount = async(nextStep: any) => {
        const { error } = await loginOtp(email.value);
        
        if (error) {
            return toast.error(error.message);
        }
        
        current_step.value = 2;
        
        nextStep && nextTick(() => nextStep());
    };
    
    const onResendEmail = async() => {
        // Supabase resend-registration uses the same route for otp register/login
        const { error } = await loginOtp(email.value);
        
        if (error) {
            return toast.error(error.message);
        };
        
        startCountdown();
    };
    
    // Countdown
    const countdown_seconds = ref(59);
    const { remaining, start } = useCountdown(countdown_seconds);
    const startCountdown = () => start(countdown_seconds);
</script>