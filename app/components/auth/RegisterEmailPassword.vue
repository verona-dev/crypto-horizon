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
                class='flex flex-col gap-4'
            >
                <div
                    class='flex flex-col'
                    :class='{"gap-6" : current_step === 2}'
                >
                    <!--   Stepper Body   -->
                    <FieldGroup>
                        <!--  Step 1: Email  -->
                        <template v-if='current_step === 1'>
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
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--  Step 2: Verify your account -->
                        <template v-if='current_step === 2'>
                            <VerificationSent />
                            
                            <!--   Resend email   -->
                            <div class='flex flex-col gap-2 text-sm text-center text-muted-foreground w-full'>
                                <span>Didn't get the email?&nbsp;</span>
                                
                                <div>
                                        <span
                                            @click='onResendEmail()'
                                            class='font-bold underline cursor-pointer'
                                        >Click to resend</span>
                                    
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
    import { FieldDescription, FieldGroup } from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper } from '@/components/ui/stepper';
    import { toast } from 'vue-sonner';
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
    const current_step = ref(1);
    const emit = defineEmits(['passwordStepChange']);
    watch(current_step, () => emit('passwordStepChange', current_step.value));
    
    // Email
    const email = ref('');
    // Password
    const password = ref('');
    
    const onCreateAccount = async(nextStep: any) => {
        const { error } = await register({
            email: email.value,
            password: password.value
        });
        
        if(error) {
            return toast.error(error.message);
        }
        
        current_step.value = 2;
        
        nextStep && nextTick(() => nextStep());
    };
    
    const onResendEmail = async() => {
        const { error } = await resendEmail(email.value);
        
        if (error) {
            return toast.error(error.message);
        }
        
        startCountdown();
    };
    
    // Countdown
    const countdown_seconds = ref(59);
    const { remaining, start } = useCountdown(countdown_seconds);
    const startCountdown = () => start(countdown_seconds);
</script>