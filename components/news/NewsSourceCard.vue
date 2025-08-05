<template>
    <div class='news-source-card'>
        {{ id }}
    </div>
</template>

<script setup>
    const props = defineProps({
        source: {}
    });
    
    const { source } = toRefs(props);
    
    const id = source.value?.ID;
    const benchmark_score = source.value?.BENCHMARK_SCORE;
    const created_on = source.value?.CREATED_ON;
    const img_url = source.value?.IMAGE_URL;
    const lang = source.value?.LANG;
    const last_updated = source.value?.LAST_UPDATED_TS;
    const launch_date = source.value?.LAUNCH_DATE;
    const name = source.value?.NAME;
    const source_type = source.value?.SOURCE_TYPE;
    const status = source.value?.STATUS;
    const updated_on = source.value?.UPDATED_ON;
    const url = source.value?.URL;
</script>

<style scoped>

</style>