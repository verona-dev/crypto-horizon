<template>
    <div class='market flex flex-col items-center justify-center'>
        <GlobalMarket />
        
        <GlobalMarketDominance
            v-if='mcap_dominance'
            :mcap-dominance='mcap_dominance'
            :updated-at='updated_at'
        />
        
        <CoinsTable />
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import GlobalMarketDominance from '~/components/market/GlobalMarketDominance.vue';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    const { globalMarket } = storeToRefs(MarketStore);
    const { getCoingeckoGlobalMarket } = MarketStore;
    const mcap_dominance = computed(() => globalMarket.value?.market_cap_percentage);
    const updated_at = computed(() => dayjs.unix(globalMarket.value?.updated_at).format('MMM D YYYY, HH:mm[h]'));
    
    onMounted(() => getCoingeckoGlobalMarket());
</script>