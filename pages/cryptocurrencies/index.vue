<template>
    <div class='coins page'>
        <CryptocurrenciesTable />
    </div>
</template>

<script setup>
    import {ref, onMounted } from 'vue';
    import {storeToRefs} from 'pinia';
    import {useCoinsStore} from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    import CryptocurrenciesTable from '~/components/CryptocurrenciesTable.vue';
    
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
    const { fetchCoincapMarket } = CoinsStore;
    
    const onRowClick = row => navigateTo(`/cryptocurrencies/${row.id.toLowerCase()}`);
    
    onMounted(async() => await fetchCoincapMarket());
</script>

<style scoped>
    .coins {}
</style>