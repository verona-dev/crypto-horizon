<template>
    <MazTable
        :headers='[
          { label: "#", key: "rank", align: "center", sortable: false, classes: "", },
          { label: "Name", key: "name", sortable: false, classes: "", },
          { label: "Price", key: "price", align: "center", sortable: false, classes: "",},
          { label: "Market Cap", key: "marketCap", align: "center", sortable: false, classes: "", },
          { label: "24h Volume", key: "volume", align: "center", sortable: false, classes: "", },
          { label: "Circ. Supply", key: "c_supply", align: "center", sortable: false, classes: "", },
          { label: "24h %", key: "changePercent24Hr", align: "center", sortable: false, classes: "", },
        ]'
        :rows='coins'
        class='my-20 w-[1000px] xl:w-[1200px] mx-auto'
        :loading='loading'
        color='secondary'
        hoverable
        background-even
    >
        <template #title>
            <MazAnimatedText
                tag='h5'
                text='Top 20 Crypto Currencies by '
                last-word='Market Cap'
                :delay='1000'
                :duration='2000'
                direction='up'
                :column-gap='0.5'
                :row-gap='0.5'
            />
        </template>
        
        <MazTableRow
            v-for='(row) in coins'
            :key='row.id'
            @click='onRowClick(row)'
        >
            <MazTableCell>{{ row.rank }}</MazTableCell>
            <MazTableCell>
                <div class='flex items-center gap-2'>
                    <NuxtIcon
                        :name='row.icon'
                        size='30'
                    />
                    
                    <div class='flex flex-col items-start'>
                        <span>{{ row.name }}</span>
                        <span>{{ row.symbol }}</span>
                    </div>
                </div>
            </MazTableCell>
            <MazTableCell>{{ row.price }}</MazTableCell>
            <MazTableCell>{{ row.marketCap }}</MazTableCell>
            <MazTableCell>{{ row.volume }}</MazTableCell>
            <MazTableCell>{{ row.c_supply }}</MazTableCell>
            <MazTableCell>
                <div :class='row.trend'>
                    <span>{{ row.changePercent24Hr }}&#37;</span>
                </div></MazTableCell>
        </MazTableRow>
        
        <template #no-results>
            <div class='h-[800px] flex flex-col justify-center items-center'>
                <h4 class='fetching'>Fetching data...</h4>
                
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
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { loading, coins } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { fetchCoinLore, } = CryptocurrenciesStore;
    
    onMounted(() => fetchCoinLore('tickers', { limit: 20 }));
    
    const onRowClick = row => navigateTo(`/cryptocurrencies/${row.symbol}`);
    
    // Pagination
    /*
    const page = ref(1); // current page
    const pageSize = ref(10); // number of items per page
    const totalPages = computed(() => coins.value?.length / pageSize);
    const pageTotal = computed(() => rows.value?.length);
    const totalItems = computed(() => coins.value?.length);
    
    const rows = computed(() => {
        return coins.value?.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    });
    
    const pageFrom = computed(() => (page.value - 1) * pageSize.value + 1);
    const pageTo = computed(() => Math.min(page.value * pageSize.value, totalItems.value))
    */
    
    // Filter
    /*
    const filter = ref('');
    const filteredRows = computed(() => {
        return rows.value.filter(row => {
            return row.name.toLowerCase().includes(filter.value.toLowerCase()) ||
                row.symbol?.toLowerCase().includes(filter.value.toLowerCase());
        })
    });
    
        // Sort
    const sort = ref({
        column: '',
        direction: 'desc'
    });
    */
</script>

<style>
    .m-table {
        .m-table-header {
            justify-content: center;
            padding: 50px 0;
        }
        
        .m-table-cell {
            font-size: 0.9rem !important;
            text-align: center;
        }
        
        thead {
            background-color: var(--tertiary);
            height: 75px;
        }
        
        tbody {
            td {
                padding: 20px 0 !important;
            }
        }
        
        .m-select-list {
            max-height: fit-content !important;
        }
        
        .m-table-footer {
            padding: 20px;
        }
        
        h4.fetching {
            color: var(--maz-color-muted);
        }
    }
</style>