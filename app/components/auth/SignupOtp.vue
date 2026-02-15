<template>
    <Form
        v-slot='{ meta, validate }'
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
                                    <Dot v-if='state === "inactive"' />
                                </Button>
                            </StepperTrigger>
                        </StepperItem>
                    </div>
                    
                    <!--   Stepper Body   -->
                    <div :class='{ "mx-auto1" : step_index === 2}'>
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
                                        />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--  Step 2: Verify your account -->
                        <template v-if='step_index === 2'>
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
                <template v-if='step_index === 1'>
                    <Button
                        @click='() => onCreateAccount(nextStep)'
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
    import * as z from 'zod';
    import { Button } from '@/components/ui/button';
    import { Check, Dot, Mail, UserLock } from 'lucide-vue-next';
    import { FieldTitle, FieldDescription } from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { toTypedSchema } from '@vee-validate/zod';
    import { useForm } from 'vee-validate';
    const { setFieldError } = useForm();
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@/components/ui/stepper';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signInWithOtp } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    // Stepper
    const validation_schema = toTypedSchema(
        z.object({
            email: z.string().email('Invalid email'),
        })
    );
    
    const step_index = ref(1);
    const emit = defineEmits(['otpStepChange']);
    watch(step_index, () => emit('otpStepChange', step_index.value));
    const steps = [
        {
            step: 1,
            title: 'Welcome!',
            description: 'Already have an account? <a href="/login">Login</a>',
        },
        {
            step: 2,
            title: 'Verify Your Account',
            description: 'Link sent!',
        },
    ];
    
    // Email
    const email = ref('');
    
    const onCreateAccount = async(nextStep: any) => {
        const { error } = await signInWithOtp(email.value);
        
        if (error) {
            setFieldError('email', `${error.message}`);
            setTimeout(() => {
                setFieldError('email', '');
            }, 10000);
            return false;
        }
        
        nextStep && nextTick(() => nextStep());
        
        return true;
    };
</script>