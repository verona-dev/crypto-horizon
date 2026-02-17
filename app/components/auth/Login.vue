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
                                <User v-if='state === "active" && step_index === 2' />
                                <Dot v-if='state === "inactive"' />
                            </Button>
                        </StepperTrigger>
                    </StepperItem>
                </div>
                
                <!--   Stepper Body   -->
                <FieldGroup>
                    <!--  Step 1: Email input  -->
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
                    
                    <!--  Step 2: Logged In -->
                    <!--
                    <template v-if='step_index === 2'>
                        This window will close in 5s.
                    </template>
                    -->
                </FieldGroup>
                
                <!--   Stepper Buttons   -->
                <template v-if='step_index === 1'>
                    <Button
                        @click='() => onLogin(setFieldError, nextStep)'
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
    import { Check, Dot, Mail, User } from 'lucide-vue-next';
    import { FieldDescription, FieldGroup, FieldTitle} from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    import { Spinner } from '@/components/ui/spinner';
    import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@/components/ui/stepper';
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
    const step_index = ref(1);
    const emit = defineEmits(['passwordStepChange']);
    watch(step_index, () => emit('passwordStepChange', step_index.value));
    const steps = [
        {
            step: 1,
            title: 'Welcome!',
            description: 'Don’t have an account? <NuxtLink to="/register">Register</a>',
        },
        {
            step: 2,
            title: 'Welcome back!',
            description: 'You are now logged in.',
        },
    ];
    
    // Email
    const email = ref('');
    // Password
    const password = ref('');
    
    const onLogin = async(setFieldError: any, nextStep: any) => {
        const { data, error } = await loginPassword({
            email: email.value,
            password: password.value
        });
        
        if(error) {
            setFieldError('email', `${error.message}`);
            setTimeout(() => {
                setFieldError('email', '');
            }, 2500);
            return false;
        }
        
        if(data?.session?.access_token) {
            const { error } = await getProfile();
            
            if(!error) {
                reloadNuxtApp();
                
                nextStep && nextTick(() => nextStep());
            }
        }
        
        return true;
    };
</script>