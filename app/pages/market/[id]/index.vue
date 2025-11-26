<template>
    <div class='single-coin page'>
        <LoadingSpinner v-if='loading' />
        
        <div v-else class='z-10'>
            <Card
                v-if='coin'
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
    const route = useRoute();
    
    // MarketStore
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // State
    const { coin, loading } = storeToRefs(MarketStore);
    // const coin_name = computed(() => coin.value?.name);
    const id = computed(() => route.params?.id);
    // Methods
    const { getCoin } = MarketStore;
    
    onMounted(async() => {
        await getCoin(route.params.id);
        // console.log(JSON.parse(JSON.stringify(route)));
        // console.log(coin_name.value);
    });
    
    useHead({
        title: `Market | ${id.value}`,
        meta: [
            { name: 'description', content: `Cryptocurrency ${id.value}.` },
            { property: 'og:title', content:  `Cryptocurrency ${id.value}.` },
            { property: 'og:description', content:  `Cryptocurrency ${id.value}.` },
        ],
    });
</script>