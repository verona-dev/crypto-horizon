<template>
    <div v-if='nft' class=''>
        {{ nft.name }}
    </div>
</template>

<script setup>
    const props = defineProps({
       nft: {
           type: Object,
       }
    });
    
    const { nft } = toRefs(props);
</script>