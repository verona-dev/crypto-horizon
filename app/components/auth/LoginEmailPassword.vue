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
                <div
                    class='flex flex-col'
                    :class='{"gap-6" : current_step === 2}'
                >
                    <!--   Stepper Body   -->
                    <FieldGroup>
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
                                            placeholder='name@example.com'
                                            class='dark:bg-blue-bunker/75'
                                            required
                                        />
                                    </FormControl>
                                </FormItem>
                            </FormField>
                            
                            <!--   Password   -->
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
                                            :validateOnBlur='false'
                                            :validateOnChange='false'
                                            required
                                        />
                                        <FieldDescription>
                                            Must be at least 8 characters long.
                                        </FieldDescription>
                                    </FormControl>
                                </FormItem>
                            </FormField>
                        </template>
                        
                        <!--  Step 2: Welcome back  -->
                        <template v-if='current_step === 2'>
                            <div class='flex flex-col items-center gap-2'>
                                <FieldTitle class='text-3xl font-bold'>Welcome back!</FieldTitle>
                                <FieldDescription>You are being redirected.</FieldDescription>
                            </div>
                        </template>
                    </FieldGroup>
                </div>
                
                <!--   Stepper Buttons   -->
                <template v-if='current_step === 1'>
                    <Button
                        @click='onLogin(nextStep)'
                        :type='meta.valid ? "button" : "submit"'
                        class='w-full dark:disabled:opacity-75'
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
    import {FieldDescription, FieldGroup, FieldTitle} from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper } from '@/components/ui/stepper';
    import { toast } from 'vue-sonner';
    import { toTypedSchema } from '@vee-validate/zod';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { loginPassword } = AuthStore;
    const { loading } = storeToRefs(AuthStore);
    
    // ProfileStore
    import { useProfileStore } from '~/stores/ProfileStore.js';
    const ProfileStore = useProfileStore();
    const { getProfile } = ProfileStore;
    
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
    
    const onLogin = async(nextStep: any) => {
        const { data, error } = await loginPassword({
            email: email.value,
            password: password.value
        });
        
        if(error) {
            return toast.error(error.message);
        }
        
        current_step.value = 2;
        
        if(data?.session?.access_token) {
            const { error } = await getProfile();

            if(!error) {
                reloadNuxtApp();
                nextStep && nextTick(() => nextStep());
            }
        }
    };
</script>