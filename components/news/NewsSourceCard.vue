<template>
    <Card v-if='source' class='news-source-card rounded-md border-none bg-transparent shadow-2xl w-3xl py-0'>
            <CardHeader class='px-6 py-10 flex items-center gap-12'>
                <!--  Main image  -->
                <NuxtLink :to='url' target='_blank'>
                    <NuxtImg
                        :src='img_url'
                        alt='article image'
                        class='main-image rounded-md'
                        :custom='true'
                        v-slot='{ src, isLoaded, imgAttrs }'
                        preload
                    >
                        <img
                            v-if='isLoaded'
                            v-bind='imgAttrs'
                            :src='src'
                            alt='article image'
                        >
                        
                        <Skeleton
                            v-else
                            class='h-[250px] w-[250px]'
                        />
                    </NuxtImg>
                </NuxtLink>
                
                <div class='flex flex-col'>
                    <h3>{{ name }}</h3>
                    
                    <Table>
                        <TableCaption>Source details.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[100px]">
                                    Name
                                </TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                            <!--  Launch Date  -->
                            <TableRow>
                                <TableCell class='font-medium'>Launch date</TableCell>
                                <TableCell>{{ launch_date }}</TableCell>
                            </TableRow>
                             <!--  On Coindesk from  -->
                            <TableRow v-if='created_on'>
                                <TableCell class='font-medium'>On Coindesk from</TableCell>
                                <TableCell>{{ created_on }}</TableCell>
                            </TableRow>
                            <!--  Last update  -->
                            <TableRow v-if='last_updated'>
                                <TableCell class='font-medium'>Last update</TableCell>
                                <TableCell>{{ last_updated }}</TableCell>
                            </TableRow>
                            <!--  Benchmark Score  -->
                            <TableRow v-if='benchmark_score'>
                                <TableCell class='font-medium'>Score</TableCell>
                                <TableCell>{{ benchmark_score }}</TableCell>
                            </TableRow>
                            <!--  Language  -->
                            <TableRow v-if='lang'>
                                <TableCell class='font-medium'>Language</TableCell>
                                <TableCell>
                                    <NuxtIcon  :name="`circle-flags:lang-${lang.toLowerCase()}`" size='20px' />
                                </TableCell>
                            </TableRow>
                            <!--  Status  -->
                            <TableRow v-if='lang'>
                                <TableCell class='font-medium'>Status</TableCell>
                                <TableCell>{{ status }}</TableCell>
                            </TableRow>
                            <!--  Source type  -->
                            <TableRow v-if='lang'>
                                <TableCell class='font-medium'>Source type</TableCell>
                                <TableCell>{{ source_type }}</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </div>
            </CardHeader>
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Button } from '@/components/ui/button';
    import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
    } from '@/components/ui/table';
    
    const props = defineProps({
        source: {}
    });
    
    const { source } = toRefs(props);
    
    const benchmark_score = computed(() => source.value?.BENCHMARK_SCORE > 0 ? source.value.BENCHMARK_SCORE : '-');
    const created_on = dayjs.unix(source.value?.CREATED_ON).format('MMMM D, YYYY');
    const img_url = source.value?.IMAGE_URL;
    const lang = source.value?.LANG;
    const last_updated = computed(() => {
        return dayjs.unix(source.value?.LAST_UPDATED_TS).format('MMMM D, YYYY, h:mma');
    });
    const launch_date = computed(() => {
        if(source.value?.LAUNCH_DATE) {
            return dayjs.unix(source.value?.LAUNCH_DATE).format('MMMM D, YYYY');
        }
        return 'Unknown';
    });
    const name = source.value?.NAME;
    const source_type = source.value?.SOURCE_TYPE;
    const status = source.value?.STATUS;
    const updated_on = source.value?.UPDATED_ON;
    const url = source.value?.URL;
</script>

<style scoped>
    .news-source-card {
        &:hover {
            background-color: var(--card-border);
        }
        
        img.main-image {
            //object-fit: contain;
            //height: 100%;
            height: 250px;
            width: 250px;
            //width: 100%;
        }
    }
</style>