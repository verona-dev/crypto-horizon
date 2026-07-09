<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <Card>
                <CardHeader>
                    <Title :tag='4'>What is {{ exchange?.name }} exchange?</Title>
                    <CardDescription>{{ exchange?.description }}</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
            
            <div class='flex flex-col'>
<!--                <p>{{ exchange?.name }}</p>-->
                <p>{{ exchange?.year_established }}</p>
                <p>{{ exchange?.country }}</p>
<!--                <p>{{ exchange?.description }}</p>-->
                <p>{{ exchange?.url }}</p>
                <p>{{ exchange?.image }}</p>
                
                <p>{{ exchange?.facebook_url }}</p>
                <p>{{ exchange?.reddit_url }}</p>
                <p>{{ exchange?.telegram_url }}</p>
                <p>{{ exchange?.other_url_1 }}</p>
                <p>{{ exchange?.other_url_2 }}</p>
                <p>{{ exchange?.twitter_handle }}</p>
                
                <p>{{ exchange?.centralized }}</p>
                
                <p>{{ exchange?.public_notice }}</p>
                <p>{{ exchange?.alert_notice }}</p>
                
                <p>{{ exchange?.trust_score }}</p>
                <p>{{ exchange?.trust_score_rank }}</p>
                
                <p>{{ exchange?.coins }}</p>
                <p>{{ exchange?.pairs }}</p>
                <p>{{ exchange?.trade_volume_24h_btc }}</p>
            </div>
        </template>
    </div>
</template>

<script setup>
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import Title from '~/components/Title.vue';
    
    // Router
    const route = useRoute();
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    const { getExchange } = MarketStore;
    
    // State
    const { exchange } = storeToRefs(MarketStore);
    const id = computed(() => route.params?.id);
    
    onMounted(async() => {
        await getExchange(id.value);
        console.log(id.value);
    });
</script>