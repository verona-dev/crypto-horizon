<template>
    <Dialog v-model:open='authModal' class='flex items-center gap-2'>
        <DialogContent class='p-10 sm:max-w-150 h-150 flex flex-col'>
            <!--   Stepper   -->
            <Form
                v-slot='{ meta, validate, setFieldError, errors }'
                as=''
                keep-values
                :validation-schema='toTypedSchema(formSchema[stepIndex - 1] || z.object({}))'
                class='w-full h-full'
            >
                <Stepper
                    v-slot='{ isPrevDisabled, nextStep, prevStep, modelValue }'
                    v-model='stepIndex'
                    class='block w-full h-full'
                >
                    <form
                        @submit.prevent='() => validate()'
                        class='flex flex-col gap-8 w-full h-full'
                    >
                        <DialogHeader class='flex flex-col gap-16 h-full'>
                            <!--   Stepper Title   -->
                            <div class='flex flex-col gap-2'>
                                <DialogTitle class='text-4xl'>
                                    <span v-if='stepIndex === 1'>Authenticate</span>
                                    <span v-if='stepIndex === 2'>Verify OTP</span>
                                </DialogTitle>
                                
                                <DialogDescription>
                                    <span v-if='stepIndex === 1'>Sign in via OTP code with your email below.</span>
                                    <span v-if='stepIndex === 2'>Please enter the eight digit verification code we sent to {{ email }}.</span>
                                
                                </DialogDescription>
                            </div>
                            
                            <!--   Stepper Navigation   -->
                            <div class='flex items-center gap-2'>
                                <StepperItem
                                    v-for='(step, index) in steps'
                                    :key='step.step'
                                    v-slot='{ state }'
                                    class='relative flex w-full flex-col items-center justify-center'
                                    :step='step.step'
                                >
                                    <StepperSeparator
                                        v-if='step.step !== steps[steps.length - 1].step'
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
                                    
                                    <div class='mt-5 flex flex-col items-center text-center'>
                                        <StepperTitle
                                            :class='[state === "active" && "text-primary"]'
                                            class='text-sm font-semibold transition lg:text-base'
                                        >
                                            {{ step.title }}
                                        </StepperTitle>
                                        
                                        <StepperDescription
                                            :class='[state === "active" && "text-primary"]'
                                            class='sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm'
                                        >
                                            {{ step.description }}
                                        </StepperDescription>
                                    </div>
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
                                            <FormControl>
                                                <Input
                                                    v-bind='componentField'
                                                    type='email'
                                                    class='inputField !w-full focus-visible:border-foreground/75 focus-visible:ring-[0px] py-5'
                                                    placeholder='Enter email'
                                                    @input='validate()'
                                                />
                                            </FormControl>
                                            
                                            <FormMessage />
                                            
                                            <span class='text-xxs text-muted-foreground'>Signing in will automatically create an account if your email isn’t already registered.</span>
                                        </FormItem>
                                    </FormField>
                                </template>
                                
                                <!--  Step 2: OTP Code  -->
                                <template v-if='stepIndex === 2'>
                                    <!--   OTP Pin Input   -->
                                    <PinInput
                                        v-model='otp_input'
                                        @complete='onOtpSubmit'
                                        id='pin-input'
                                        placeholder=''
                                        class='flex flex-col items-start gap-4'
                                        otp
                                        required
                                        @vue:mounted='startCountdown'
                                    >
                                        <PinInputGroup class='gap-1'>
                                            <template v-for='(id, index) in 8' :key='id'>
                                                <PinInputSlot
                                                    class='h-10 w-10 rounded-md border focus-visible:border-foreground/75 focus-visible:ring-[0px]'
                                                    :index='index'
                                                />
                                                <template v-if='index !== 7'>
                                                    <PinInputSeparator />
                                                </template>
                                            </template>
                                        </PinInputGroup>
                                        
                                        <span v-if='remaining !== 0' class='text-xs'>
                                            Resend available in {{ remaining }} seconds.
                                        </span>
                                    </PinInput>
                                </template>
                            </div>
                        </DialogHeader>
                        
                        <!--   Stepper Buttons   -->
                        <DialogFooter class='flex !flex-col'>
                            <div v-if='stepIndex === 1'>
                                <Button
                                    @click='() => onEmailSubmit(setFieldError, errors, nextStep, meta)'
                                    :type='meta.valid ? "button" : "submit"'
                                    class='w-full'
                                    size='lg'
                                    :disabled='!meta.valid'
                                >
                                    <span>Send OTP Code</span>
                                </Button>
                            </div>
                            
                            <div v-else class='flex items-center justify-between mt-4'>
                                <Button
                                    :disabled='isPrevDisabled'
                                    :variant='stepIndex === 1 ? "outline": "link"'
                                    @click='prevStep()'
                                    size='lg'
                                >
                                    Back
                                </Button>
                                
                                <Button
                                    v-if='stepIndex === 2'
                                    @click='onOtpSubmit'
                                    type='submit'
                                    size='lg'
                                >
                                    Verify
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Stepper>
            </Form>
        </DialogContent>
    </Dialog>
