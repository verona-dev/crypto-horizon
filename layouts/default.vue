<template>
    <div class='md:pr-16'>
        <SidebarProvider :default-open='false'>
            <AppSidebar />
            
            <SidebarInset class='flex items-center justify-start my-28 md:my-0 px-20 md:px-32'>
<!--                <Breadcrumb />-->
                
                <!--  Mobile Trigger  -->
                <SidebarTrigger />
                
                <h1 v-if='title' class='page-title'>{{ title }}</h1>
                
                <slot />
                
                <ScrollToTop />
            </SidebarInset>
        </SidebarProvider>
    </div>
</template>

<script setup>
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from "~/components/AppSidebar.vue";
    import Breadcrumb from "~/components/Breadcrumb.vue";
    import { SidebarInset, SidebarProvider, SidebarTrigger, } from '~/components/ui/sidebar';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const title = computed(() => route.meta.title);
</script>