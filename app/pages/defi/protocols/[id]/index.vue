<template>
    <div class='page w-full'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <div v-if='computed_protocol?.id' class='flex flex-col gap-6'>
                <!--  Top  -->
                <div class='top flex flex-col 2xl:flex-row w-full gap-6'>
                    <!--  Left Col  -->
                    <div class='left flex flex-col gap-6 w-full 2xl:w-2/5 h-full'>
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
                                <CardDescription v-if='computed_protocol.description'>{{ computed_protocol.description }}</CardDescription>
                            </CardHeader>
                            
                            <!--   Links  -->
                            <CardContent class='flex flex-col gap-4 flex-wrap'>
                                <div class='flex gap-4 flex-wrap md:flex-nowrap !py-0'>
                                    <!--   Website  -->
                                    <template v-if='computed_protocol.url'>
                                        <NuxtLink
                                            :to='computed_protocol.url'
                                            target='_blank'
                                            class='h-36 flex-1'
                                            aria-label='platform website link'
                                            external
                                        >
                                            <PixelCard variant='blue' class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'>
                                                <CardContent class='!w-full !justify-center !flex !flex-col !items-center pt-4'>
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:house-fill'
                                                            size='20'
                                                            class='mb-1'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6' class='text-lg'>Website</Title>
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
                                            class='h-36 flex-1'
                                            aria-label='platform twitter link'
                                            external
                                        >
                                            <PixelCard variant='blue' class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'>
                                                <CardContent class='!w-full !justify-center !flex !flex-col !items-center pt-4'>
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:twitter-logo-fill'
                                                            size='20'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6' class='text-lg'>Twitter</Title>
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
                                            class='h-36 flex-1'
                                            aria-label='platform twitter link'
                                            external
                                        >
                                            <PixelCard variant='pink' class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'>
                                                <CardContent class='!w-full !justify-center !flex !flex-col !items-center pt-4'>
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:bank-fill'
                                                            size='20'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6' class='text-lg'>Treasury</Title>
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
                                            class='h-36 flex-1'
                                            aria-label='platform twitter link'
                                            external
                                        >
                                            <PixelCard variant='pink' class='flex flex-row items-center !h-full !w-full !flex-1 hover:border-blue-sky/50'>
                                                <CardContent class='!w-full !justify-center !flex !flex-col !items-center pt-4'>
                                                    <div class='flex items-center gap-2'>
                                                        <NuxtIcon
                                                            name='ph:github-logo-fill'
                                                            size='20'
                                                        />
                                                        
                                                        <Title :tag='3' :level='6' class='text-lg'>Github</Title>
                                                    </div>
                                                    
                                                    <CardDescription>@{{ link }}</CardDescription>
                                                </CardContent>
                                            </PixelCard>
                                        </NuxtLink>
                                    </template>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <!--  Hallmarks Timeline  -->
                        <Card v-if='computed_hallmarks?.length' class='w-full flex flex-col p-6 gap-6'>
                            <CardHeader>
                                <Title :tag='2' :level='4'>{{ glossary.hallmarks.label }}</Title>
                                <CardDescription>{{ glossary.hallmarks.description }}</CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                                <Stepper
                                    orientation='vertical'
                                    class='flex max-w-md flex-col gap-10'
                                >
                                    <StepperItem
                                        v-for='(step, index) in computed_hallmarks'
                                        :key='index'
                                        class='relative flex w-full items-start gap-6'
                                        :step='computed_protocol.hallmarks.length - index'
                                        :state='"completed"'
                                    >
                                        <StepperSeparator
                                            v-if='index !== computed_protocol.hallmarks?.length - 1'
                                            class='absolute left-[19px] top-[44px] block h-[85%] w-0.5 shrink-0 rounded-full !bg-primary/25'
                                        />
                                        
                                        <div class='z-10 rounded-full shrink-0 flex items-center justify-center size-10 bg-transparent text-primary/75 ring-2 ring-primary/25 ring-offset-2 ring-offset-background'>
                                            <NuxtIcon name='ph:calendar-blank' size='18' class='text-primary' />
                                        </div>
                                        
                                        <div class='flex flex-col gap-1'>
                                            <StepperTitle class='text-sm lg:text-base font-semibold transition text-muted-foreground'>
                                                {{ formatDate(step[0]) }}
                                            </StepperTitle>
                                            
                                            <StepperDescription class='sr-only text-xs lg:text-sm text-foreground transition md:not-sr-only'>
                                                {{ step[1] }}
                                            </StepperDescription>
                                        </div>
                                    </StepperItem>
                                </Stepper>
                            </CardContent>
                        </Card>
                        
                        <!--  Hacks  -->
                        <Card v-if='protocol.hacks.length' class='w-full flex flex-col p-6 gap-6'>
                            <CardHeader>
                                <Title :tag='2' :level='4'>{{ glossary.hacks.label }}</Title>
                                <CardDescription>{{ glossary.hacks.description }}</CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                                <Stepper orientation='vertical' class='flex max-w-md flex-col gap-10'>
                                    <StepperItem
                                        v-for='(hack, index) in protocol.hacks'
                                        :key='index'
                                        class='relative flex w-full items-start gap-6'
                                        :step='protocol.hacks.length - index'
                                        :state='"completed"'
                                    >
                                        <div class='flex flex-col gap-1'>
                                            <StepperTitle class='text-sm lg:text-base font-semibold transition text-muted-foreground'>
                                                {{ hack.name }} Hack
                                            </StepperTitle>
                                            
                                            <StepperDescription class='sr-only text-foreground transition md:not-sr-only'>
                                                <Table>
                                                    <TableBody class='!mt-6'>
                                                        <TableRow v-if='hack.date'>
                                                            <TableHead>Date</TableHead>
                                                            <TableCell>{{ formatDate(hack.date) }}</TableCell>
                                                        </TableRow>
                                                        <TableRow v-if='hack.technique' class='!w-fit'>
                                                            <TableHead>Technique</TableHead>
                                                            <TableCell>{{ hack.technique }}</TableCell>
                                                        </TableRow>
                                                        
                                                        <TableRow v-if='hack.amount'>
                                                            <TableHead>Amount</TableHead>
                                                            <TableCell>{{ formatNumber(hack.amount) }}</TableCell>
                                                        </TableRow>
                                                        
                                                        <TableRow v-if='hack.returnedFunds'>
                                                            <TableHead>Returned</TableHead>
                                                            <TableCell>{{ formatNumber(hack.returnedFunds) }}</TableCell>
                                                        </TableRow>
                                                        
                                                        <template v-if='hack.chain?.length'>
                                                            <TableRow>
                                                                <TableHead>Chain</TableHead>
                                                                <TableCell>
                                                                    <template v-for='chain in hack.chain' :key='chain' >
                                                                        {{ chain }}
                                                                        <span v-if='hack.chain.length > 1'>,</span>
                                                                    </template>
                                                                </TableCell>
                                                            </TableRow>
                                                        </template>
                                                        
                                                        <TableRow v-if='hack.language'>
                                                            <TableHead>Language</TableHead>
                                                            <TableCell>{{ hack.language }}</TableCell>
                                                        </TableRow>
                                                        
                                                        <TableRow>
                                                            <TableHead>Bridge Hacked</TableHead>
                                                            <TableCell>{{ hack.bridgeHack ? 'YES' : 'NO' }}</TableCell>
                                                        </TableRow>
                                                        
                                                        <TableRow v-if='hack.source'>
                                                            <TableHead>Source</TableHead>
                                                            <TableCell>{{ hack.source }}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </StepperDescription>
                                        </div>
                                    </StepperItem>
                                </Stepper>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <!--  Right Col  -->
                    <div class='right flex flex-col gap-6 w-full 2xl:w-2/3 h-full'>
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
                            <!--   Methodology  -->
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
                                            aria-label='platform audit link'
                                            external
                                        >
                                            <Button variant='outline' aria-label='audit link button' size='lg' class='bg-accent hover:bg-accent/75'>
                                                {{ audit }}
                                                <NewTabIcon class='mb-0.5' />
                                            </Button>
                                        </NuxtLink>
                                    </CardContent>
                                </div>
                            </template>
                        </Card>
                        
                        <!--  Raises/Funding Rounds  -->
                        <Card v-if='computed_raises?.length' class='w-full !min-w-100 flex flex-col p-6 gap-6'>
                            <CardHeader>
                                <Title :tag='2' :level='4'>{{ glossary.funding_rounds.label }}</Title>
                                <CardDescription>{{ glossary.funding_rounds.description }}</CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                                <Stepper orientation='vertical' class='flex flex-col gap-10'>
                                    <StepperItem
                                        v-for='(event, index) in computed_raises'
                                        :key='index'
                                        class='relative flex items-start gap-6'
                                        :step='computed_raises.length - index'
                                        :state='"completed"'
                                    >
                                        <Card class='w-full !h-full flex-1 gap-8'>
                                            <CardHeader class='!w-full border-b'>
                                                <div class='flex justify-between items-center'>
                                                    <div class='flex flex-col'>
                                                        <StepperTitle class='font-semibold transition text-muted-foreground'>Date</StepperTitle>
                                                        <p>{{ formatDate(event.date) }}</p>
                                                    </div>
                                                    
                                                    <p class='text-primary border-b-3 border-primary text-xl'>
                                                        &#36;{{ event.amount }}M
                                                    </p>
                                                </div>
                                            </CardHeader>
                                            
                                            <CardHeader class='flex flex-col items-center'>
                                                <Title :tag='3' :level='5' class='text-primary uppercase underline'>{{ event.round || 'Funding Round' }}</Title>
                                                <Badge v-if='event.sector' variant='outline' class='text-muted-foreground'>{{ event.sector }}</Badge>
                                            </CardHeader>
                                            
                                            <div class='flex justify-center gap-12 p-6'>
                                                <!--  Lead Investors  -->
                                                <CardContent v-if='event.leadInvestors?.length' class='flex flex-col items-center gap-1'>
                                                    <div class='flex items-center gap-1 text-secondary'>
                                                        <NuxtIcon name='ph:trophy-fill' size='24' class='mb-0.5' />
                                                        <Title :tag='3' :level='6'>Lead Investors</Title>
                                                    </div>
                                                    
                                                    <Title v-for='investor in event.leadInvestors' :key='investor' :tag='4' :level='6'>
                                                        {{ investor }}
                                                    </Title>
                                                </CardContent>
                                                
                                                <!--  Other Investors  -->
                                                <CardContent v-if='event.otherInvestors?.length' class='flex flex-col gap-2'>
                                                    <div class='flex items-center gap-1'>
                                                        <NuxtIcon name='ph:flame-fill' size='24' class='mb-0.5' />
                                                        <Title :tag='3' :level='6'>Other Investors:</Title>
                                                    </div>
                                                    
                                                    <div
                                                        v-for='investor in event.otherInvestors'
                                                        :key='investor'
                                                        class='flex justify-center items-center gap-1'
                                                    >
                                                        <Badge variant='outline' class='border border-secondary/50 w-fit flex items-center gap-2'>
                                                            <NuxtIcon name='ph:buildings-duotone' size='18' />
                                                            <p>{{ investor }}</p>
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                                
                                                <CardContent v-if='event.valuation'>
                                                    Valuation: <span>{{ event.valuation }}</span>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </StepperItem>
                                </Stepper>
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
    import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle } from '~/components/ui/stepper';
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
    const computed_raises = computed(() => {
        return [...(protocol.value?.raises ?? [])].reverse();
    });
    
    // Router
    const route = useRoute();
    const id = computed(() => route.params?.id);
    
    onMounted(async() => await getDefillamaProtocol(id.value));
</script>
