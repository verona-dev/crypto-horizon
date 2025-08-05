<template>
    <Card v-if='source' class='news-source-card rounded-md border-none bg-transparent shadow-2xl w-7xl py-0'>
        <NuxtLink :to='url' target='_blank'>
            <CardHeader class='px-6 py-10 flex items-center gap-8'>
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
                        class='h-[200px] w-full'
                    />
                </NuxtImg>
                
                <div class='flex flex-col items-start gap-2'>
                    <h3>{{ name }}</h3>
                    <span>Launch date: {{ launch_date }}</span>
                    <span>On Coindesk from: {{ created_on }}</span>
                    <span>Last update: {{ last_updated }}</span>
                    <p>Score: {{ benchmark_score }}</p>
                    <div v-if='lang' class='flex items-center gap-2'>
                        <p>Language:</p>
                        <NuxtIcon  :name="`circle-flags:lang-${lang.toLowerCase()}`" size='20px' />
                    </div>
                    <p>Status: {{ status }}</p>
                    <p>Source type: {{ source_type }}</p>
                </div>
            </CardHeader>
        </NuxtLink>
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Button } from '@/components/ui/button';
    
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
            height: 300px;
            //width: 100%;
        }
    }
</style>