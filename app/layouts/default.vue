<template>
    <div>
        <ClientOnly>
            <MarketBar />
            
            <SidebarProvider :default-open='false'>
                <AppSidebar />
                
                <SidebarInset class='custom-flex'>
                    <!--
                    <Breadcrumb />
                    -->
                    
                    <!--  Mobile Trigger  -->
                    <SidebarTrigger />
                    
                    <!--
                    <h1 v-if='title' class='page-title'>{{ title }}</h1>
                    -->
                    
                    <slot />
                    
                    <ScrollToTop />
                </SidebarInset>
            </SidebarProvider>
            
            <CoingeckoAttribution />
        </ClientOnly>
    </div>
</template>

<script setup>
    import MarketBar from '~/components/market/MarketBar.vue';
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import AppSidebar from "~/components/AppSidebar.vue";
    import Breadcrumb from "~/components/Breadcrumb.vue";
    import { SidebarInset, SidebarProvider, SidebarTrigger, } from '~/components/ui/sidebar';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    // const title = computed(() => route.meta.title);
    import CoingeckoAttribution from '~/components/CoingeckoAttribution.vue';
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getCoingeckoGlobalMarket } = MarketStore;
    
    onMounted(() => {
        getCoingeckoGlobalMarket();
    });
</script>