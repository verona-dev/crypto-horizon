<template>
    <Card v-if='source' class='news-source-card flex flex-col items-center gap-12 rounded-md border-none hover:shadow-2xl w-3xl py-12'>
        <h2>{{ name }}</h2>
        
        <CardContent class='flex justify-around w-full'>
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
                        class='h-[275px] w-[275px]'
                    />
                </NuxtImg>
            </NuxtLink>
            
            <div class='flex flex-col'>
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
            </div>
        </CardContent>
        
        <CardFooter class='flex justify-center'>
            <!--  Read more  -->
            <Button as-child variant='link' class='uppercase hover:text-foreground'>
                <NuxtLink :to='url' target='_blank'>
                    Visit Source
                </NuxtLink>
            </Button>
        </CardFooter>
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
        
        &:hover {
            background-color: var(--card-small);
        }
        
        img.main-image {
            //object-fit: contain;
            //height: 100%;
            height: 275px;
            width: 275px;
            //width: 100%;
        }
    }
</style>