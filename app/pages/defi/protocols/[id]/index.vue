<template>
    <div class='page w-full'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <div v-if='computed_protocol?.id' class='flex flex-col gap-6'>
                <div class='flex flex-col 2xl:flex-row w-full gap-6'>
                    <div class='left flex flex-col gap-6 w-full 2xl:w-1/2 h-full'>
                        <!--   Name + Logo + Tvl  -->
                        <Card class='w-full h-fit p-6 flex flex-col gap-6'>
                            <CardHeader class='gap-4'>
                                <div class='flex items-center gap-6'>
                                    <NuxtImg
                                        v-if='computed_protocol.logo'
                                        :src='computed_protocol.logo'
                                        width='64'
                                        alt='computedProtocol logo'
                                        class='inline mb-1 rounded-full'
                                    />
                                    
                                    <div class='flex items-end gap-2'>
                                        <Title :tag='1' :level='3' class='text-primary'>{{ computed_protocol.name }}</Title>
                                        <Title v-if='computed_protocol.symbol !== "-"' :tag='2' :level='4' class='mb-2.5'>({{computed_protocol.symbol}})</Title>
                                    </div>
                                </div>
                                
                                <!--   Category  -->
                                <div class='flex items-center gap-2'>
                                    <Badge v-if='computed_protocol.chain' variant='secondary' class='py-1.5 px-3 shadow-lg text-sm'>{{ computed_protocol.chain }} Chain</Badge>
                                    
                                    <Badge v-if='computed_protocol.category' variant='secondary' class='py-1.5 px-3 shadow-lg text-sm'>
                                        {{ computed_protocol.category }}
                                    </Badge>
                                    
                                    <Badge v-if='computed_protocol.openSource' variant='secondary' class='py-1.5 px-3 shadow-lg text-sm'>
                                        Open Source
                                    </Badge>
                                </div>
                            </CardHeader>
                            
                            <CardContent class='flex flex-col gap-16'>
                                <!--   Tvl by Chain  -->
                                <div class='flex flex-col gap-2 max-h-80'>
                                    <Title :tag='6' class='underline'>{{ glossary.tvl.acronym }} by Chain</Title>
                                    
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Asset</TableHead>
                                                <TableHead class='flex flex-col justify-center !items-end'>Quantity
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        
                                        <TableBody class='!mt-6'>
                                            <TableRow
                                                v-for='[chain, tvl] in Object.entries(computed_protocol.currentChainTvls).sort(([, a], [, b]) => b - a)'
                                                :key='chain'
                                            >
                                                <TableCell class='text-sm'>{{ chain }}</TableCell>
                                                <TableCell class='text-sm flex flex-col !items-end'>
                                                    {{ formatNumber(tvl, { compact: true, decimals: 2 }) }}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <!--   Protocol Information  -->
                        <Card class='w-full h-fit p-6 flex flex-col gap-6'>
                            <CardHeader>
                                <Title :tag='2' :level='4'>Protocol Information</Title>
                                <CardDescription v-if='computed_protocol.description'>{{
                                        computed_protocol.description
                                                                                      }}
                                </CardDescription>
                            </CardHeader>
                            
                            <!--   Links  -->
                            <CardContent class='flex flex-col gap-4 flex-wrap'>
                                <div class='flex gap-4 flex-wrap md:flex-nowrap !py-0'>
                                    <!--   Website  -->
                                    <template v-if='computed_protocol.url'>
                                        <NuxtLink
                                            :to='computed_protocol.url'
                                            target='_blank'
                                            class='h-50 w-full'
                                            aria-label='platform website link'
                                            external
                                        >
                                            <PixelCard
                                                variant='blue'
                                                class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'
                                            >
                                                <CardContent
                                                    class='!w-full !justify-center !flex !flex-col !items-center gap-2 pt-4'
                                                >
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:house-line-fill'
                                                            size='28'
                                                            class='mb-1'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6'>Website</Title>
                                                    </div>
                                                    
                                                    <CardDescription>{{ computed_protocol.url }}</CardDescription>
                                                </CardContent>
                                            </PixelCard>
                                        </NuxtLink>
                                    </template>
                                    
                                    <!--   Twitter  -->
                                    <template v-if='computed_protocol.twitter'>
                                        <NuxtLink
                                            :to='`https://x.com/${computed_protocol.twitter}`'
                                            target='_blank'
                                            class='h-50 w-full'
                                            aria-label='platform twitter link'
                                            external
                                        >
                                            <PixelCard
                                                variant='blue'
                                                class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'
                                            >
                                                <CardContent
                                                    class='!w-full !justify-center !flex !flex-col !items-center gap-2 pt-4'
                                                >
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:twitter-logo-fill'
                                                            size='28'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6'>Twitter</Title>
                                                    </div>
                                                    
                                                    <CardDescription>@{{ computed_protocol.twitter }}</CardDescription>
                                                </CardContent>
                                            </PixelCard>
                                        </NuxtLink>
                                    </template>
                                </div>
                                
                                <div class='flex gap-4 flex-wrap md:flex-nowrap !py-0'>
                                    <!--   Treasury  -->
                                    <template v-if='computed_protocol.treasuryCodePath'>
                                        <NuxtLink
                                            :to='computed_protocol.treasuryCodePath'
                                            target='_blank'
                                            class='h-50 w-full'
                                            aria-label='platform twitter link'
                                            external
                                        >
                                            <PixelCard
                                                variant='blue'
                                                class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'
                                            >
                                                <CardContent
                                                    class='!w-full !justify-center !flex !flex-col !items-center gap-2 pt-4'
                                                >
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:bank-fill'
                                                            size='28'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6'>Treasury</Title>
                                                    </div>
                                                    
                                                    <CardDescription v-if='computed_protocol.treasury'>{{
                                                            computed_protocol.treasury
                                                                                                       }}
                                                    </CardDescription>
                                                </CardContent>
                                            </PixelCard>
                                        </NuxtLink>
                                    </template>
                                    
                                    <!--   Github  -->
                                    <template v-if='computed_protocol.github && computed_protocol.github.length'>
                                        <NuxtLink
                                            v-for='link in computed_protocol.github'
                                            :key='link'
                                            :to='`https://github.com/${link}`'
                                            target='_blank'
                                            class='h-50 w-full'
                                            aria-label='platform twitter link'
                                            external
                                        >
                                            <PixelCard
                                                variant='blue'
                                                class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'
                                            >
                                                <CardContent
                                                    class='!w-full !justify-center !flex !flex-col !items-center gap-2 pt-4'
                                                >
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:github-logo-fill'
                                                            size='28'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6'>Github</Title>
                                                    </div>
                                                    
                                                    <CardDescription>https://github.com/{{ link }}</CardDescription>
                                                </CardContent>
                                            </PixelCard>
                                        </NuxtLink>
                                    </template>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div class='right flex flex-col gap-6 w-full 2xl:w-1/2 h-full'>
                        <!--   Stats -->
                        <Card class='w-full h-fit p-6 flex flex-col gap-6'>
                            <CardHeader>
                                <Title :tag='2' :level='4'>Stats</Title>
                            </CardHeader>
                            
                            <CardContent>
                                <div class='flex flex-col md:flex-row items-center gap-6'>
                                    <!--   Tvl  -->
                                    <div v-if='computed_protocol.currentChainTvls' class='flex flex-col items-center gap-6 flex-1'>
                                        <div class='flex flex-col'>
                                            <Title :tag='3' :level='6' class='flex items-center justify-center gap-2 text-muted-foreground'>
                                                {{ glossary.tvl.label }}
                                                
                                                <HoverCard :open-delay='200' class='flex'>
                                                    <HoverCardTrigger>
                                                        <InfoIcon />
                                                    </HoverCardTrigger>
                                                    
                                                    <HoverCardContent>{{ glossary.tvl.description }}</HoverCardContent>
                                                </HoverCard>
                                            </Title>
                                            <Title :tag='4'>{{ formatNumber(Object.values(computed_protocol.currentChainTvls).reduce((sum, tvl) => sum + tvl, 0))}}</Title>
                                        </div>
                                        
                                        <MazCircularProgressBar
                                            :percentage='100'
                                            :duration='1500'
                                        >
                                            <template #default>
                                                <h5>{{ formatNumber(Object.values(computed_protocol.currentChainTvls).reduce((sum, tvl) => sum + tvl, 0), { compact: true, decimals: 2 }) }}</h5>
                                            </template>
                                        </MazCircularProgressBar>
                                    </div>
                                    
                                    <!--   Market Cap  -->
                                    <div v-if='computed_protocol.mcap' class='flex flex-col items-center gap-6 flex-1'>
                                        <div class='flex flex-col'>
                                            <Title :tag='3' :level='6' class='flex items-center justify-center gap-2 text-muted-foreground'>
                                                {{ glossary.market_cap.label }}
                                                
                                                <HoverCard :open-delay='200' class='flex'>
                                                    <HoverCardTrigger>
                                                        <InfoIcon />
                                                    </HoverCardTrigger>
                                                    
                                                    <HoverCardContent>{{ glossary.market_cap.description }}</HoverCardContent>
                                                </HoverCard>
                                            </Title>
                                            <Title :tag='4'>{{ formatNumber(computed_protocol.mcap) }}</Title>
                                        </div>
                                        
                                        <MazCircularProgressBar
                                            :percentage='100'
                                            :duration='2000'
                                        >
                                            <template #default>
                                                <h5>{{ formatNumber(computed_protocol.mcap, { compact: true, decimals: 2 }) }}</h5>
                                            </template>
                                        </MazCircularProgressBar>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <!--   Methodology + Audit  -->
                        <Card v-if='computed_protocol.methodology || computed_protocol.audit_links?.length' class='w-full h-fit p-6 flex flex-col gap-12'>
                            <template v-if='computed_protocol.methodology'>
                                <CardHeader>
                                    <Title :tag='2' :level='4'>Methodology</Title>
                                    <CardDescription>{{ computed_protocol.methodology }}</CardDescription>
                                </CardHeader>
                            </template>
                            
                            <!--  Audit  -->
                            <template v-if='computed_protocol.audit_links?.length'>
                                <div class='flex flex-col gap-6'>
                                    <CardHeader>
                                        <Title :tag='2' :level='4'>{{ glossary.audit.label }}</Title>
                                        <CardDescription>{{ glossary.audit.description }}</CardDescription>
                                    </CardHeader>
                                    
                                    <CardContent>
                                        <NuxtLink
                                            v-for='audit in computed_protocol.audit_links'
                                            :key='audit'
                                            :to='audit'
                                            target='_blank'
                                            class='h-50 w-75'
                                            aria-label='platform audit link'
                                            external
                                        >
                                            <Button variant='outline' aria-label='audit link'>
                                                {{ audit }}
                                                <NewTabIcon class='mb-0.5' />
                                            </Button>
                                        </NuxtLink>
                                    </CardContent>
                                </div>
                            </template>
                        </Card>
                        
                        <!--  Hallmarks  -->
                        <Card v-if='computed_hallmarks?.length' class='w-full h-fit p-6 flex flex-col'>
                            <CardHeader>
                                <Title :tag='2' :level='4'>{{ glossary.hallmarks.label }}</Title>
                                <CardDescription>{{ glossary.hallmarks.description }}</CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                                <div
                                    v-for='(event, index) in computed_hallmarks'
                                    :key='event[0]'
                                    class='relative flex items-center gap-2'
                                >
                                    <!-- Timeline -->
                                    <div class='relative h-32 min-w-40 flex self-stretch justify-center'>
                                        <div v-if='index > 0' class='absolute bottom-1/2 top-0 w-px bg-primary/10' />
                                        <div v-if='index < computed_hallmarks.length - 1' class='absolute bottom-0 top-1/2 w-px bg-primary/10' />
                                        
                                        <Badge variant='outline' class='relative z-10 bg-popover border-primary/10 flex justify-center my-auto items-center gap-2 p-4'>
                                            <NuxtIcon
                                                name='ph:calendar-blank'
                                                size='20'
                                                class=''
                                            />
                                            
                                            <p class='font-mono text-sm text-muted-foreground'>
                                                {{ formatDate(event[0]) }}
                                            </p>
                                        </Badge>
                                    </div>
                                    
                                    <Title :tag='2' :level='6' class='mb-1'>{{ event[1] }}</Title>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
    import { Badge } from '~/components/ui/badge';
    import { Button } from '@/components/ui/button/index';
    import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
    import { formatNumber, formatDate } from '~/utils/formatUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
    import InfoIcon from '~/components/InfoIcon.vue';
    import NewTabIcon from '~/components/NewTabIcon.vue';
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import PixelCard from '~/components/ui/pixel-card/PixelCard.vue';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table/index.ts';
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
    const computed_protocol = computed(() => protocol.value);
    const computed_hallmarks = computed(() => {
        return [...(protocol.value?.hallmarks ?? [])].reverse();
    });
    
    // Router
    const route = useRoute();
    const id = computed(() => route.params?.id);
    
    onMounted(async() => await getDefillamaProtocol(id.value));
</script>
