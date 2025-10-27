<template>
    <ClientOnly>
        <SidebarProvider :default-open='false'>
            <AppSidebar />
            
            <SidebarInset class='m-0'>
                <!--            <Breadcrumb />-->
                
                <!--  Mobile Trigger  -->
                <MobileSidebarTrigger />
                
                <transition name='scroll-animation-layout' mode='in-out'>
                    <suspense>
                        <slot />
                    </suspense>
                </transition>
                
                <ScrollToTop />
            </SidebarInset>
        </SidebarProvider>
    </ClientOnly>
</template>

<script setup>
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from '~/components/AppSidebar.vue';
    import Breadcrumb from '~/components/Breadcrumb.vue';
    import { SidebarInset, SidebarProvider, MobileSidebarTrigger, } from '~/components/ui/sidebar';
</script>