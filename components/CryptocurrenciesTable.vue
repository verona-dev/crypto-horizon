<template>
    <MazTable
        size="sm"
        v-model="selectedIds"
        v-model:search-query="searchQuery"
        v-model:page="page"
        v-model:page-size="pageSize"
        search
        pagination
        color="secondary"
        sortable
        selectable
        hoverable
        background-even
        selected-key="id"
        :headers="[
      { label: 'Rank', key: 'rank', align: 'center', width: '2rem', sortable: false },
      { label: 'Name', key: 'name' },
      { label: 'Symbol', key: 'symbol' },
      { label: 'Price', key: 'priceUsd', align: 'center', classes: 'maz-font-bold' },
      { label: 'Market Cap', key: 'marketCapUsd', align: 'center' },
      { label: 'Volume (24Hr)', key: 'volumeUsd24Hr', align: 'center' },
      { label: 'Change (24Hr)', key: 'changePercent24Hr', align: 'center' },
    ]"
        :rows="coins"
    >
        <template #cell-index="{ value }">
            <span class="maz-text-base">{{value}}</span>
        </template>
        
        <template #cell-name="{ row, value }">
            <div class="maz-flex maz-items-center maz-gap-2">
                <MazAvatar :src="row.logoUrl" size="0.5rem"></MazAvatar>
                <span>{{value}}</span>
            </div>
        </template>
        
        <template #cell-type="{ value }">
            <MazBadge :color="value === 'CUP' ? 'primary' : 'secondary'">{{value}}</MazBadge>
        </template>
        
        <!--
        <template #actions>
            <MazBtn fab size="xs" color="secondary" icon="trash" />
        </template>
        -->
    </MazTable>
</template>

<script lang="ts" setup>
    import MazTable from 'maz-ui/components/MazTable';
    import { ref } from 'vue';
    import {storeToRefs} from 'pinia';
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore.js';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { coins } = storeToRefs(CryptocurrenciesStore);
    
    const data = [
        {
            "id": "bitcoin",
            "rank": "1",
            "symbol": "BTC",
            "name": "Bitcoin",
            "supply": "19874625.0000000000000000",
            "maxSupply": "21000000.0000000000000000",
            "marketCapUsd": "2084909084084.8628074109117250",
            "volumeUsd24Hr": "10485898959.8660863807774452",
            "priceUsd": "104903.0652948099804354",
            "changePercent24Hr": "-0.4352651686547121",
            "vwap24Hr": "104994.6862068282431998",
            "explorer": "https://blockchain.info/",
            "tokens": {}
        },
        {
            "id": "ethereum",
            "rank": "2",
            "symbol": "ETH",
            "name": "Ethereum",
            "supply": "120722573.1548465200000000",
            "maxSupply": null,
            "marketCapUsd": "314998049147.8291372780155737",
            "volumeUsd24Hr": "8130418601.1592967189888343",
            "priceUsd": "2609.2721594311316050",
            "changePercent24Hr": "-0.8347278073328116",
            "vwap24Hr": "2624.5875351885351522",
            "explorer": "https://etherscan.io/",
            "tokens": {}
        },
    ];
    
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
    
    const competitions = [
        {
            id: '0262672d-7c7a-4d30-866e-edb88b5a5336',
            name: 'UEFA Champions League',
            code: 'CL',
            type: 'CUP',
            areaName: 'Europe',
            matchday: 6,
            logoUrl: 'https://crests.football-data.org/CL.png',
            groups: 1,
            index: 1,
        },
        {
            id: '08d15e97-a319-4772-9b82-f1877369b40f',
            name: 'Premier League',
            code: 'PL',
            type: 'LEAGUE',
            areaName: 'England',
            matchday: 18,
            logoUrl: 'https://crests.football-data.org/PL.png',
            groups: 1,
            index: 2,
        },
    ]
    
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
</script>

<style>
    .m-table {
        width: 1000px !important;
    }
</style>