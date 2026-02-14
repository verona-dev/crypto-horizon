<template>
    <Form
        v-slot='{ meta, validate, setFieldError }'
        as=''
        keep-values
        :validation-schema='validationSchema'
    >
        <Stepper
            v-slot='{ isPrevDisabled, nextStep, prevStep, modelValue }'
            v-model='stepIndex'
            class='block'
        >
            <form
                @submit.prevent='() => validate()'
                class='flex flex-col gap-6'
            >
                <div
                    class='flex flex-col gap-4'
                    :class='{"gap-8" : stepIndex === 2}'
                >
                    <!--   Stepper Title   -->
                    <div
                        v-for='(step, index) in steps'
                        :key='step.step'
                    >
                        <div
                            v-if='stepIndex === step.step'
                            class='flex flex-col items-center gap-4'
                        >
                            <FieldTitle class='text-3xl font-bold' v-html='step.title'></FieldTitle>
                            <FieldDescription v-if='step.description' v-html='step.description'></FieldDescription>
                        </div>
                    </div>
                    
                    <!--   Stepper Navigation  -->
                    <div class='flex w-full items-start gap-2'>
                        <StepperItem
                            v-for='(step, index) in steps'
                            :key='step.step'
                            v-slot='{ state }'
                            class='relative flex w-full flex-col items-center justify-center'
                            :step='step.step'
                        >
                            <StepperSeparator
                                v-if='step.step !== steps[steps.length - 1]?.step'
                                class='absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary'
                            />
                            
                            <StepperTrigger as-child>
                                <Button
                                    :variant='state === "completed" || state === "active" ? "default" : "outline"'
                                    size='icon'
                                    class='z-10 rounded-full shrink-0'
                                    :class='[state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]'
                                    :disabled="index >= (modelValue || 0)"
                                >
                                    <Check v-if='state === "completed"' class='size-5' />
                                    <Mail v-if='state === "active" && stepIndex === 1' />
                                    <UserLock v-if='state === "active" && stepIndex === 2' />
                                    <Dot v-if='state === "inactive"' />
                                </Button>
                            </StepperTrigger>
                        </StepperItem>
                    </div>
                    
                    <!--   Stepper Body   -->
                    <div :class='{ "mx-auto1" : stepIndex === 2}'>
                        <!--  Step 1: Email input  -->
                        <template v-if='stepIndex === 1'>
                            <FormField
                                v-slot='{ componentField }'
                                v-model='email'
                                name='email'
                            >
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    
                                    <FormControl>
                                        <Input
                                            v-bind='componentField'
                                            type='email'
                                            placeholder='name@example.com'
                                            @input='validate()'
                                        />
                                    </FormControl>
                                    
                                    <!--
                                    <FieldDescription class='text-xs'>
                                        New astronaut? We’ll automatically create an account on first sign-up.
                                    </FieldDescription>
                                    -->
                                    
                                    <!--
                                    <FormMessage />
                                    -->
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--  Step 2: Verify your account -->
                        <template v-if='stepIndex === 2'>
                            <FormField name='verify'>
                                <FormItem class='flex flex-col items-center gap-8'>
                                    <div class='flex flex-col items-center gap-2'>
                                        <p>We sent a verification link to your email address.</p>
                                        <p>Please check your inbox and click the link to verify your account.</p>
                                    </div>
        
                                   
                                    <NuxtLink to='/'>
                                        <Button variant='outline' size='lg'>
                                            <NuxtIcon
                                                name='ph:house'
                                                size='17'
                                            />
                                            Go home
                                        </Button>
                                    </NuxtLink>
                                </FormItem>
                            </FormField>
                        </template>
                    </div>
                </div>
                
                <!--   Stepper Buttons   -->
                <template v-if='stepIndex === 1' class='flex !flex-col'>
                    <Button
                        @click='() => onEmailSubmit(setFieldError, nextStep)'
                        :type='meta.valid ? "button" : "submit"'
                        class='w-full'
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
    import { Button } from '@/components/ui/button';
    import { Field, FieldTitle, FieldDescription, FieldGroup } from '@/components/ui/field';
    import { Input } from '@/components/ui/input';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as z from 'zod';
    import { useForm } from 'vee-validate';
    import { Check, X, Dot, Mail, UserLock } from 'lucide-vue-next';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@/components/ui/stepper';
    import { useCountdown } from '@vueuse/core';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    // Stepper
    const validationSchema = toTypedSchema(
        z.object({
            email: z.string().email('Invalid email'),
        })
    );
    
    const stepIndex = ref(1);
    const steps = [
        {
            step: 1,
            title: 'Welcome!',
            description: 'Already have an account? <a href="/login">Login</a>',
        },
        {
            step: 2,
            title: 'Verify Your Account',
            description: '',
        },
    ];
    
    const emit = defineEmits(['otpStepChange']);
    
    watch(stepIndex, () => {
        emit('otpStepChange', stepIndex.value)
    });
    
    // Email
    const email = ref('');
    const { setFieldError } = useForm();
    
    const onEmailSubmit = async(setFieldError: any, nextStep: any) => {
        const { error } = await signInWithOtp(email.value);
        
        if (error) {
            setFieldError('email', `Email not sent: ${error.message}`);
            setTimeout(() => {
                setFieldError('email', '');
            }, 10000);
            return false;
        }
        
        // resetFieldErrors();
        nextStep && nextTick(() => nextStep());
        
        return true;
    };
    
    const onResendEmail = async(setFieldError: any) => {
        const { error } = await signInWithOtp(email.value);
        
        if (error) {
            // set the field error to "otp" since we are on step-2 (otp fields)
            setFieldError('otp', `Resend failed: ${error.message}`);
            setTimeout(() => {
                setFieldError('otp', '');
            }, 10000);
            return false;
        }
        
        startCountdown();
        
        return true;
    };
    
    // Success
    const resetForm = async() => {
        resetState();
        reloadNuxtApp();
    };
    
    // Countdown
    const countdownSeconds = ref(60);
    const { remaining, start } = useCountdown(countdownSeconds);
    const startCountdown = () => start(countdownSeconds);
    
    const resetState = () => {
        setFieldError('email', '');
    };
</script>