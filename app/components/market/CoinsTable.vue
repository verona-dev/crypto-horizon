<template>
    <div class='flex flex-col gap-12'>
        <h3 class='tracking-widest'>Cryptocurrency Prices by Market Cap </h3>
        
        <div class='w-full h-180 flex flex-col gap-4'>
            <div class='border rounded-md h-120 flex flex-col flex-2/3 overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow v-for='headerGroup in table.getHeaderGroups()' :key='headerGroup.id'>
                            <TableHead v-for='header in headerGroup.headers' :key='header.id'>
                                <FlexRender
                                    v-if='!header.isPlaceholder' :render='header.column.columnDef.header'
                                    :props='header.getContext()'
                                />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        <template v-if='table.getRowModel().rows?.length'>
                            <TableRow
                                v-for='row in table.getRowModel().rows'
                                :key='row.id'
                                :data-state='row.getIsSelected() ? "selected" : undefined'
                            >
                                <TableCell
                                    v-for='cell in row.getVisibleCells()'
                                    :key='cell.id'
                                >
                                    <FlexRender
                                        :render='cell.column.columnDef.cell'
                                        :props='cell.getContext()'
                                    />
                                </TableCell>
                            </TableRow>
                        </template>
                        
                        <template v-else>
                            <TableRow>
                                <TableCell :colspan="columns.length" class="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        </template>
                    </TableBody>
                </Table>
            </div>
        </div>
        
        
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
            :rows='oldCoins'
            class=''
            hoverable
            background-even
            elevation
        >
            <template #title>
                <h5>Top 100 Crypto Currencies by Market Cap</h5>
            </template>
            
            <MazTableRow
                v-for='(row) in oldCoins'
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
                    <h4 class='fetching mb-3'>Fetching data...</h4>
                    
                    <div class='flex items-center justify-center h-32'>
                        <Spinner class='size-10 text-secondary' />
                    </div>
                </div>
            </template>
        </MazTable>
    </div>
</template>

<script setup>
    import { h } from 'vue';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Spinner } from '~/components/ui/spinner';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // State
    const { coins, oldCoins } = storeToRefs(MarketStore);
    // Methods
    const { getCoinsMarkets } = MarketStore;
    
    const columns = computed(() => [
        {
            id: 'select',
            header: () => h('p', { class: 'text-left text-green-shamrock' }, 'Add'),
            cell: ({ row }) => h(Checkbox, {
                'modelValue': row.getIsSelected(),
                'onUpdate:modelValue': value => row.toggleSelected(!!value),
                'ariaLabel': 'Select row',
            })
        },
        {
            accessorKey: 'market_cap_rank',
            header: () => h('p', { class: 'text-left text-green-shamrock' }, '#'),
            cell: (info) => info.getValue(),
        },
        
        /*        {
                    accessorKey: 'amount',
                    header: () => h('div', { class: 'text-right' }, 'Amount'),
                    cell: ({ row }) => {
                        const amount = Number.parseFloat(row.getValue('amount'))
                        const formatted = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(amount)
                        
                        return h('div', { class: 'text-right font-medium' }, formatted)
                    },
                },*/
    ]);
    
    /*
    
    */
    
    const data = computed(() => [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
        {
            id: '489e1d42',
            amount: 125,
            status: 'processing',
            email: 'example@gmail.com',
        },
        {
            id: "3u1reuv4",
            amount: 242,
            status: "success",
            email: "Abe45@gmail.com",
        },
    ]);
    
    const table = useVueTable({
        get data() { return coins.value },
        get columns() { return columns.value },
        getCoreRowModel: getCoreRowModel(),
    });
    
    onMounted(() => {
        getCoinsMarkets({}, 'table');
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

</style>