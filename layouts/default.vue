<template>
    <SidebarProvider>
        <AppSidebar />
        
        <SidebarTrigger class='' />
        
<!--            <Breadcrumb />-->
        
        <main class='flex flex-1 flex-col items-center max-w-[2000px] mx-auto'>
            
            <slot />
            <ScrollToTop />
        </main>
    </SidebarProvider>
</template>

<script setup>
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from "~/components/AppSidebar.vue";
    
    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from "~/components//ui/breadcrumb"
    
    import { Separator } from "~/components/ui/separator"
    
    import {
        SidebarInset,
        SidebarProvider,
        SidebarTrigger,
    } from "~/components/ui/sidebar"
</script>