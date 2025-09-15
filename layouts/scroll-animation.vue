<template>
    <SidebarProvider :default-open='false'>
        <AppSidebar />
        
        <SidebarInset class='m-0'>
            <!--            <Breadcrumb />-->
            
            <!--  Mobile Trigger  -->
            <SidebarTrigger />
            
            <transition name='scroll-animation-layout' mode='out-in'>
                <slot />
            </transition>
            
            <ScrollToTop />
        </SidebarInset>
    </SidebarProvider>
</template>

<script setup>
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from '~/components/AppSidebar.vue';
    import Breadcrumb from '~/components/Breadcrumb.vue';
    import { SidebarInset, SidebarProvider, SidebarTrigger, } from '~/components/ui/sidebar';
</script>