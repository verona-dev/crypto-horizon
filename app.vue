<template>
    <NuxtLoadingIndicator />
    
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    
    <ThemeSelector />
    
    <UNotifications />
</template>

<script setup>
import ThemeSelector from '~/components/ThemeSelector.vue';
</script>

<style lang='scss'>
   .theme-selector {
       left: 0;
       margin-left: auto;
       margin-right: auto;
       position: absolute;
       right: 0;
       text-align: center;
       top: 15px;
   }
</style>