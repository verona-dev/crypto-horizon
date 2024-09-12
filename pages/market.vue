<template>
    <div class='market component'>
        Market
        
<!--
        <Icon :name='tokenIcon' />
        {{coins[0]?.id}}
        -->
        
        <UTable
            :rows='rows'
            :columns='columns'
            :loading='loading'
        >
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
                
<!--                <div class='flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700'>-->
<!--                    <UPagination v-model='page' :page-count='pageCount' :total='coins.length' />-->
<!--                </div>-->
            </template>
            
            <template>
                <UPagination
                    v-model='page'
                    :page-count='pageCount'
                    :total='coins.length'
                />
            </template>
        </UTable>
    </div>

</template>

<script setup>
    import { ref } from 'vue';
    // CoinsStore
    import { storeToRefs } from 'pinia';
    import { useCoinsStore } from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    // State
    const { loading, coins } = storeToRefs(CoinsStore);
    const page = ref(1);
    const pageCount = 5;
    const rows = computed(() => {
        return coins.value?.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    });
    const total = computed(() => coins.value?.length);
    
    const tokenIcon = computed(() => `cryptocurrency-color:${coins?.value[0]?.symbol.toLowerCase()}`);
    
    const columns = [
        {
            key: 'rank',
            label: 'Rank'
        },
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'symbol',
            label: 'Symbol'
        },
        {
            key: 'priceUsd',
            label: 'Price (USD)'
        },
        {
            key: 'changePercent24Hr',
            label: 'Change % (24Hr)'
        },
        {
            key: 'marketCapUsd',
            label: 'Market Cap (USD)'
        },
        {
            key: 'volumeUsd24Hr',
            label: 'Volume (24Hr)'
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
        table {
            thead {
                color: red !important;
                th {
                    color: red !important;
                }
            }
            tbody {}
            
        }
    }
</style>