</template>

<script lang='ts' setup>
    import { toTypedSchema } from '@vee-validate/zod';
    import * as z from 'zod';
    import { useForm } from 'vee-validate';
    import { Button } from '~/components/ui/button';
    import { Check, Dot, Mail, LockKeyhole } from 'lucide-vue-next';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '~/components/ui/input';
    import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from '~/components/ui/pin-input';
    import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
    import { toast } from 'vue-sonner';
    import { useCountdown } from '@vueuse/core';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    import { h } from 'vue';
    const AuthStore = useAuthStore();
    const { signInWithOtp, verifyOtp } = AuthStore;
    const { loading, authModal } = storeToRefs(AuthStore);
    
    // Stepper
    const formSchema = [
        z.object({
            email: z.string().email(),
        }),
    ];
    
    const stepIndex = ref(1);
    const steps = [
        {
            step: 1,
            title: '1. Enter your email',
            description: '',
        },
        {
            step: 2,
            title: '2. Enter OTP Code',
            description: '',
        },
    ];
    
    // Email
    const { setFieldError } = useForm();
    const email = ref('veronadev@tuta.io');
    const onEmailSubmit = async (setFieldError: any, errors: any, nextStep: any, meta: any) => {
        const { error } = await signInWithOtp(email.value);
        
        if (error) {
            setFieldError('email', error.message);
            
            setTimeout(() => {
                setFieldError('email', '');
            }, 5000);
            
            return false;
        }
        
        setFieldError('email', '');
        nextTick(() => nextStep());
        
        return true;
    };
    
    // OTP
    const otp_input = ref([]);
    const onOtpSubmit = async() => {
        loading.value = true;
        const joined_otp_input = otp_input.value.join('');
        const { data, error } = await verifyOtp(email.value, joined_otp_input);
        
        if(error) {
            console.error('OTP verification failed:', error);
            return;
        }
        
        if(data?.session?.access_token) {
            displayToast();
            resetState();
            console.log(data);
        }
        
        loading.value = false;
    };
    
    // Countdown
    const countdownSeconds = ref(60);
    const { remaining, start } = useCountdown(countdownSeconds);
    const startCountdown = () => start(countdownSeconds);
    
    const displayToast = () => {
        toast.promise(() => new Promise((resolve) => setTimeout(resolve, 750)), {
            success: () => 'Houston, we have a login!',
            error: () => 'We’re experiencing interference from a black hole. Check your connection and try again.',
            class: '!flex !gap-3',
            description: () => h('span', 'Welcome back, space traveler.'),
        });
    };
    
    const resetState = () => {
        authModal.value = false;
        otp_input.value = [];
        setFieldError('email', '');
    };
</script>