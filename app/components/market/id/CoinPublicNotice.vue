<template>
    <Alert
        v-if='publicNotice'
        class='my-6 px-0 w-3/4 flex items-center animate-fadeIn border border-warning/25'
    >
        <div class='flex px-8'>
            <NuxtIcon
                name='ph:shield-warning-light'
                size='30'
                class='text-warning'
            />
        </div>
        
        <div class='notice-content flex flex-col gap-2 border-l border-warning/25 p-6'>
            <AlertTitle class='uppercase underline text-warning text-sm'>Public notice</AlertTitle>
            <AlertDescription v-html='publicNoticeFormatted' class='text-xs' />
        </div>
    </Alert>
</template>

<script setup>
    import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
    
    const props = defineProps({
        publicNotice: {
            type: String,
            default: null,
        }
    });
    
    const { publicNotice } = toRefs(props);
    
    const publicNoticeFormatted = computed(() => {
        let text = publicNotice.value;
        if (text?.endsWith('.')) {
            text = text.slice(0, -1);
        }
        return text.replace(/<a /g, '<a class="underline" ');
    });
</script>