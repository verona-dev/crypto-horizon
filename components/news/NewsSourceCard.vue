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
    console.log(id);
</script>

<style scoped>

</style>