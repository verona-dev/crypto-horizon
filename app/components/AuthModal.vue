<template>
    <Dialog
        v-model:open='authModal'
        class='flex items-center gap-2'
    >
        <DialogContent class='p-16 sm:max-w-150 flex flex-col gap-12 !rounded-xl [&>button:last-child]:hidden'>
            <DialogClose as-child>
                <Button
                    variant='ghost'
                    class='absolute top-4 right-4'
                >
                    <X class='size-5' />
                </Button>
            </DialogClose>
            
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
            
            <!--   Stepper   -->
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
                        class='flex flex-col gap-16'
                    >
                        <DialogHeader class='flex flex-col gap-8'>
                            <!--   Stepper Title   -->
                            <div class='flex flex-col gap-2'>
                                <DialogTitle class='text-4xl'>
                                    <span v-if='stepIndex === 1'>Welcome to Crypto Horizon</span>
                                    <span v-if='stepIndex === 2'>Enter OTP</span>
                                    <span v-if='stepIndex === 3'>Welcome Back!</span>
                                </DialogTitle>
                                
                                <DialogDescription>
                                    <span v-if='stepIndex === 1'>Enter your email to sign-up with a one-time password (OTP).</span>
                                    <span v-if='stepIndex === 2'>Please enter the eight digit verification code we sent to {{ email }}.</span>
                                    <span v-if='stepIndex === 3'>You are now logged in.</span>
                                </DialogDescription>
                            </div>
                            
                            <Separator class='!p-0 !m-0' />
                            
                            <!--   Stepper Navigation  -->
                            <!--   hidden instead of removal because the stepper component breaks  -->
                            <div class='flex items-center gap-2 hidden'>
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
                                                    class='inputField !w-full focus-visible:border-foreground/75 focus-visible:ring-[0px] py-5'
                                                    placeholder='name@example.com'
                                                    @input='validate()'
                                                />
                                            </FormControl>
                                            
                                            <!-- <span class='text-xxs text-muted-foreground'>Signing in will automatically create an account if your email isn’t already registered.</span> -->
                                            <span class='text-xxs text-muted-foreground'>New astronaut? We’ll automatically create an account on first sign-up.</span>
                                            
                                            <FormMessage />
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
                                                                class='h-12 w-12 text-xl font-bold font-satoshi rounded-md border focus-visible:border-foreground/75 focus-visible:ring-[0px]'
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
                                <template v-if='stepIndex === 3'>
                                    This window will close in 5s.
                                </template>
                            </div>
                        </DialogHeader>
                        
                        <!--   Stepper Buttons   -->
                        <DialogFooter class='flex !flex-col'>
                            <div v-if='stepIndex === 1'>
                                <Button
                                    @click='() => onEmailSubmit(setFieldError, nextStep)'
                                    :type='meta.valid ? "button" : "submit"'
                                    class='w-full'
                                    size='lg'
                                    :disabled='!meta.valid'
                                >
                                    <Spinner v-if='loading' class='animate-spin' />
                                    <span>Continue</span>
                                </Button>
                            </div>
                            
                            <div v-if='stepIndex === 2' class='flex items-center justify-between mt-4'>
                                <Button
                                    :disabled='isPrevDisabled'
                                    variant='link'
                                    @click='prevStep()'
                                    size='lg'
                                >
                                    Back
                                </Button>
                                
                                <Button
                                    v-if='stepIndex === 2'
                                    @click="() => onVerifyOtp(setFieldError, nextStep)"
                                    type='submit'
                                    size='lg'
                                >
                                    Verify
                                </Button>
                            </div>
                            
                            <div v-if='stepIndex === 3'>
                                <Button @click='onLoggedIn'>
                                    Close
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
    import { h } from 'vue';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as z from 'zod';
    import { useForm } from 'vee-validate';
    import { Button } from '~/components/ui/button';
    import { Check, X, Dot, Mail, LockKeyhole } from 'lucide-vue-next';
    import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '~/components/ui/input';
    import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from '~/components/ui/pin-input';
    import { Separator } from '~/components/ui/separator';
    import { Skeleton } from '@/components/ui/skeleton';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@/components/ui/stepper';
    import { toast } from 'vue-sonner';
    import { useCountdown } from '@vueuse/core';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp, verifyOtp } = AuthStore;
    const { loading, authModal } = storeToRefs(AuthStore);
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { getProfile } = ProfileStore;
    
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
        },
        {
            step: 2,
        },
        {
            step: 3,
        },
    ];
    
    // Email
    const { setFieldError } = useForm();
    const email = ref('');
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
    const onVerifyOtp = async(setFieldError: any, nextStep:any) => {
        const joined_otp_input = otp_input.value?.join('');
        const result = await verifyOtp(email.value, joined_otp_input);
        
        if(result?.error) {
            setFieldError('otp', `Verification failed: ${result.error.message}`);
            setTimeout(() => {
                setFieldError('otp', '');
            }, 10000);
            return false;
        }
        
        if(result?.data?.session?.access_token) {
            await getProfile();
            setTimeout(() => {
                onLoggedIn();
            }, 5000);
            nextStep && nextTick(() => nextStep());
        }
        
        loading.value = false;
        
        return true;
    };
    
    // Success
    const onLoggedIn = () => {
        resetState();
        displayToast();
    };
    
    // Countdown
    const countdownSeconds = ref(60);
    const { remaining, start } = useCountdown(countdownSeconds);
    const startCountdown = () => start(countdownSeconds);
    
    // Utils
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
        setFieldError('otp', '');
    };
</script>