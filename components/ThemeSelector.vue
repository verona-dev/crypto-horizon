<template>
    <section class='theme-selector'>
        <select v-model='$colorMode.preference'>
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
        </select>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    const colorMode = useColorMode()
    
    const enabled = ref(false);
    
    watch(enabled, () => {
        if (enabled.value) {
            colorMode.preference = 'dark';
        } else {
            colorMode.preference = 'light';
        }
        checkTheme();
    });
    
    const checkTheme = () => {
        if (colorMode.preference === 'dark') {
            enabled.value = true;
        } else {
            enabled.value = false;
        }
    };
    
    onMounted(() => {
        console.log(colorMode.preference);
    });
</script>

<style scoped lang='scss'>
    .theme-selector {
    }
</style>