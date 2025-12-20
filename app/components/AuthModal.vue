<template>
    <Dialog v-model:open='authModal'>
        <DialogContent class='p-10 sm:max-w-150 flex flex-col !gap-12'>
            <!--   Stepper   -->
            <Form
                v-slot='{ meta, values, validate }'
                as=''
                keep-values
                :validation-schema='toTypedSchema(formSchema[stepIndex - 1])'
            >
                <Stepper
                    v-slot='{ isNextDisabled, isPrevDisabled, nextStep, prevStep, modelValue }'
                    v-model='stepIndex'
                    class='block w-full'
                >
                    <form
                        @submit.prevent='() => {
                                validate()
                                if (stepIndex === steps.length && meta.valid) {
                                  onEmailSubmit(values)
                                }
                            }'
                        class='flex flex-col gap-8'
                    >
                        <!--   Stepper Header   -->
                        <DialogHeader class='flex flex-col'>
                            <DialogTitle class='text-4xl'>Authenticate</DialogTitle>
                            <DialogDescription>Sign in via OTP code with your email below.</DialogDescription>
                            
                            <div class='flex items-center'>
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
                                    
                                    <!--   Stepper Icons   -->
                                    <StepperTrigger as-child>
                                        <Button
                                            :variant='state === "completed" || state === "active" ? "default" : "outline"'
                                            size='icon'
                                            class='z-10 rounded-full shrink-0'
                                            :class='[state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]'
                                            :disabled="state !== 'completed' && (index >= (modelValue || 0) && !meta.valid)"
                                        >
                                            <Check v-if='state === "completed"' class='size-5' />
                                            <Circle v-if='state === "active"' />
                                            <Dot v-if='state === "inactive"' />
                                        </Button>
                                    </StepperTrigger>
                                    
                                    <!--   Stepper Title   -->
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
                        </DialogHeader>
                        
                        <!--   Stepper Body   -->
                        <DialogFooter class='flex !flex-col'>
                            <!--  Step 1: Email input  -->
                            <template v-if='stepIndex === 1'>
                                <FormField
                                    v-slot='{ componentField }'
                                    name='email'
                                >
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                v-bind='componentField'
                                                type='email'
                                                class='inputField !w-full focus-visible:border-foreground/75 focus-visible:ring-[0px] py-5'
                                                placeholder='Enter email'
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                                    class='mx-auto'
                                    otp
                                    required
                                >
                                    <PinInputGroup class='gap-1'>
                                        <template v-for='(id, index) in 8' :key='id'>
                                            <PinInputSlot
                                                class='rounded-md border'
                                                :index='index'
                                            />
                                            <template v-if='index !== 7'>
                                                <PinInputSeparator />
                                            </template>
                                        </template>
                                    </PinInputGroup>
                                    
                                    <Spinner v-if='loading' class='animate-spin' />
                                </PinInput>
                            </template>
                            
                            <!--  Stepper Buttons  -->
                            <div>
                                <div v-if='stepIndex === 1'>
                                    <div class='flex items-center justify-between mt-4'>
                                        <DialogClose>
                                            <Button variant='outline' size='lg'>Cancel</Button>
                                        </DialogClose>
                                        
                                        <Button
                                            @click='meta.valid && nextStep() && onEmailSubmit'
                                            :type='meta.valid ? "button" : "submit"'
                                            class=''
                                            size='lg'
                                            :disabled='!meta.valid'
                                        >
                                            <Spinner v-if='loading' class='animate-spin' />
                                            <span>Send OTP Code</span>
                                        </Button>
                                    </div>
                                </div>
                                
                                <div v-else class='flex items-center justify-between mt-4'>
                                    <Button
                                        :disabled='isPrevDisabled'
                                        variant='outline'
                                        size='sm'
                                        @click='prevStep()'
                                    >
                                        Back
                                    </Button>
                                    
                                    <div class='flex items-center gap-3'>
                                        <Button
                                            v-if='stepIndex !== 2'
                                            :type='meta.valid ? "button" : "submit"'
                                            :disabled='isNextDisabled'
                                            size='sm'
                                            @click='meta.valid && nextStep()'
                                        >
                                            Next
                                        </Button>
                                        
                                        <Button
                                            v-if='stepIndex === 2'
                                            size='sm'
                                            type='submit'
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </Stepper>
            </Form>
            
            <!--
            <DialogFooter class='flex !flex-col gap-4 items-center justify-center border border-red-300 py-4'>
                <p>Terminal for errors</p>
                &lt;!&ndash;   Status  &ndash;&gt;
                <p v-if='status_label_visible' class='text-destructive text-sm'>
                    {{ status_label_computed }}
                </p>
            </DialogFooter>
            -->
        </DialogContent>
    </Dialog>
</template>

<script lang='ts' setup>
    import { toTypedSchema } from '@vee-validate/zod';
    import * as z from 'zod';
    import { Button } from '~/components/ui/button';
    import { Check, Circle, Dot } from 'lucide-vue-next';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
    import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
    import { Input } from '~/components/ui/input';
    import { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot } from '~/components/ui/pin-input';
    import { Spinner } from '~/components/ui/spinner';
    import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
    import { toast } from 'vue-sonner';
    
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
        z.object({
            password: z.string().min(2).max(50),
        }).refine(
            (values) => {
                return values.password
            }
        ),
    ];
    
    const stepIndex = ref(1);
    const steps = [
        {
            step: 1,
            title: 'Your details',
            description: 'Provide your email',
        },
        {
            step: 2,
            title: 'Check your email',
            description: 'Enter OTP Code',
        },
    ];
    
    // Email
    const email = ref('veronadev@tuta.io');
    const status_label = ref('');
    const status_label_computed = computed(() => status_label.value);
    const status_label_visible = ref(false);
    
    const onEmailSubmit = async() => {
        if (!email.value) {
            alert('Please enter a valid email');
            return;
        }
        
        const { error } = await signInWithOtp(email.value);
        
        if (error) {
            status_label_visible.value = true;
            status_label.value = error.message;
            
            setTimeout(() => {
                status_label_visible.value = false;
            }, 5000);
        } else {
            status_label_visible.value = true;
            status_label.value = 'Check your email';
        }
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
        status_label.value = '';
        status_label_visible.value = false;
        otp_input.value = [];
    };
</script>