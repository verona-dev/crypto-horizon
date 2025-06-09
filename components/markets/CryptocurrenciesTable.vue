<template>
    <section>
        <MazTable
            :headers='[
          { label: "Rank", key: "rank", align: "center", sortable: false, classes: "", },
          { label: "Name", key: "name", sortable: false, classes: "", },
          { label: "Price", key: "price", align: "center", sortable: false, classes: "",},
          { label: "Market Cap", key: "marketCap", align: "center", sortable: false, classes: "", },
          { label: "Volume (24Hr)", key: "volume", align: "center", sortable: false, classes: "", },
          { label: "Circ. Supply", key: "c_supply", align: "center", sortable: false, classes: "", },
          { label: "Change (24Hr)", key: "changePercent24Hr", align: "center", sortable: false, classes: "", },
        ]'
            :rows='coins'
            class='my-20 xl:w-[1200px] mx-auto'
            :loading='loading'
            color='secondary'
            pagination
            :page='page'
            :page-size='pageCount'
            hoverable
            background-even
        >
            <template #title>
                <!--            <h5 class=''>Top 100 Crypto Currencies by Market Cap</h5>-->
                <MazAnimatedText
                    tag='h5'
                    text='Top 100 Crypto Currencies by '
                    last-word='Market Cap'
                    :delay='1000'
                    :duration='2000'
                    direction='up'
                    :column-gap='0.5'
                    :row-gap='0.5'
                />
            </template>
            
            <template #cell-name='{ row, value }'>
                <div class='flex items-center gap-2'>
                    <NuxtIcon
                        :name='row.icon'
                        size='30'
                    />
                    
                    <div class='flex flex-col'>
                        <span>{{value}}</span>
                        <MazAnimatedText
                            tag='span'
                            :text='row.symbol'
                            :delay='1000'
                            :duration='2000'
                            direction='up'
                            :column-gap='0.5'
                            :row-gap='0.5'
                        />
                        <!--                    <span class='text-sm text-gray-400'>{{ row.symbol }}</span>-->
                    </div>
                </div>
            </template>
            
            <template #cell-changePercent24Hr='{ row, value }'>
                <div :class='row.trend'>
                    <span>{{value}}&#37;</span>
                </div>
            </template>
            
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
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { loading, coins } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { fetchCoinLoreData } = CryptocurrenciesStore;
    onMounted(() => fetchCoinLoreData('tickers'));
    
    // Pagination
    const page = ref(1);
    const pageCount = ref(10);
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
    
    const onRowClick = row => navigateTo(`/cryptocurrencies/${row.id.toLowerCase()}`);
</script>

<style>
    .m-table {
        .m-table-header {
            justify-content: center;
            padding: 50px 0;
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