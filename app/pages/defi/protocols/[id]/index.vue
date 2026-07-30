<template>
    <div class='page w-full'>
        <!--        <PageLoadingSpinner v-if='loading' />-->
        
        <div class='flex flex-col xl:flex-row items-center w-full justify-evenly'>
            <Card class='w-2/5 p-6 flex flex-col gap-8'>
                <CardHeader>
                    <div class='flex items-center gap-4 self-start'>
                        <NuxtImg
                            v-if='protocol.logo'
                            :src='protocol.logo'
                            width='60'
                            alt='protocol logo'
                            class='inline mb-1 rounded-full'
                        />
                        
                        <Title :tag='1' :level='3'>{{ protocol.name }} ({{ protocol.symbol }})</Title>
                    </div>
                </CardHeader>
                
                <CardContent>
                    <Title :tag='6' class='flex items-center gap-2 text-muted-foreground'>{{ glossary.tvl.label }}</Title>
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
                
                <CardContent class='flex flex-col'>
                    <div class='flex items-center gap-2'>
                        <span>Category:</span>
                        <Badge
                            v-if='protocol.category' variant='outline'
                            class='py-2 px-3 shadow-lg text-sm'
                        >
                            {{ protocol.category }}
                        </Badge>
                    </div>
                    
                    <div>
                        <!--   Links  -->
                        <div class='w-full flex gap-8'>
                            <!--   Website  -->
                            <template v-if='protocol.url'>
                                <NuxtLink
                                    :to='protocol.url'
                                    target='_blank'
                                    class='flex-1 h-40'
                                    aria-label='platform website link'
                                    external
                                >
                                    <PixelCard
                                        variant='blue'
                                        class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'
                                    >
                                        <CardContent class='!w-full !justify-center !flex !flex-col !items-center gap-4 pt-6 ml-1'>
                                            <NuxtIcon
                                                name='ph:house-line-fill'
                                                size='28'
                                            />
                                            
                                            <CardDescription>{{ protocol.url }}</CardDescription>
                                        </CardContent>
                                    </PixelCard>
                                </NuxtLink>
                            </template>
                        </div>
                    </div>
                    
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
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import NewTabIcon from '~/components/NewTabIcon.vue';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import PixelCard from '~/components/ui/pixel-card/PixelCard.vue';
    import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table/index.ts';
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
