<template>
    <div class='w-full h-180 flex flex-col gap-4 z-10'>
        <div class='border rounded-xl h-120 flex flex-col flex-2/3 overflow-hidden'>
            <h3 class='px-6 py-10 font-medium tracking-widest border-b'>Leading Cryptocurrencies</h3>
            
            <Table class='bg-background'> <!-- leave bg-background for meteorites -->
                <TableHeader class='bg-background sticky top-0 z-10 shadow-2xl'>
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
                                <div
                                    @click='header.column.toggleSorting(header.column.getIsSorted() === "asc")'
                                    class='flex items-center gap-2 hover:cursor-pointer'
                                >
                                    <FlexRender
                                        :render='header.column.columnDef.header'
                                        :props='header.getContext()'
                                        class='text-md' />
                                    
                                    <div class='pt-1' v-if='isSortable(header)'>
                                        <NuxtIcon
                                            v-if='header.column.getIsSorted() === "desc"'
                                            name='ph:caret-down-fill'
                                            size='12'
                                        />
                                        <NuxtIcon
                                            v-else-if='header.column.getIsSorted() === "asc"'
                                            name='ph:caret-up-fill'
                                            size='12'
                                        />
                                    </div>
                                </div>
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
                            class='hover:cursor-pointer'
                        >
                            <TableCell
                                v-for='cell in row.getVisibleCells()'
                                :key='cell.id'
                                class='py-4 text-center'
                                :class='{ "text-left": cell.column.id === "name" }'
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
                                
                                <NuxtLink v-else :to='`/market/${row.original.id}`'>
                                    <!--   Name  -->
                                    <template v-if='cell.column.id === "name"'>
                                        <div class='flex items-center gap-4'>
                                            <NuxtImg
                                                :src='cell.row.original.image'
                                                width='40'
                                                alt='coin logo'
                                            />
                                            
                                            <div class='flex flex-col items-start gap-1'>
                                                <p class='font-medium'>{{ cell.getValue() }}</p>
                                                <span class='uppercase text-xs text-muted-foreground'>
                                                    {{ cell.row.original.symbol }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                    
                                    <template v-else>
                                        <FlexRender
                                            :render='cell.column.columnDef.cell'
                                            :props='cell.getContext()'
                                        />
                                    </template>
                                </NuxtLink>
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
    const { coins } = storeToRefs(MarketStore);
    const sorting = ref([]);
    
    const isSortable = header => {
        return [
            'market_cap_rank',
            'name',
            'current_price',
            'market_cap',
            'total_volume',
            'circulating_supply',
        ].includes(header.column.id);
    };
    
    const columns = computed(() => [
        {
            id: 'checkbox',
            header: () => h('p',  'Fav')
        },
        {
            accessorKey: 'market_cap_rank',
            header: () => h('p', '#'),
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
        {
            accessorKey: 'circulating_supply',
            header: () => h('p',  'Circ. Supply'),
            cell: (row) => {
                const circ_supply = formatNumber(row.getValue(), {
                    compact: true, decimals: 1
                });
                return h('div', { class: 'text-left' }, circ_supply);
            },
        },
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