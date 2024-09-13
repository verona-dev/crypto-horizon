<template>
    <div class='market component'>
        <UCard class='card'>
            <div class='flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700'>
                <UInput v-model='filter' placeholder='Filter...' />
            </div>
            
            <UTable
                :rows='filteredRows'
                :columns='columns'
                :filter='filter'
                :sort='sort'
                :loading='loading'
                class='table w-full'
                :ui="{
                    th: { base: 'sticky top-0' },
                    wrapper: { base: '' },
                }"
            >
                <template #loading-state>
                    <div class="flex items-center justify-center h-32">
                        <i class="loader --6" />
                    </div>
                </template>
                
                <template #row='props'>
                    <tr>
                        <td>{{ props.row.rank }}</td>
                        <td>{{ props.row.name }}</td>
                        <td>
                            <Icon :name='getIcon(props.row.symbol)' />
                            {{ props.row.symbol }}
                        </td>
                        <td>{{ props.row.priceUsd }}</td>
                        <td>{{ props.row.changePercent24Hr }}</td>
                        <td>{{ props.row.marketCapUsd }}</td>
                        <td>{{ props.row.volumeUsd24Hr }}</td>
                    </tr>
                </template>
            </UTable>
            <div class='table-footer'>
                <div class='results-info'>
                    <span class="text-sm leading-5">
                        Showing {{ pageFrom }} to {{ pageTo }} of {{ pageTotal }}
                    </span>
                </div>
                
                <UPagination
                    v-model='page'
                    :page-count='pageCount'
                    :total='pageTotal'
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: '!rounded-full min-w-[32px] justify-center',
                        default: {
                           activeButton: {
                              variant: 'outline'
                           }
                     }}"
                    class='pagination'
                />
            </div>
        </UCard>
    </div>

</template>

<script setup lang='ts'>
    import { ref } from 'vue';
    // CoinsStore
    import { storeToRefs } from 'pinia';
    import { useCoinsStore } from '~/stores/CoinsStore';
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
    
    const tokenIcon = computed(() => `cryptocurrency-color:${coins?.value[0]?.symbol.toLowerCase()}`);
    
    const columns = [
        {
            key: 'rank',
            label: 'Rank',
            class: 'bg-red-500/50 dark:bg-red-400/50 animate-pulse'
        },
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'symbol',
            label: 'Symbol',
        },
        {
            key: 'priceUsd',
            label: 'Price (USD)',
        },
        {
            key: 'changePercent24Hr',
            label: 'Change % (24Hr)',
        },
        {
            key: 'marketCapUsd',
            label: 'Market Cap (USD)',
        },
        {
            key: 'volumeUsd24Hr',
            label: 'Volume (24Hr)',
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
    const fetchTokens = async () => {
        const data = await fetchCoins();
        if(data) {
            coins.value = data;
            console.log('data');
            console.log('fetched');
        }
    };
    
    const getIcon = symbol => {
        const icon = `cryptocurrency-color:${symbol.toLowerCase()}`;
        console.log(icon);
        return icon;
    };
    
    onMounted(async() => {
        await fetchTokens();
    });
</script>

<style scoped lang='scss'>
    .market {
        margin: 0 auto;
        
        .card {
            background-color: transparent;
            
            .table {
                
                table {
                    //height: 600px;
                    
                    thead {
                        color: red !important;
                        th {
                            color: red !important;
                        }
                    }
                }
            }
            
            .table-footer {
                align-items: center;
                border: 1px solid var(--color-pink_french);
                display: flex;
                justify-content: space-between;
                padding: 20px;
                width: 100%;
                
                .results-info {
                    color: var(--color-pink_french);
                }
                
                .pagination {
                }
            }
        }
    }
</style>