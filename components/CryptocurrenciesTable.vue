<template>
    <MazTable
        :headers='[
          { label: "Rank", key: "rank", align: "center", sortable: false, classes: "w-24", },
          { label: "Name", key: "name", sortable: false, classes: "w-72", },
          { label: "Symbol", key: "symbol", sortable: false, classes: "w-24", },
          { label: "Price", key: "price", align: "center", sortable: false, classes: "w-32",},
          { label: "Market Cap", key: "marketCap", align: "center", sortable: false, classes: "w-32", },
          { label: "Volume (24Hr)", key: "volume", align: "center", sortable: false, classes: "w-32", },
          { label: "Circ. Supply", key: "c_supply", align: "center", sortable: false, classes: "w-32", },
          { label: "Change (24Hr)", key: "changePercent24Hr", align: "center", sortable: false, classes: "w-32", },
        ]'
        :rows='rows'
        class='my-20'
        :loading='loading'
        color='secondary'
        hoverable
        background-even
    >
        <template #cell-name='{ row, value }'>
            <div class='maz-flex maz-items-center maz-gap-2'>
                <NuxtIcon
                    :name='row.icon'
                    size='25'
                />
                <span>{{value}}</span>
            </div>
        </template>
        
        <template #cell-changePercent24Hr='{ row, value }'>
            <div :class='row.trend'>
                <span>{{value}}</span>
            </div>
        </template>
        
        <template #no-results>
            <div class='flex flex-col justify-center items-center'>
                <h4>Fetching data...</h4>
                
                <div class='flex items-center justify-center h-32'>
                    <MazSpinner color='secondary' size='4em' />
                </div>
            </div>
        </template>
        
        <!--
        <template #actions>
            <MazBtn fab size="xs" color="secondary" icon="trash" />
        </template>
        -->
    </MazTable>
</template>

<script setup>
    import { ref } from 'vue';
    import {storeToRefs} from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { loading, coins } = storeToRefs(CryptocurrenciesStore);
    
    // Pagination
    const page = ref(1);
    const pageCount = ref(20);
    const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
    const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
    const pageTotal = computed(() => coins.value?.length);
    
    // Filter
    /*
    const filter = ref('');
    const filteredRows = computed(() => {
        return rows.value.filter(row => {
            return row.name.toLowerCase().includes(filter.value.toLowerCase()) ||
                row.symbol?.toLowerCase().includes(filter.value.toLowerCase());
        })
    });
    */
    
    // Sort
    const sort = ref({
        column: '',
        direction: 'desc'
    });
    
    const rows = computed(() => {
        return coins.value?.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    });
    
    const columns = [
        {
            key: 'rank',
            label: '#',
            class: 'w-16 bg-red-500/50 dark:bg-red-400/50 animate-pulse'
        },
        {
            key: 'name',
            label: 'Name',
            class: 'w-96 text-left'
        },
        {
            key: 'price',
            label: 'Price',
            class: 'w-36'
        },
        {
            key: 'changePercent24Hr',
            label: '24h %',
            class: 'w-36'
        },
        {
            key: 'marketCap',
            label: 'Market Cap',
            class: 'w-44'
        },
        {
            key: 'volume',
            label: 'Volume (24h)',
            class: 'w-36'
        },
    ];
</script>

<style>
    .m-table {
        //width: 1200px !important;
    }
    
    tbody {
        height: 800px;
    }
    
    h4 {
        color: var(--maz-color-muted);
    }
</style>