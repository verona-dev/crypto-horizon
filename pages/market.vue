<template>
    <div class='market page'>
        <h1 class="text-3xl font-bold underline !text-green-500">
            Hello Market!
        </h1>
        <UCard
            class='card'
        >
            <!--            <div class='flex py-6'>
                            <UInput v-model='filter' placeholder='Filter...' />
                        </div>-->
            
            <UTable
                :rows='filteredRows'
                :columns='columns'
                :filter='filter'
                :sort='sort'
                :loading='loading'
                class='table'
                :ui='{
                    base: "h-full",
                    // tbody: "w-full h-full",
                }'
            >
                
                <!--
                <template #row='props'>
                <tr>
                <td>{{ props.row.rank }}</td>
                <td>{{ props.row.name }}</td>
                <td>{{ props.row.symbol }}</td>
                <td>{{ props.row.priceUsd }}</td>
                <td>{{ props.row.changePercent24Hr }}</td>
                <td>{{ props.row.marketCapUsd }}</td>
                <td>{{ props.row.volumeUsd24Hr }}</td>
                </tr>
                </template>
                -->
                <template #loading-state>
                    <div class='flex items-center justify-center h-32'>
                        <i class='loader --6' />
                    </div>
                </template>
                
                <template #name-data='{ row }'>
                    <p class='row-name w-[300px]'>
                        <Icon
                            :name='getIcon(row.symbol)'
                            size='25'
                        />
                        <span>{{ row.name }}</span>
                        <span class='text-gray-500 dark:text-gray-400 text-sm'>{{ row.symbol }}</span>
                    </p>
                </template>
                
                <template #priceUsd-data='{ row }'>
                    <span>${{ parseFloat(row.priceUsd).toFixed(2) }}</span>
                </template>
                
                <template #changePercent24Hr-data='{ row }'>
                    <span class='text-red-500' :class='getChangeClass(row.changePercent24Hr)'>
                        {{ parseFloat(row.changePercent24Hr).toFixed(2) }}%
                    </span>
                </template>
                
                <template #marketCapUsd-data='{ row }'>
                    <span>{{ parseFloat(row.marketCapUsd).toFixed(0) }}</span>
                </template>
                
                <template #volumeUsd24Hr-data='{ row }'>
                    <span>{{ Math.trunc(row.volumeUsd24Hr) }}</span>
                </template>
            </UTable>
            
            <template #footer>
                <div
                    v-if='coins.length'
                    class='table-footer'
                >
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
            class: 'bg-red-500/50 dark:bg-red-400/50 animate-pulse'
        },
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'priceUsd',
            label: 'Price (USD)',
        },
        {
            key: 'changePercent24Hr',
            label: '24h %',
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
    const getIcon = symbol => `cryptocurrency-color:${symbol.toLowerCase()}`;
    const getChangeClass = change => {
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
    
    const { fetchCoins } = CoinsStore;
    
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
        gap: 30px;
        
        .card {
            border:1px solid coral;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 850px;
            width: 1200px !important;
            
            .table {
                border:1px solid darkgreen;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 700px;
                
                .row-name {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                table {
                    
                    thead {
                        color: red !important;
                        width: 100% !important;
                        
                        th {
                            color: red !important;
                            width: 100% !important;
                        }
                    }
                }
                
                .positive {
                    color: green;
                }
                
                .negative {
                    color: red;
                }
            }
            
            .table-footer {
                align-items: center;
                display: flex;
                justify-content: space-between;
                height: 75px;
                padding: 20px 0;
                
                .results-info {
                    //color: var(--color-aqua);
                }
            }
        }
    }
</style>