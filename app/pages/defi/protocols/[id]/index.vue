<template>
    <div class='page w-full'>
        <!--        <PageLoadingSpinner v-if='loading' />-->
        
        <div class='flex items-center border w-full justify-between'>
            <Card class='w-2/5 p-6 flex flex-col gap-8'>
                <CardHeader>
                    <div class='flex items-center gap-4 self-start'>
                        <NuxtImg
                            v-if='protocol.logo'
                            :src='protocol.logo'
                            width='52'
                            alt='exchange logo'
                            class='inline mb-1'
                        />
                        
                        <Title :tag='1' :level='3'>{{ protocol.name }} ({{ protocol.symbol }})</Title>
                    </div>
                </CardHeader>
                
                <CardContent>
                    <Title :tag='6' class='flex items-center gap-2 text-muted-foreground'>{{
                            glossary.tvl.label
                                                                                          }}</Title>
                    <Title :tag='4' v-if='protocol.currentChainTvls' class='!text-5xl'>
                        {{
                            formatNumber(
                                Object.values(protocol.currentChainTvls).reduce((sum, tvl) => sum + tvl, 0),
                                { compact: true, decimals: 3 }
                            )
                        }}
                    </Title>
                </CardContent>
            </Card>
            
            <Card class='w-1/2 h-full p-6 flex flex-col gap-8'>
                <CardHeader>
                    <Title :tag='4' class='flex items-center gap-2'>Protocol Information</Title>
                    <CardDescription v-if='protocol.description'>{{ protocol.description }}</CardDescription>
                </CardHeader>
                
                <CardContent>
                    Category: <Badge
                    v-if='protocol.category' variant='outline'
                    class='py-2 px-3 shadow-lg bg-muted text-foreground/75 text-sm'
                >{{ protocol.category }}
                </Badge>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import { Badge } from '~/components/ui/badge';
    import { Button } from '@/components/ui/button/index';
    import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '~/components/ui/card';
    import { formatNumber } from '~/utils/formatUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import Title from '~/components/Title.vue';
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    const DefiStore = useDefiStore();
    const { getDefillamaProtocol } = DefiStore;
    const { protocol } = storeToRefs(DefiStore);
    
    // Router
    const route = useRoute();
    const id = computed(() => route.params?.id);
    
    onMounted(async() => await getDefillamaProtocol(id.value));
</script>
