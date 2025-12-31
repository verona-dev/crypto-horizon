<template>
    <div>
        <ClientOnly>
            <SidebarProvider :default-open='false'>
                <AppSidebar />
                
                <SidebarInset class='flex justify-between items-center min-h-svh'>
                    <MarketBar />
                    <!--
                    <Breadcrumb />
                    -->
                    
                    <!--  Mobile Trigger  -->
                    <MobileSidebarTrigger />
                    
                    <!--
                    <h1 v-if='title' class='page-title'>{{ title }}</h1>
                    -->
                    
                    <slot />
                    
                    <CoingeckoAttribution />
                    
                    <ScrollToTop />
                </SidebarInset>
            </SidebarProvider>
        </ClientOnly>
        
        <AuthModal v-if='authModal' />
    </div>
</template>

<script setup>
    import AppSidebar from '@/components/sidebar/AppSidebar.vue';
    // import Breadcrumb from '~/components/Breadcrumb.vue';
    import CoingeckoAttribution from '~/components/CoingeckoAttribution.vue';
    import MarketBar from '~/components/market/MarketBar.vue';
    import ScrollToTop from '~/components/ScrollToTop.vue';
    import { SidebarInset, SidebarProvider, MobileSidebarTrigger, } from '~/components/ui/sidebar';
    
    // AuthStore
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '~/stores/AuthStore.js';
    const AuthStore = useAuthStore();
    const { authModal } = storeToRefs(AuthStore);
    
    // const route = useRoute();
    // const title = computed(() => route.meta.title);
    
    import { useMarketStore } from '~/stores/MarketStore.js';
    import AuthModal from '@/components/AuthModal.vue';
    const MarketStore = useMarketStore();
    const { getGlobalMarket } = MarketStore;
    
    onMounted(() => {
        getGlobalMarket();
    });
</script>