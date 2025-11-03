<template>
    <div class='flex flex-col gap-12 z-10'>
        <h3 class='tracking-widest'>Cryptocurrency Prices by Market Cap </h3>
        
        <div class='w-full h-180 flex flex-col gap-4'>
            <div class='border rounded-xl h-120 flex flex-col flex-2/3 overflow-hidden'>
                <Table class='bg-background'> <!-- leave bg-background for meteorites -->
                    <TableHeader class='bg-background sticky top-0 z-10 shadow-xl'>
                        <TableRow
                            v-for='headerGroup in table.getHeaderGroups()'
                            :key='headerGroup.id'
                            class='hover:bg-background h-16'
                        >
                            <TableHead
                                v-for='header in headerGroup.headers'
                                :key='header.id'
                                class='h-full font-bolder text-foreground'
                                :class='{
                                    "text-center": header.column.id === "checkbox",
                                    "flex justify-center items-center": header.column.id === "market_cap_rank",
                                }'
                            >
                                <template v-if='!header.isPlaceholder'>
                                    <template v-if='isSortable(header)'>
                                        <div
                                            @click='header.column.toggleSorting(header.column.getIsSorted() === "asc")'
                                            class='flex items-center gap-2 hover:cursor-pointer '
                                        >
                                            <FlexRender :render='header.column.columnDef.header' :props='header.getContext()' />
                                            
                                            <div class='pt-2'>
                                                <NuxtIcon
                                                    v-if='header.column.getIsSorted() === "desc"'
                                                    name='ph:caret-down-fill'
                                                    size='15'
                                                />
                                                <NuxtIcon
                                                    v-else-if='header.column.getIsSorted() === "asc"'
                                                    name='ph:caret-up-fill'
                                                    size='15'
                                                />
                                            </div>
                                        </div>
                                    </template>
                                    
                                    <template v-else>
                                        <FlexRender :render='header.column.columnDef.header' :props='header.getContext()' />
                                    </template>
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
                                    class='py-4 text-center'
                                    :class='{
                                      "text-left": cell.column.id === "name",
                                    }'
                                >
                                    <!--   Checkbox / Favourites  -->
                                    <template v-if='cell.column.id === "checkbox"'>
                                        <NuxtIcon
                                            v-if='cell.row.getIsSelected()'
                                            @click='cell.row.toggleSelected(!cell.row.getIsSelected())'
                                            name='ph:star-fill'
                                            class='text-yellow-selective hover:cursor-pointer'
                                            size='16'
                                        />
                                        <NuxtIcon
                                            v-else
                                            @click='cell.row.toggleSelected(!cell.row.getIsSelected())'
                                            name='ph:star'
                                            class='text-muted-foreground hover:cursor-pointer'
                                            size='16'
                                        />
                                    </template>
                                    
                                    <!--   Name  -->
                                    <template v-else-if='cell.column.id === "name"'>
                                        <div class='flex items-center gap-4'>
                                            <NuxtImg
                                                :src='cell.row.original.image'
                                                width='40'
                                                alt='coin logo'
                                            />
                                            
                                            <div class='flex flex-col gap-1'>
                                                <p class='font-medium'>{{ cell.getValue() }}</p>
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
                                <TableCell :colspan='columns.length' class='h-24 text-center'>
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
    import { Spinner } from '~/components/ui/spinner';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel } from '@tanstack/vue-table';
    import { valueUpdater } from '~/components/ui/table/utils.ts';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // Methods
    const { getCoinsMarkets } = MarketStore;
    // State
    const { coins, oldCoins } = storeToRefs(MarketStore);
    const sorting = ref([]);
    
    const isSortable = header => {
        return [
            'market_cap_rank',
            'name',
            'current_price',
            'market_cap',
        ].includes(header.column.id);
    };
    
    const columns = computed(() => [
        {
            id: 'checkbox',
            header: () => h('p',  'Fav')
        },
        {
            accessorKey: 'market_cap_rank',
            header: () => h('p', { class: 'text-green-shamrock' }, '#'),
            meta: { useHeaderSlot: true }
        },
        {
            accessorKey: 'name',
            header: () => h('p', 'Name'),
            meta: { useSlot: true }
        },
        {
            accessorKey: 'current_price',
            header: () => h('p', 'Price'),
            meta: { useHeaderSlot: true },
            cell: (row) => {
                const price = formatNumber(row.getValue(), {
                    maximumFractionDigits: 4,
                });
                return h('div', { class: 'text-left' }, price);
            },
        },
        {
            accessorKey: 'market_cap',
            header: () => h('p',  'Market Cap'),
            cell: (row) => {
                const price = formatNumber(row.getValue(), {
                    compact: true, decimals: 2
                });
                return h('div', { class: 'text-left' }, price);
            },
        },
        {
            accessorKey: 'total_volume',
            header: () => h('p',  'Volume (24h)'),
            cell: (row) => {
              const volume = formatNumber(row.getValue(), {
                  compact: true, decimals: 2
              }) ;
              return h('div', { class: 'text-left' }, volume);
            },
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
</script>