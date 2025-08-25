<template>
    <SidebarProvider :default-open='false'>
        <AppSidebar />
        
        <!--
        <Breadcrumb />
        -->
        
        <SidebarInset>
            <main class='flex flex-1 flex-col items-center max-w-[2000px] mx-auto'>
                <SidebarTrigger class='m-4 absolute top-0 left-0' />
                
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