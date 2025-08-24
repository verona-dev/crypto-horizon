<template>
    <SidebarProvider>
        <AppSidebar />
        
        <!--
        <Breadcrumb />
        -->
        
        <SidebarInset>
            <main class='flex flex-1 flex-col items-center max-w-[2000px] mx-auto'>
                <SidebarTrigger class='m-10' />
                <slot />
                <ScrollToTop />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>

<script setup>
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from "~/components/AppSidebar.vue";
    
    import {
        SidebarInset,
        SidebarProvider,
        SidebarTrigger,
    } from "~/components/ui/sidebar"
</script>