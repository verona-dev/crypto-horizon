<template>
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

<script setup>
    import { Button } from '@/components/ui/button/index.ts';
    import { FormField, FormItem } from '@/components/ui/form/index.ts';
</script>