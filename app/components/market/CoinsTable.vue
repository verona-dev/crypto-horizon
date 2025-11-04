<template>
    <div class='w-screen md:max-w-[1920px] h-180 px-10 md:px-32 flex flex-col gap-6 z-10'>
        <DropdownMenu>
            <DropdownMenuTrigger as-child class='flex items-center gap-4'>
                <Button
                    variant='outline'
                    class='ml-auto p-5'
                >
                    <div class='pt-1'>
                        <NuxtIcon
                            name='ph:funnel-simple'
                            size='20'
                        />
                    </div>
                    
                    Filter
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align='end' class='w-52'>
                <DropdownMenuLabel class='text-lg px-4 py-4 my-1 border-b'>Filters</DropdownMenuLabel>
                
                <DropdownMenuCheckboxItem
                    v-for='column in table.getAllColumns().filter((column) => column.getCanHide())'
                    :key='column.id'
                    class='capitalize h-10 rounded-lg my-1 hover:cursor-pointer'
                    :modelValue='column.getIsVisible()'
                    @update:modelValue='(value) => {
                           column.toggleVisibility(!!value)
                    }'>
                    {{ column.columnDef.label }}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
        <div class='border rounded-xl h-120 flex flex-col flex-2/3 overflow-hidden shadow-2xl'>
            <!--  <h3 class='px-6 py-10 font-medium tracking-widest border-b'>Leading Cryptocurrencies</h3> .  -->
            
            <Table class='bg-background overflow-visible'> <!-- leave bg-background for meteorites -->
                <TableHeader
                    class='bg-background sticky border-b top-0 z-10 shadow-xs'
                    :class='{ "shadow-2xl" : dark_mode }'
                >
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
                                    "text-center w-16": header.column.id === "checkbox",
                                    "flex justify-center items-center": header.column.id === "market_cap_rank",
                                }'
                        >
                            <template v-if='!header.isPlaceholder'>
                                <div
                                    @click='header.column.toggleSorting(header.column.getIsSorted() === "asc")'
                                    class='flex items-center gap-1 hover:cursor-pointer'
                                >
                                    <FlexRender
                                        :render='header.column.columnDef.header'
                                        :props='header.getContext()'
                                        class='text-md' />
                                    
                                    <div class='pt-1 w-3' v-if='isSortable(header)'>
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
                                
                                <NuxtLink
                                    v-else
                                    :to='`/market/${row.original.id}`'
                                >
                                    <!--   Name  -->
                                    <template v-if='cell.column.id === "name"'>
                                        <div class='flex items-center gap-4'>
                                            <NuxtImg
                                                :src='cell.row.original.image'
                                                width='40'
                                                alt='coin logo'
                                            />
                                            
                                            <div class='flex flex-col items-start gap-1 truncate'>
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
    import { Button } from '~/components/ui/button';
    import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import { Spinner } from '~/components/ui/spinner';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel } from '@tanstack/vue-table';
    import { valueUpdater } from '~/components/ui/table/utils.ts';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass } from '~/utils/styleUtils.js';
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    const MarketStore = useMarketStore();
    
    // Methods
    const { getCoinsMarkets } = MarketStore;
    // State
    const { coins } = storeToRefs(MarketStore);
    const sorting = ref([]);
    const columnVisibility = ref({});
    
    const isSortable = header => {
        return [
            'market_cap_rank',
            'name',
            'current_price',
            'price_change_percentage_1h_in_currency',
            'price_change_percentage_24h',
            'price_change_percentage_7d_in_currency',
            'price_change_percentage_30d_in_currency',
            'market_cap',
            'total_volume',
            'circulating_supply',
        ].includes(header.column.id);
    };
    
    const columns = computed(() => [
        {
            id: 'checkbox',
            label: 'checkbox',
            header: () => h('p', { class: 'text-center'},  'Fav')
        },
        {
            label: 'Rank',
            accessorKey: 'market_cap_rank',
            header: () => h('p', '#'),
            meta: { useHeaderSlot: true }
        },
        {
            label: 'Name',
            accessorKey: 'name',
            header: () => h('p', 'Name'),
            meta: { useSlot: true },
        },
        {
            label: 'Price',
            accessorKey: 'current_price',
            header: () => h('p', 'Price'),
            cell: (row) => {
                const price = formatNumber(row.getValue(), {
                    maximumFractionDigits: 4,
                });
                return h('div', { class: 'text-left' }, price);
            },
        },
        {
            label: '1h %',
            accessorKey: 'price_change_percentage_1h_in_currency',
            header: () => h('p', '1h %'),
            cell: (row) => {
                const price_change_percentage_1h = formatNumber(row.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(row.getValue());
                return h('div', { class: `text-left w-14 ${trend}` }, price_change_percentage_1h);
            }
        },
        {
            label: '24h %',
            accessorKey: 'price_change_percentage_24h',
            header: () => h('p', '24h %'),
            cell: (row) => {
                const price_change_percentage_24h = formatNumber(row.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(row.getValue());
                return h('div', { class: `text-left w-14 ${trend}` }, price_change_percentage_24h);
            }
        },
        {
            label: '7d %',
            accessorKey: 'price_change_percentage_7d_in_currency',
            header: () => h('p', '7d %'),
            cell: (row) => {
                const price_change_percentage_7d = formatNumber(row.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(row.getValue());
                return h('div', { class: `text-left w-14 ${trend}` }, price_change_percentage_7d);
            }
        },
        {
            label: '30d %',
            accessorKey: 'price_change_percentage_30d_in_currency',
            header: () => h('p', '30d %'),
            cell: (row) => {
                const price_change_percentage_30d = formatNumber(row.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(row.getValue());
                return h('div', { class: `text-left w-14 ${trend}` }, price_change_percentage_30d);
            }
        },
        {
            label: 'Market Cap',
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
            label: 'Volume 24h',
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
            label: 'Circulating Supply',
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
        onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
        state: {
            get sorting() { return sorting.value },
            get columnVisibility() { return columnVisibility.value },
        }
    });
    
    onMounted(() => {
        getCoinsMarkets({}, 'table');
    });
</script>