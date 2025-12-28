<script lang='ts' setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from './useFormField'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
const { name, formMessageId } = useFormField()
</script>

<template>
    <ErrorMessage
        :id='formMessageId'
        v-slot='{ message }'
        :name='toValue(name)'
        as='div'
        class='text-[0.8rem] font-medium text-destructive mt-6'
    >
        <Card class='w-full bg-gradient-to-br from-zinc-900/95 to-black/95 border border-red-500/50 backdrop-blur-xl shadow-2xl'>
            <CardHeader class='py-3'>
                <div class='flex items-center gap-3'>
                    <div class='flex gap-1'>
                        <div class='w-2.5 h-2.5 bg-red-500/80 rounded-full animate-pulse'></div>
                        <div class='w-2.5 h-2.5 bg-yellow-500/60 rounded-full'></div>
                        <div class='w-2.5 h-2.5 bg-green-500/40 rounded-full'></div>
                    </div>
                    <h6 class='text-xs font-mono uppercase tracking-widest text-red-400 pr-3'>
                        Error
                    </h6>
                </div>
            </CardHeader>
            
            <CardContent class='pt-0 pb-4'>
                <span class='text-xs font-mono text-red-300 leading-relaxed'>
                    {{ message }}
                </span>
            </CardContent>
        </Card>
    </ErrorMessage>
</template>
