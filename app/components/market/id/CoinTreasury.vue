<template>
    <TreasuriesTable v-if='coinTreasury' :data='coinTreasury.companies' class='font-mono w-[97%] mx-auto' />
</template>

<script setup>
    import TreasuriesTable from '~/components/market/TreasuriesTable.vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true
        }
    });
    
    const { coin } = toRefs(props);
    const coinTreasury = computed(() => coin.value?.publicTreasury || null);
</script>
