<template>
    <section class='theme-selector'>
<!--        <UPopover
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
        </UPopover>-->
        
        <Button
            ref='show'
            type='button'
            @click='toggle'
        >
            <template #icon>
                <Icon name='i-solar:palette-round-bold-duotone' />
            </template>
        </Button>
        
        <Popover ref='show'>
            <div class='flex flex-col gap-4'>
                <h3>Popover Content</h3>
                
                <Tabs :value="colorMode.preference">
                    <TabList>
                        <Tab
                            v-for="theme in themes"
                            :key="theme.value"
                            :value="theme.value"
                            @click='onChange(theme.value)'
                        >
                            {{ theme.label }}
                        </Tab>
                    </TabList>
                    
                    <TabPanels>
                        <TabPanel
                            v-for="theme in themes"
                            :key="theme.content"
                            :value="theme.value"
                        >
                            <p class="m-0">{{ theme.icon }}</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Popover>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    const colorMode = useColorMode();
    console.log(colorMode.preference);
    
    const show = ref();
    const toggle = event => show.value.toggle(event);
    
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
    
    const onChange = theme => colorMode.preference = theme;
</script>

<style scoped lang='scss'>
    .theme-selector {
        width: min-content;
    }
</style>