<template>
    <Form
        v-slot='{ meta, validate, setFieldError }'
        as=''
        keep-values
        :validation-schema='toTypedSchema(formSchema[stepIndex - 1] || z.object({}))'
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
                <div class='flex flex-col gap-4'>
                    <!--   Stepper Title   -->
                    <div
                        v-for='(step, index) in steps'
                        :key='step.step'
                    >
                        <div
                            v-if='stepIndex === step.step'
                            class='flex flex-col items-center gap-2'
                        >
                            <FieldTitle class='text-3xl font-bold' v-html='step.title'></FieldTitle>
                            <FieldDescription v-if='step.description' v-html='step.description'></FieldDescription>
                        </div>
                        
                        <!--
                        <div v-if='stepIndex === 1' class='flex flex-col items-center gap-2'>
                            <h1 class='text-3xl font-bold'>Welcome!</h1>
                            <FieldDescription>Already have an account? <a href='/login'>Login</a></FieldDescription>
                        </div>
                        
                        <div v-if='stepIndex === 2' class='flex flex-col items-center gap-2'>
                            <h1 class="text-3xl font-bold">Enter verification code</h1>
                            <FieldDescription>We sent a 6-digit code to your email address</FieldDescription>
                        </div>
                        
                        <div v-if='stepIndex === 3' class='flex flex-col items-center gap-2'>
                            <h1 class="text-3xl font-bold">Welcome back!</h1>
                            <FieldDescription>Redirecting...</FieldDescription>
                        </div>
                        -->
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
                                    <LockKeyhole v-if='state === "active" && stepIndex === 2' />
                                    <Dot v-if='state === "inactive"' />
                                </Button>
                            </StepperTrigger>
                        </StepperItem>
                    </div>
                    
                    <!--   Stepper Body   -->
                    <div :class='{ "mx-auto" : stepIndex === 2}'>
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
                        
                        <!--  Step 2: OTP Pin Input  -->
                        <template v-if='stepIndex === 2'>
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
                                                        class='h-12 w-12 mx-1 text-xl font-bold font-satoshi rounded-lg border'
                                                        :index='index'
                                                    />
                                                </template>
                                            </PinInputGroup>
                                            
                                            <FieldDescription class='mx-auto'>Didn't receive the code?
                                                <span
                                                    @click='() => onResendEmail(setFieldError)'
                                                    class='font-bold underline cursor-pointer'
                                                >
                                                    Resend
                                                </span>
                                                
                                                <span v-if='remaining !== 0'>&nbsp;available in {{ remaining }}.</span>
                                            </FieldDescription>
                                        </PinInput>
                                    </FormControl>
                                    
                                    <!--
                                    <FormMessage />
                                    -->
                                </FormItem>
                            </FormField>
                        </template>
                    </div>
                </div>
                
                <!--   Stepper Buttons   -->
                <div class='flex !flex-col'>
                    <div v-if='stepIndex === 1'>
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
                    </div>
                    
                    <Button
                        v-if='stepIndex === 2'
                        :disabled='joined_otp_input.length !== 8'
                        @click="() => onVerifyOtp(setFieldError, nextStep)"
                        type='submit'
                    >
                        Verify
                    </Button>
                </div>
            </form>
        </Stepper>
    </Form>
</template>

<script setup lang='ts'>
    import { Button } from '@/components/ui/button';
    import { Field, FieldTitle, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
    import { Input } from '@/components/ui/input';
    // import { h } from 'vue';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as z from 'zod';
    import { useForm } from 'vee-validate';
    import { Check, X, Dot, Mail, LockKeyhole } from 'lucide-vue-next';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { PinInput, PinInputGroup, PinInputSlot } from '~/components/ui/pin-input';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@/components/ui/stepper';
    import { useCountdown } from '@vueuse/core';
    
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp, verifyOtp } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    // Stepper
    const formSchema = [
        z.object({ email: z.string().email() }), // Step 1
        z.object({}), // Step 2 (OTP handled manually)
        z.object({
            password: z.string().min(8, "Password must be at least 8 chars"),
            confirmPassword: z.string(),
        }).refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        }), // Step 3
    ];
    
    const stepIndex = ref(2);
    const steps = [
        {
            step: 1,
            title: 'Welcome!',
            description: 'Already have an account? <a href="/login">Login</a>',
        },
        {
            step: 2,
            title: 'Enter verification code',
            description: 'We sent a 6-digit code to your email address',
        },
        {
            step: 3,
            title: 'Logged in!',
            description: 'Redirecting...',
        },
    ];
    
    const emit = defineEmits(['stepChange']);
    
    watch(stepIndex, (newVal, oldVal) => {
        console.log(newVal);
        emit('stepChange', stepIndex.value)
    });
    
    // Email
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
    
    // OTP
    const otp_input = ref([]);
    const joined_otp_input = computed(() => otp_input.value?.join(''));
    const onVerifyOtp = async (setFieldError: any, nextStep: any) => {
        try {
            const { data, error } = await verifyOtp({ email: email.value, otpCode: joined_otp_input.value });
            
            if (error) {
                const errorMessage = error.message || 'Verification failed';
                setFieldError('otp', errorMessage);
                setTimeout(() => {
                    setFieldError('otp', '');
                }, 10000);
                return false;
            }
            
            if (data?.session?.access_token) {
                await onLoggedIn();
                return;
            }
            
            loading.value = false;
            
            return true;
        } catch (error: any) {
            const errorMessage = error.message || 'Verification failed';
            setFieldError('otp', errorMessage);
            setTimeout(() => {
                setFieldError('otp', '');
            }, 10000);
            loading.value = false;
            return false;
        }
    };
    
    // Success
    const onLoggedIn = async() => {
        resetState();
        reloadNuxtApp();
    };
    
    // Countdown
    const countdownSeconds = ref(60);
    const { remaining, start } = useCountdown(countdownSeconds);
    const startCountdown = () => start(countdownSeconds);
    
    const resetState = () => {
        otp_input.value = [];
        setFieldError('email', '');
        setFieldError('otp', '');
    };
</script>