<template>
    <div
        v-if='myData.length'
        class='coin-chart w-10/12 my-10 mx-auto'
    >
        <LineChart
            :data='myData'
            :categories='categories'
            :xFormatter='xFormatter'
            curveType='linear'
            :yGridLine='true'
            :hideLegend='true'
        />
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    
    const props = defineProps({
        chartData: {
            type: Object,
            required: true
        }
    });
    const { chartData } = toRefs(props);
    const myData = ref([]);
    const xFormatter = (i) => dayjs(myData.value[i].time).format('D. MMM');
    
    const categories = {
        price: {
            name: 'Price',
            color: '#4eec4e',
        },
    };
    
    onMounted(() => {
        chartData.value?.prices?.forEach((item, index) => {
            // Skip the last data-item because it contains double timestamps for the last day (2am and current)
            if (index === chartData.value?.prices.length - 1) return;
            
            myData.value.push({
                label: dayjs(item[0]).format('MMM D, YYYY, HH:mm'),
                time: item[0],
                price: item[1],
            });
        });
        
        // console.log(JSON.parse(JSON.stringify(myData.value)));
    });
</script>

<style>
    :root {
        --tooltip-label-color: var(--muted-foreground) !important;
        --tooltip-value-color: var(--foreground) !important;
        
        --vis-axis-grid-color: var(--muted) !important;
        
        --vis-tooltip-background-color: var(--card-small) !important;
        --vis-tooltip-border-color: none !important;
        --vis-axis-tick-label-color: var(--muted-foreground) !important;
        
    }
</style>