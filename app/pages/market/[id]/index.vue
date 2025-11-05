<template>
    <div class='single-coin page relative'>
        <LoadingSpinner v-if='loading' />
        
        <div v-else class='z-10'>
            <Card
                v-if='coin && coin.livecoinwatch.name'
                class='bg-transparent border-none shadow-none flex flex-col items-center'
            >
                <CoinHeader :coin='coin' />
                
                <CoinBody :coin='coin'/>
                
                <CoinFooter :coin='coin' />
            </Card>
        </div>
        
        <!--
        <div v-if='dark_mode' class='absolute top-0 right-0 w-full h-full overflow-visible'>
            <StarsBackground
                class='pl-[1200px]'
                :factor='0.25'
                :speed='150'
                star-color='#fff'
            />
        </div>
        -->
    </div>
</template>

<script setup>
    import { Card  } from '~/components/ui/card';
    import CoinHeader from '@/components/market/id/CoinHeader.vue';
    import CoinBody from '@/components/market/id/CoinBody.vue';
    import CoinFooter from '@/components/market/id/CoinFooter.vue';
    import LoadingSpinner from '~/components/LoadingSpinner.vue';
    // import { StarsBackground } from '~/components/ui/bg-stars';
    
    // const colorMode = useColorMode();
    // const dark_mode = computed(() => colorMode.value === 'dark');
    
    // Router
    import { useRoute } from 'vue-router';
    const route = useRoute();
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // State
    const { coin, loading } = storeToRefs(MarketStore);
    // Methods
    const { getCoin } = MarketStore;
    
    onMounted(async() => {
        await getCoin(route.params.id);
    });
</script>