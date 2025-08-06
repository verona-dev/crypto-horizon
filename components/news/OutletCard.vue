<template>
    <Card v-if='source' class='news-source-card flex items-center shadow-lg hover:shadow-2xl w-md h-[650px] gap-0 cursor-text'>
        <h3 class='mt-24 mb-4 hover-underline text-wrap'>{{ name }}</h3>
        
        <div class='card-container h-full w-full'>
            <div class='card-inner'>
                <div class='card-front'>
                    <!--  Main image  -->
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
                            class='h-[200px] w-[200px]'
                        />
                    </NuxtImg>
                </div>
                
                <div class='card-back bg-card flex flex-col gap-12'>
                    <CardContent class='w-4/5 px-0'>
                        <Table>
                            <TableBody>
                                <!--  Benchmark Score  -->
                                <TableRow v-if='benchmark_score'>
                                    <TableCell class='font-medium'>Score</TableCell>
                                    <TableCell>{{ benchmark_score }}</TableCell>
                                </TableRow>
                                <!--  Launch Date  -->
                                <TableRow>
                                    <TableCell class='font-medium'>Launch date</TableCell>
                                    <TableCell>{{ launch_date }}</TableCell>
                                </TableRow>
                                <!--  On Coindesk from  -->
                                <TableRow v-if='created_on'>
                                    <TableCell class='font-medium'>Coindesk listing</TableCell>
                                    <TableCell>{{ created_on }}</TableCell>
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
                    </CardContent>
                    
                    <CardFooter class='flex justify-center mt-6'>
                        <!--  Read more  -->
                        <Button as-child variant='link' class='uppercase hover:text-foreground'>
                            <NuxtLink :to='url' target='_blank' external>
                                Visit Outlet
                            </NuxtLink>
                        </Button>
                    </CardFooter>
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardContent, CardFooter } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Button } from '@/components/ui/button';
    
    import {
        Table,
        TableBody,
        TableCell,
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
    const launch_date = computed(() => {
        if(source.value?.LAUNCH_DATE) {
            return dayjs.unix(source.value?.LAUNCH_DATE).format('MMMM D, YYYY');
        }
        return 'Unknown';
    });
    const name = source.value?.NAME;
    const source_type = source.value?.SOURCE_TYPE;
    const status = source.value?.STATUS;
    
    const source_url = source.value?.URL;
    const url = computed(() => {
        let url = new URL(source_url);
        let protocol = url.protocol;
        let host = url.host;
        
        return `${protocol}//${host}`;
    });
</script>

<style scoped>
    .news-source-card {
        .card-inner {
            width: 100%;
            height: 100%;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        
        .card-front,
        .card-back {
            position: absolute;
            width: 100%;
            backface-visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-front {
            height: 350px;
        }
        
        .card-back {
            height: 450px;
            transform: rotateY(180deg);
        }
        
        img.main-image {
            height: 250px;
            width: 250px;
        }
        
        &:hover {
            border: 1px solid var(--card-border);
        }
        
        &:hover .card-inner {
            transform: rotateY(180deg);
        }
        
        .hover-underline {
            position: relative;
        }
        
        .hover-underline::after,
        .hover-underline::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, var(--destructive-foreground), var(--secondary));
            bottom: -15px;
            left: 0;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.6s ease-out;
        }
        
        .hover-underline::before {
            top: -15px;
            transform-origin: left;
        }
        
        &:hover .hover-underline::after,
        &:hover .hover-underline::before {
            transform: scaleX(1);
        }
    }
</style>