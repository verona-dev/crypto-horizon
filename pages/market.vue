<template>
    <div class='market component'>
        <h2>Market</h2>
    </div>

</template>

<script setup lang='ts'>
    import { ref, onMounted } from 'vue';
    // CoinsStore
    import { storeToRefs } from 'pinia';
    import { useCoinsStore } from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    
    // State
    const { loading, coins } = storeToRefs(CoinsStore);
    
    const tokenIcon = computed(() => `cryptocurrency-color:${coins?.value[0]?.symbol.toLowerCase()}`);
    
    const columns = [
        {
            key: 'rank',
            label: 'Rank',
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
        
        .card {
            //width: 1500px !important;
            
            .table {
                //width: 100% !important;
                
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
            }
            
            .table-footer {
                align-items: center;
                display: flex;
                justify-content: space-between;
                padding: 20px;
                width: 100%;
                
                .results-info {
                    color: var(--color-aqua);
                }
            }
        }
    }
</style>