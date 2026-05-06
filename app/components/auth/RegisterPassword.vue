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
                class='flex flex-col gap-4'
            >
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
                
                <!--   Stepper Body   -->
                <FieldGroup>
                    <!--  Step 1: Email  -->
                    <template v-if='step_index === 1'>
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
                                        class='dark:bg-blue-bunker/75'
                                        required
                                    />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        
                        <!--  Step 1: Password   -->
                        <FormField
                            v-slot='{ componentField }'
                            v-model='password'
                            name='password'
                        >
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                
                                <FormControl>
                                    <Input
                                        v-bind='componentField'
                                        id='password'
                                        type='password'
                                        class='dark:bg-blue-bunker/75'
                                        required
                                    />
                                    <FieldDescription>
                                        Must be at least 8 characters long.
                                    </FieldDescription>
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </template>
                    
                    <!--  Step 2: Verify your account -->
                    <template v-if='step_index === 2'>
                        <VerificationSent />
                        
                        <div class='text-sm mx-auto my-2'>
                            <span>Didn't get the email?&nbsp;</span>
                            <span
                                @click='onResendEmail'
                                class='font-bold underline cursor-pointer'
                            >Click to resend</span>
                            
                            <span v-if='remaining !== 0'>&nbsp;available in {{ remaining }}.</span>
                        </div>
                    </template>
                </FieldGroup>
                
                <!--   Stepper Buttons   -->
                <template v-if='step_index === 1'>
                    <Button
                        @click='onCreateAccount(setFieldError, nextStep)'
                        :type='meta.valid ? "button" : "submit"'
                        class='w-full dark:disabled:opacity-75'
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
    import { FieldDescription, FieldGroup, FieldTitle} from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper } from '@/components/ui/stepper';
    import { toTypedSchema } from '@vee-validate/zod';
    import { useCountdown } from '@vueuse/core';
    import VerificationSent from '@/components/auth/VerificationSent.vue';
    
    // AuthStore
    import {storeToRefs} from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { register, resendEmail } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    const validation_schema = toTypedSchema(
        z.object({
            email: z.string().email('Invalid email'),
            password: z.string().min(8, 'Password must be at least 8 chars')
        })
    );
    
    // Stepper
    const step_index = ref(1);
    const emit = defineEmits(['passwordStepChange']);
    watch(step_index, () => emit('passwordStepChange', step_index.value));
    
    const steps = [
        {
            step: 1,
            title: '',
            description: '',
        },
        {
            step: 2,
            title: 'Verify Your Account',
            description: 'Link sent!',
        },
    ];
    
    // Email
    const email = ref('');
    // Password
    const password = ref('');
    
    const onCreateAccount = async(setFieldError: any, nextStep: any) => {
        const { error } = await register({
            email: email.value,
            password: password.value
        });
        
        if(error) {
            setFieldError('email', `${error.message}`);
            setTimeout(() => {
                setFieldError('email', '');
            }, 5000);
            return;
        }
        
        nextStep && nextTick(() => nextStep());
    };
    
    const onResendEmail = async() => {
        const { error } = await resendEmail(email.value);
        if (error) return;
        startCountdown();
    };
    
    // Countdown
    const countdown_seconds = ref(60);
    const { remaining, start } = useCountdown(countdown_seconds);
    const startCountdown = () => start(countdown_seconds);
</script>