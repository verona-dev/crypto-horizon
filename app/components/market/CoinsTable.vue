<template>
    <div class='flex flex-col gap-12'>
        <h3 class='tracking-widest'>Cryptocurrency Prices by Market Cap </h3>
        
        <div class='w-full h-180 flex flex-col gap-4'>
            <div class='border rounded-md h-120 flex flex-col flex-2/3 overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow v-for='headerGroup in table.getHeaderGroups()' :key='headerGroup.id'>
                            <TableHead v-for='header in headerGroup.headers' :key='header.id'>
                                <template v-if='!header.isPlaceholder'>
                                    <template v-if="header.column.id === 'market_cap_rank'">
                                        <Button
                                            variant="ghost"
                                            @click="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
                                        >
                                            #
                                            <NuxtIcon v-if='header.column.getIsSorted() === "desc"' name='ph:caret-down-fill' size='10' />
                                            <NuxtIcon v-if='header.column.getIsSorted() === "asc"' name='ph:caret-up-fill' size='10' />
                                        </Button>
                                    </template>
                                    <FlexRender
                                        v-else
                                        :render="header.column.columnDef.header"
                                        :props="header.getContext()"
                                        class='flex items-center justify-center'
                                    />
                                </template>
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
                                    class='my-2'
                                    :class='{
                                      "flex items-center": cell.column.id === "name",
                                    }'
                                >
                                    <template v-if='cell.column.id === "name"'>
                                        <div class='flex justify-center items-center h-full gap-3'>
                                            <NuxtImg
                                                :src='cell.row.original.image'
                                                width='30'
                                                alt='coin logo'
                                            />
                                            
                                            <div class='flex flex-col'>
                                                <p class='text-sm font-medium'>{{ cell.getValue() }}</p>
                                                <span class='uppercase text-xs text-muted-foreground'>{{ cell.row.original.symbol }}</span>
                                            </div>
                                        </div>
                                    </template>
                                    
                                    <FlexRender
                                        v-else
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
    import { ArrowUpDown, ChevronDown } from 'lucide-vue-next';
    import { Button } from '@/components/ui/button';
    import { Checkbox } from '~/components/ui/checkbox';
    import { Spinner } from '~/components/ui/spinner';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel } from '@tanstack/vue-table';
    import { valueUpdater } from '~/components/ui/table/utils.ts';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // Methods
    const { getCoinsMarkets } = MarketStore;
    // State
    const { coins, oldCoins } = storeToRefs(MarketStore);
    const sorting = ref([]);
    
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
        { //
            accessorKey: 'market_cap_rank',
            cell: ( row ) => row.getValue(),
            meta: { useHeaderSlot: true },
        },
        {
            accessorKey: 'name',
            header: () => h('p', 'Name'),
            meta: { useSlot: true },
        },
        
        /*
                {
          accessorKey: 'name',
          header: () => h('p', { class: 'text-left text-green-shamrock' }, 'Name'),
          cell: (row) => row.getValue(),
        },
        {
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
                },
             */
    ]);
    
    const table = useVueTable({
        get data() { return coins.value },
        get columns() { return columns.value },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
        state: {
            get sorting() { return sorting.value },
        }
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