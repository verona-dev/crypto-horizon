<template>
    <Card v-if='source' class='news-source-card rounded-md border-card-border bg-transparent shadow-2xl justify-between w-[450px] py-0 gap-8'>
        <CardHeader class='p-0'>
            <!--  Main image  -->
            <NuxtImg
                :src='img_url'
                alt='article image'
                class='main-image rounded-md rounded-b-none'
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
            
            <p>Name: {{ name }}</p>
            <span>Launch date: {{ launch_date }}</span>
            <span>On Coindesk from: {{ created_on }}</span>
            <p>Score: {{ benchmark_score }}</p>
        </CardHeader>
    </Card>
</template>

<script setup>
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { Badge } from '@/components/ui/badge';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
    import { Button } from '@/components/ui/button';
    
    const props = defineProps({
        source: {}
    });
    
    const { source } = toRefs(props);
    
    const benchmark_score = computed(() => source.value?.BENCHMARK_SCORE > 0 ? source.value.BENCHMARK_SCORE : '-');
    const created_on = dayjs.unix(source.value?.CREATED_ON).format('MMMM D, YYYY');
    const img_url = source.value?.IMAGE_URL;
    const lang = source.value?.LANG;
    const last_updated = source.value?.LAST_UPDATED_TS;
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
    img.main-image {
        //object-fit: contain;
        //height: 100%;
        height: 200px;
        //width: 100%;
    }
}
</style>