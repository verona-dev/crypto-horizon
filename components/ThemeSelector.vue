<template>
    <section class='theme-selector'>
        <UPopover
            :open='show'
            :popper='{ arrow: true }'
        >
            <UButton
                leading-icon='i-solar:palette-round-bold-duotone'
                size='xl'
                variant='ghost'
            />
            
            <template #panel>
                <UTabs
                    :items='themes'
                    @change='onChange'
                />
            </template>
        </UPopover>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    const colorMode = useColorMode();
    const toast = useToast();
    
    const show = ref(false);
    const themes = [
        {
            label: 'System',
            icon: 'i-material-symbols-light:add-to-home-screen-rounded',
            value: 'system',
        },
        {
            label: 'Light',
            icon: 'i-material-symbols:light-mode-rounded',
            value: 'light',
        },
        {
            label: 'Dark',
            icon: 'i-material-symbols:nights-stay',
            value: 'dark',
        },
    ];
    
    const onChange = index => {
        colorMode.preference = themes[index].value;
        
        toast.add({
            title: `${colorMode.preference.charAt(0).toUpperCase() + colorMode.preference.slice(1)} theme active.`,
            icon: 'i-fxemoji:artistpalette',
            timeout: 3000,
        });
    };
</script>

<style scoped lang='scss'>
    .theme-selector {
        width: min-content;
    }
</style>