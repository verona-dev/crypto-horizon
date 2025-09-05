<template>
    <SidebarProvider :default-open='false'>
        <AppSidebar />
        
        <SidebarInset>
            <Breadcrumb />
            
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
    import Breadcrumb from "~/components/Breadcrumb.vue";
    import { SidebarInset, SidebarProvider, SidebarTrigger, } from '~/components/ui/sidebar';
</script>