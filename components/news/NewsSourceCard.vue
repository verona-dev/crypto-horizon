<template>
    <Card v-if='source' class='news-source-card rounded-md border-card-border bg-transparent shadow-2xl justify-between w-[450px] py-0 gap-8'>
        <CardHeader class='p-0'>
            <div>Launch date: {{ launch_date }}</div>
            <div>On Coindesk from: {{ created_on }}</div>
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
    
    const id = source.value?.ID;
    const benchmark_score = source.value?.BENCHMARK_SCORE;
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

</style>