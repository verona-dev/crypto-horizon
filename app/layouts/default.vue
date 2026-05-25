<template>
    <div>
        <ClientOnly>
            <SidebarProvider :default-open='false'>
                <AppSidebar />
                
                <SidebarInset class='flex justify-between items-center min-h-svh'>
                    <!--
                    <Breadcrumb />
                    -->
                    
                    <!--  Mobile Trigger  -->
                    <MobileSidebarTrigger />
                    
                    <slot />
                    
                    <CoingeckoAttribution />
                    
                    <ScrollToTop />
                </SidebarInset>
            </SidebarProvider>
        </ClientOnly>
    </div>
</template>

<script setup>
    import AppSidebar from '~/components/sidebar/AppSidebar.vue';
    // import Breadcrumb from '~/components/Breadcrumb.vue';
    import CoingeckoAttribution from '~/components/CoingeckoAttribution.vue';
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import { SidebarInset, SidebarProvider, MobileSidebarTrigger, } from '~/components/ui/sidebar';
    
    // const route = useRoute();
    // const title = computed(() => route.meta.title);
    
    /*
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getGlobalMarket } = MarketStore;
    onMounted(() => {
        getGlobalMarket();
    });
    */
</script>