<template>
    <Form
        v-slot='{ validate, setFieldError }'
        as=''
        keep-values
        :validation-schema='validationSchema'
    >
        <form @submit.prevent='() => validate()'>
            <FieldGroup>
                <!--   Email   -->
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
                                class='!w-full'
                                placeholder='name@example.com'
                                @input='validate()'
                            />
                        </FormControl>
                        
                        <!--
                        <FormMessage />
                        -->
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
                                required
                            />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </FormControl>
                        
                        <!--
                        <FormMessage />
                        -->
                    </FormItem>
                </FormField>
                
                <!--   Create account   -->
                <Field>
                    <Button
                        @click='onCreateAccount'
                        type='submit'
                    >
                        Create Account
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    </Form>
</template>

<script setup lang='ts'>
    import * as z from 'zod';
    import { Button } from '@/components/ui/button';
    import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
    import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
    import { Input } from '@/components/ui/input';
    const { setFieldError } = useForm();
    import { toTypedSchema } from '@vee-validate/zod';
    import { useForm } from 'vee-validate';
    
    // AuthStore
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { signUp } = AuthStore;
    
    const email = ref('');
    const password = ref('');
    
    const validationSchema = toTypedSchema(
        z.object({
            email: z.string().email('Invalid email'),
            password: z.string().min(8, 'Password must be at least 8 chars')
        })
    );
    
    const onCreateAccount = async() => {
        await signUp({
            email: email.value,
            password: password.value
        });
    };
</script>