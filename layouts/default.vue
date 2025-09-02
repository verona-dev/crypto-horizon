<template>
    <SidebarProvider :default-open='false'>
        <AppSidebar />
        
        <!--
        <Breadcrumb />
        -->
        <SidebarInset class='flex flex-1 flex-col items-center max-w-[2000px] mx-auto'>
            <!--  Mobile Trigger  -->
            <SidebarTrigger />
            
            <slot />
            
            <ScrollToTop />
        </SidebarInset>
    </SidebarProvider>
</template>

<script setup>
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from "~/components/AppSidebar.vue";
    
    import {
        SidebarInset,
        SidebarProvider, SidebarTrigger,
    } from '~/components/ui/sidebar';
</script>