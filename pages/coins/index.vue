<template>
    <div class='coins page'>
        <UCard
            class='card'
            :ui="{
                base: '',
                background: 'bg-white dark:bg-gray-900',
                body: {
                    base: '',
                    padding: '',
                },
            }"
        >
            <!--
                <div class='flex py-6'>
                <UInput v-model='filter' placeholder='Filter...' />
                </div>
            -->
            
            <template #header>
                <div class='flex items-center justify-center gap-2'>
                    <h2>Coins</h2>
                    <UButton
                        leading-icon='marketeq:up-trend'
                        size='xl'
                        color='pink'
                        variant='ghost'
                    />
                </div>
            </template>
            
            <UTable
                @select="onRowClick"
                :rows='formattedCoins'
                :columns='columns'
                :filter='filter'
                :sort='sort'
                :loading='loading'
                class='table'
                :ui="{
                    tr: {
                        base: 'h-16',
                    },
                    th: {
                        base: 'text-left',
                        padding: 'px-4 py-3.5',
                        color: 'text-gray-900 dark:text-white',
                        font: 'font-semibold',
                        size: 'text-sm',
                    },
                    td: {
                        base: 'whitespace-nowrap',
                        color: 'text-gray-500 dark:text-gray-200',
                        font: '',
                        size: 'text-sm',
                    },
                    emptyState: {
                        wrapper: 'flex flex-col items-center justify-center',
                        label: 'text-sm text-center text-gray-900 dark:text-white',
                        icon: 'w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4',
                    },
                }"
            >
                <!--
                    <template #row='props'>
                    <tr>
                    <td>{{ props.row.rank }}</td>
                    <td>{{ props.row.name }}</td>
                    <td>{{ props.row.symbol }}</td>
                    <td>{{ props.row.priceUsd }}</td>
                    <td>{{ props.row.changePercent24Hr }}</td>s
                    <td>{{ props.row.marketCapUsd }}</td>
                    <td>{{ props.row.volumeUsd24Hr }}</td>
                    </tr>
                    </template>
                -->
                
                <!--
                <template #loading-state>
                    <div class='flex items-center justify-center h-32'>
                        <i class="loader &#45;&#45;6" />
                    </div>
                </template>
                -->
                
                <template #empty-state>
                    <div class='h-full flex flex-col items-center'>
                        <Icon
                            name='iconoir:database-xmark'
                            size='32'
                        />
                        <p>No items.</p>
                    </div>
                </template>
                
                <template #name-data='{ row }'>
                    <div class='row-name'>
                        <Icon
                            :name='row.icon'
                            size='25'
                        />
                        <p>{{ row.name }}</p>
                        <span class='text-gray-500 dark:text-gray-400 text-sm'>{{ row.symbol }}</span>
                    </div>
                </template>
                
                <template #changePercent24Hr-data='{ row }'>
                    <span :class='row.trend'>
                        {{ row.changePercent24Hr }}%
                    </span>
                </template>
            </UTable>
            
            <template #footer>
                <div class='card-footer'>
                    <div class='results-info'>
                        <span class="text-sm leading-5">
                            Showing {{ pageFrom }} to {{ pageTo }} of {{ pageTotal }}
                        </span>
                    </div>
                    
                    <UPagination
                        v-model='page'
                        :page-count='pageCount'
                        :total='pageTotal'
                        :ui='{
                            wrapper: "py-4 flex items-center gap-1",
                            rounded: "!rounded-full min-w-[32px] justify-center",
                         }'
                        :active-button='{ variant: "outline" }'
                        :inactive-button='{ color: "gray" }'
                        class='pagination'
                        show-first
                        show-last
                        :first-button='{ icon: "i-material-symbols:first-page", label: "First", color: "gray" }'
                        :last-button='{ icon: "i-material-symbols:last-page", trailing: true, label: "Last", color: "gray" }'
                        :prev-button='{ color: "gray" }'
                        :next-button='{ color: "gray" }'
                    />
                </div>
            </template>
        </UCard>
    </div>

</template>

<script setup>
    import {ref, onMounted } from 'vue';
    import { formatNumber, formatPrice } from '~/utils/formatUtils.js';
    import { getIcon } from '~/utils/styleUtils';
    // CoinsStore
    import {storeToRefs} from 'pinia';
    import {useCoinsStore} from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    // State
    const { loading, coins } = storeToRefs(CoinsStore);
    const rows = computed(() => {
        return coins.value?.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value)
    });
    
    // Pagination
    const page = ref(1);
    const pageCount = ref(10);
    const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
    const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
    const pageTotal = computed(() => coins.value?.length);
    
    const formattedCoins = computed(() =>{
        return rows.value.map(row => ({
            ...row,
            changePercent24Hr: parseFloat(row.changePercent24Hr).toFixed(2),
            explorer: row.explorer,
            icon: getIcon(row.symbol),
            id: row.id,
            marketCap: formatNumber(row.marketCapUsd),
            maxSupply: formatNumber(row.maxSupply),
            name: row.name,
            price: formatPrice(row.priceUsd),
            supply: formatNumber(row.supply),
            symbol: row.symbol,
            trend: getTrendColor(row.changePercent24Hr),
            volume: formatNumber(row.volumeUsd24Hr),
        }))
    });
    
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
    })
    
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
    ]
    
    // const rows = [
    //     {
    //         rank: 1,
    //         name: 'Bitcoin',
    //         symbol: 'BTC',
    //         priceUsd: '56000',
    //         changePercent24Hr: '2',
    //         marketCapUsd: '1107527973266',
    //         volumeUsd24Hr: '22479085366',
    //     },
    // ];
    
    // Methods
    const {
        fetchCoincapCoins,
        setActiveCoin
    } = CoinsStore;
    
    const onRowClick = row => {
        console.log(row)
        setActiveCoin(row)
        navigateTo(`/coins/${row.symbol}`)
    };
    
    const getTrendColor = change => {
        if(Math.sign(change) === -1) {
            return '!text-red-500';
        }
        
        else if(Math.sign(change) === 0){
            return '!text-gray-500';
        }
        
        else {
            return '!text-green-500';
        }
    };
    
    onMounted(async() => {
        await fetchCoincapCoins();
    });
</script>

<style scoped lang='scss'>
    .coins {
        .card {
            height: 884px;
            width: 1200px !important;
            
            .table {
                width: 100%;
                
                .row-name {
                    align-items: center;
                    display: flex;
                    gap: 8px;
                }
                
                .positive {
                    color: green;
                }
                
                .negative {
                    color: red;
                }
            }
            
            .card-footer {
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>