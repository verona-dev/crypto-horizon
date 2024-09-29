<template>
    <section class='theme-selector'>
        <Button
            @click='togglePopover'
            aria-label='Theme'
            severity='success'
            outlined
            raised
        >
            <template #icon>
                <InputIcon :class="getIcon" />
<!--                <Icon name='i-solar:palette-round-bold-duotone' />-->
<!--                <InputIcon class="pi pi-search" />-->
<!--                <i class="uil-github"></i>-->
            </template>
        </Button>
        
        <Popover
            class='w-80'
            ref='popover'
        >
            <div class='flex flex-col items-center justify-center gap-4 py-4'>
                <h3>Theme</h3>
                
                <Tabs :value="colorMode.preference">
                    <TabList>
                        <Tab
                            v-for="theme in themes"
                            :key="theme.value"
                            :value="theme.value"
                            @click='onChange(theme.value)'
                            class='w-24	flex flex-col items-center justify-center gap-2'
                        >
<!--                            <InputIcon :class="theme.icon" />-->
                            <i :class="theme.icon_pi"></i>
                            <div>{{ theme.label }}</div>
                        </Tab>
                    </TabList>
                </Tabs>
            </div>
        </Popover>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    const colorMode = useColorMode();
    console.log(colorMode.preference);
    
    const popover = ref();
    
    const themes = [
        {
            label: 'System',
            icon: 'i-material-symbols-light:add-to-home-screen-rounded',
            icon_pi: 'pi pi-desktop',
            value: 'system',
        },
        {
            label: 'Light',
            icon: 'i-material-symbols:light-mode-rounded',
            icon_pi: 'pi pi-sun',
            value: 'light',
        },
        {
            label: 'Dark',
            icon: 'i-material-symbols:nights-stay',
            icon_pi: 'pi pi-moon',
            value: 'dark',
        },
    ];
    
    const onChange = theme => colorMode.preference = theme;
    const togglePopover = event => popover.value.toggle(event);
    const getIcon = computed(() => {
        if(colorMode.preference === 'system') {
            return 'pi pi-desktop';
        }
        if(colorMode.preference === 'light') {
            return 'pi pi-sun';
        }
        if(colorMode.preference === 'dark') {
            return 'pi pi-moon';
        }
    });
    const getIconStyle = () => {
        if(colorMode.preference === 'dark') {
            return 'secondary';
        }
    };
</script>

<style scoped lang='scss'>
    .theme-selector {
        width: min-content;
    }
</style>