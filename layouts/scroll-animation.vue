<template>
    <SidebarProvider :default-open='false'>
        <AppSidebar />
        
        <SidebarInset>
            <Breadcrumb />
            
            <!--  Mobile Trigger  -->
            <SidebarTrigger />
            
            <h1 v-if='title' class='page-title flex self-center'>{{ title }}</h1>
            
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
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const title = computed(() => route.meta.title);
</script>