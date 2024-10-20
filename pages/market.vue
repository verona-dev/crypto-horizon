<template>
    <div class='market page'>
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
            
            <UTable
                :rows='filteredRows'
                :columns='columns'
                :filter='filter'
                :sort='sort'
                :loading='loading'
                class='table'
                :ui="{
                    wrapper: 'h-full',
                    base: 'w-full',
                    tbody: 'h-full',
                    tr: {
                        base: 'h-16',
                    },
                    th: {
                        base: '',
                        padding: 'px-4 py-3.5',
                        color: 'text-gray-900 dark:text-white',
                        font: 'font-semibold',
                        size: 'text-sm',
                    },
                    td: {
                        base: 'whitespace-nowrap text-center',
                        padding: 'px-0 py-4',
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
                
                <template #caption>
                    <caption class='py-6 text-gray-900 dark:text-white'>Market</caption>
                </template>
                
                <template #rank-data='{ row }'>
                    <span>{{ row.rank }}</span>
                </template>
                
                <template #name-data='{ row }'>
                    <div class='row-name text-left'>
                        <Icon
                            :name='getIcon(row.symbol)'
                            size='25'
                        />
                        <p>{{ row.name }}</p>
                        <span class='text-gray-500 dark:text-gray-400 text-sm'>{{ row.symbol }}</span>
                    </div>
                </template>
                
                <template #priceUsd-data='{ row }'>
                    <span>{{ formatPrice(row.priceUsd) }}</span>
                </template>
                
                <template #changePercent24Hr-data='{ row }'>
                    <span class='text-red-500' :class='getTrendColor(row.changePercent24Hr)'>
                        {{ parseFloat(row.changePercent24Hr).toFixed(2) }}%
                    </span>
                </template>
                
                <template #marketCapUsd-data='{ row }'>
                    <span>{{ formatNumber(row.marketCapUsd) }}</span>
                </template>
                
                <template #volumeUsd24Hr-data='{ row }'>
                    <span>{{ formatNumber(row.volumeUsd24Hr) }}</span>
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
                            wrapper: "flex items-center gap-1",
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

<script setup lang='ts'>
    import {ref} from 'vue';
    // CoinsStore
    import {storeToRefs} from 'pinia';
    import {useCoinsStore} from '~/stores/CoinsStore';
    
    const CoinsStore = useCoinsStore();
    
    // State
    const { loading, coins } = storeToRefs(CoinsStore);
    const page = ref(1);
    const pageCount = ref(10);
    const pageTotal = computed(() => coins.value?.length);
    const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
    const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
    
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
            key: 'priceUsd',
            label: 'Price',
            class: 'w-36'
        },
        {
            key: 'changePercent24Hr',
            label: '24h %',
            class: 'w-36'
        },
        {
            key: 'marketCapUsd',
            label: 'Market Cap',
            class: 'w-44'
        },
        {
            key: 'volumeUsd24Hr',
            label: 'Volume (24h)',
            class: 'w-36'
        },
    ]
    
    // Filter
    const filter = ref('');
    const filteredRows = computed(() => {
        return rows.value.filter(row => {
            return row.name.toLowerCase().includes(filter.value.toLowerCase()) ||
                row.symbol?.toLowerCase().includes(filter.value.toLowerCase());
        })
    });
    
    // Sort
    const sort = ref({
        column: '' as const,
        direction: 'desc' as const
    })
    
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
    //     {
    //         rank: 2,
    //         name: 'Ethereum',
    //         symbol: 'ETH',
    //         priceUsd: '4000',
    //         changePercent24Hr: '1',
    //         marketCapUsd: '22479085366',
    //         volumeUsd24Hr: '22479085366',
    //     },
    // ];
    
    // Methods
    const { fetchCoins } = CoinsStore;
    const getIcon = symbol => `cryptocurrency-color:${symbol.toLowerCase()}`;
    
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
    
    const formatPrice = number => {
        const options = {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "USD"
        };
        
        return parseFloat(number).toLocaleString('en-US', options);
    };
    
    const formatNumber = number => {
        const options = {
            minimumFractionDigits: 0,
            style: "currency",
            currency: "USD"
        };
        
        return parseInt(number).toLocaleString('en-US', options);
    };
    
    const fetchTokens = async () => {
        const data = await fetchCoins();
        if(data) {
            coins.value = data;
        }
    };
    
    onMounted(async() => {
        await fetchTokens();
    });
</script>

<style scoped lang='scss'>
    .market {
        
        .card {
            height: 864px;
            
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
                padding: 10px 0;
            }
        }
    }
</style>