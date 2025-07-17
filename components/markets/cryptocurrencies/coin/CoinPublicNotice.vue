<template>
    <!--  Public Notice  -->
    <Alert
        v-if='publicNotice'
        class='my-10 py-0 w-3/4 flex items-center border border-warning'
    >
        <div class='mr-6'>
            <NuxtIcon
                name='iconoir:megaphone'
                size='50'
            />
        </div>
        
        <div class='notice-content border-l border-warning p-6'>
            <AlertTitle>Public notice:</AlertTitle>
            <AlertDescription class='inline' v-html='publicNoticeFormatted' />
        </div>
    </Alert>
</template>

<script setup>
    import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert/index.js';
    
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