<template>
    <MazTable
        :headers='[
          { label: "#", key: "rank", align: "center", sortable: false, classes: "w-20"},
          { label: "Name", key: "name", sortable: false, classes: "min-w-[400px]"},
          { label: "Price", key: "price", align: "center", sortable: false, classes: ""},
          { label: "Market Cap", key: "marketCap", align: "center", sortable: false, classes: "" },
          { label: "Volume (24h)", key: "volume", align: "center", sortable: false, classes: "" },
          { label: "Circ. Supply", key: "c_supply", align: "center", sortable: false, classes: "" },
          { label: "24h %", key: "changePercent24Hr", align: "center", sortable: false, classes: "" },
        ]'
        :rows='coins'
        class='self-stretch'
        hoverable
        background-even
        elevation
    >
        <template #title>
            <h5>Top 100 Crypto Currencies by Market Cap</h5>
            <!--
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
            -->
        </template>
        
        <MazTableRow
            v-for='(row) in coins'
            :key='row.id'
        >
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    {{ row.rank }}
                </NuxtLink>
            </MazTableCell>
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    <div class='flex items-center gap-2'>
                        <NuxtImg
                            :src='row.image'
                            width='35'
                            class='ml-2 mr-2'
                            alt='coin logo'
                        />
                        
                        <div class='flex flex-col xl:flex-row items-start'>
                            <div class='mr-2'>{{ row.name }}</div>
                            <div class='text-maz-muted'>{{ row.symbol }}</div>
                        </div>
                    </div>
                </NuxtLink>
            </MazTableCell>
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    {{ row.price }}
                </NuxtLink>
            </MazTableCell>
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    {{ row.marketCap }}
                </NuxtLink>
            </MazTableCell>
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    {{ row.volume }}
                </NuxtLink>
            </MazTableCell>
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    {{ row.c_supply }}
                </NuxtLink>
            </MazTableCell>
            <MazTableCell>
                <NuxtLink :to='`/market/${row.id}`'>
                    <div :class='row.trend'>
                        {{ row.changePercent24Hr }}&#37;
                    </div>
                </NuxtLink>
            </MazTableCell>
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
        TODO: Add coin to watchlist
        <template #actions>
            <MazBtn fab size="xs" color="secondary" icon="trash" />
        </template>
        -->
    </MazTable>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // State
    const { loading, coins } = storeToRefs(MarketStore);
    // Methods
    const { getCoingeckoMarkets } = MarketStore;
    
    onMounted(() => {
        getCoingeckoMarkets();
    });
    
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
                row.id?.toLowerCase().includes(filter.value.toLowerCase());
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
        max-width: 1500px !important;
        
        .m-table-header {
            justify-content: center;
            padding: 50px 0;
        }
        
        .m-table-cell {
            font-size: 0.9rem !important;
            text-align: center;
        }
        
        thead {
            background-color: var(--primary-foreground);
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