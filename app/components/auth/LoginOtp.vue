<template>
    <Form
        v-slot='{ meta, validate, setFieldError }'
        as=''
        keep-values
        :validation-schema='validation_schema'
    >
        <Stepper
            v-slot='{ nextStep, modelValue }'
            v-model='step_index'
            class='block'
        >
            <form
                @submit.prevent='() => validate()'
                class='flex flex-col gap-8'
            >
                <div class='flex flex-col gap-4'>
                    <!--   Stepper Title   -->
                    <div
                        v-for='step in steps'
                        :key='step.step'
                    >
                        <div
                            v-if='step_index === step.step'
                            class='flex flex-col items-center gap-2'
                        >
                            <FieldTitle class='text-3xl font-bold' v-html='step.title'></FieldTitle>
                            <FieldDescription v-if='step.description' v-html='step.description'></FieldDescription>
                        </div>
                    </div>
                    
                    <!--   Stepper Navigation  -->
                    <div class='flex gap-2 my-4'>
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
                                    <Mail v-if='state === "active" && step_index === 1' />
                                    <UserLock v-if='state === "active" && step_index === 2' />
                                    <User v-if='state === "active" && step_index === 3' />
                                    <Dot v-if='state === "inactive"' />
                                </Button>
                            </StepperTrigger>
                        </StepperItem>
                    </div>
                    
                    <!--   Stepper Body   -->
                    <FieldGroup :class='{ "mx-auto" : step_index === 2}'>
                        <!--  Step 1: Email input  -->
                        <template v-if='step_index === 1'>
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
                                            placeholder='name@example.com'
                                            class='dark:bg-blue-bunker/75'
                                            required
                                        />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--  Step 2: OTP Pin Input  -->
                        <template v-if='step_index === 2'>
                            <FormField name='otp'>
                                <FormItem>
                                    <FormLabel>OTP</FormLabel>
                                    
                                    <FormControl>
                                        <!--   OTP Pin Input   -->
                                        <PinInput
                                            v-model='otp_input'
                                            @complete='onVerifyOtp(setFieldError, nextStep)'
                                            id='pin-input'
                                            placeholder=''
                                            class='flex flex-col items-start gap-6'
                                            otp
                                            required
                                            @vue:mounted='startCountdown'
                                        >
                                            <PinInputGroup class='gap-1'>
                                                <template v-for='(id, index) in 8' :key='id'>
                                                    <PinInputSlot
                                                        class='h-12 w-12 text-xl font-bold font-satoshi rounded-md border'
                                                        :index='index'
                                                    />
                                                    <template v-if='index !== 7'>
                                                        <PinInputSeparator />
                                                    </template>
                                                </template>
                                            </PinInputGroup>
                                            
                                            <div class='otp-labels text-sm'>
                                                <span>Didn't get the email?&nbsp;</span>
                                                <span
                                                    @click='() => onResendEmail(setFieldError)'
                                                    class='font-bold underline cursor-pointer'
                                                >Click to resend</span>
                                                
                                                <span v-if='remaining !== 0'>&nbsp;available in {{ remaining }}.</span>
                                            </div>
                                        </PinInput>
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--  Step 3: Logged In  -->
                        <!--
                        <template v-if='step_index === 3'>
                            This window will close in 5s.
                        </template>
                        -->
                    </FieldGroup>
                </div>
                
                <!--   Stepper Buttons   -->
                <template v-if='step_index === 1'>
                    <Button
                        @click='() => onEmailSubmit(setFieldError, nextStep)'
                        :type='meta.valid ? "button" : "submit"'
                        class='w-full disabled:opacity-75'
                        size='lg'
                        :disabled='!meta.valid'
                    >
                        <Spinner v-if='loading' class='animate-spin' />
                        <span>Login</span>
                    </Button>
                </template>
            </form>
        </Stepper>
    </Form>
</template>

<script setup lang='ts'>
    import * as z from 'zod';
    import { Button } from '@/components/ui/button';
    import { Check, Dot, Mail, UserLock, User } from 'lucide-vue-next';
    import { FieldTitle, FieldDescription, FieldGroup } from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from '@/components/ui/pin-input';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@/components/ui/stepper';
    import { toTypedSchema } from '@vee-validate/zod';
    import {useCountdown} from '@vueuse/core';
    import {useForm} from 'vee-validate';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    
    const { loginOtp, verifyOtp } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    // Stepper
    const validation_schema = toTypedSchema(
        z.object({
            email: z.string().email(),
        })
    );
    
    const step_index = ref(1);
    const emit = defineEmits(['otpStepChange']);
    watch(step_index, () => emit('otpStepChange', step_index.value));
    const steps = [
        {
            step: 1,
            title: 'Welcome!',
            description: 'Don’t have an account? <NuxtLink to="/register">Register</a>',
        },
        {
            step: 2,
            title: 'Enter OTP',
            description: 'Please enter the eight digit verification code we sent to your email address',
        },
        {
            step: 3,
            title: 'Welcome back!',
            description: 'You are now logged in.',
        },
    ];
    
    // Email
    const { setFieldError } = useForm();
    const email = ref('');
    
    const onEmailSubmit = async(setFieldError: any, nextStep: any) => {
        const { error } = await loginOtp(email.value);
        
        if (error) {
            console.log(error)
            setFieldError('email', `${error.message}`);
            setTimeout(() => {
                setFieldError('email', '');
            }, 5000);
            return false;
        }
        
        nextStep && nextTick(() => nextStep());
        
        return true;
    };
    
    const onResendEmail = async(setFieldError: any) => {
        const { error } = await loginOtp(email.value);
        
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
    
    // OTP
    const otp_input = ref([]);
    
    const onVerifyOtp = async(setFieldError: any, nextStep:any) => {
        const joined_otp_input = otp_input.value?.join('');
        const result = await verifyOtp({ email: email.value, token: joined_otp_input});
        
        if(result?.error) {
            setFieldError('otp', `Verification failed: ${result.error.message}`);
            setTimeout(() => {
                setFieldError('otp', '');
            }, 10000);
            return false;
        }
        
        if(result?.data?.session?.access_token) {
            setTimeout(() => {
                onLoggedIn();
            }, 2500);
            nextStep && nextTick(() => nextStep());
        }
        
        loading.value = false;
        
        return true;
    };
    
    const onLoggedIn = async() => {
        reloadNuxtApp();
        resetState();
    };
    
    // Countdown
    const countdown_seconds = ref(60);
    const { remaining, start } = useCountdown(countdown_seconds);
    const startCountdown = () => start(countdown_seconds);
    
    const resetState = () => {
        otp_input.value = [];
        setFieldError('email', '');
        setFieldError('otp', '');
    };
</script>