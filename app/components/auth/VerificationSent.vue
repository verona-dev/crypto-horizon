<template>
    <FormField name='verify'>
        <FormItem class='flex flex-col items-center'>
            <p>We sent a verification link to your email address.</p>
            <p>Please check your inbox and click the link to verify your account.</p>
        </FormItem>
    </FormField>
</template>

<script setup>
    import { FormField, FormItem } from '@/components/ui/form/index.ts';
</script>