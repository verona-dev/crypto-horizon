<template>
    <Card class='w-full h-full !shadow-2xl'>
        <div class='w-full flex flex-col'>
            <!--   Header   -->
            <div class='flex flex-col items-center justify-center gap-8 p-14'>
                <Title :tag='1' :level='3'>Defi Protocols</Title>
                
                <!--  Search + Filter  -->
                <div class='flex items-center gap-4'>
                </div>
            </div>
            
            <!--   Table   -->
            <div class='border-t border-b rounded-none flex flex-col shadow-2xl overflow-auto'>
                <Table class='!border-none font-mono'>
                    <TableHeader :class='[ "h-24", { "shadow-2xl" : darkThemes } ]'>
                        <TableRow
                            v-for='headerGroup in table.getHeaderGroups()'
                            :key='headerGroup.id'
                            class='hover:bg-background'
                        >
                            <!--  :class='[headerWidths[header.column.id]]'  -->
                            <TableHead
                                v-for='header in headerGroup.headers'
                                :key='header.id'
                            >
                                <template v-if='!header.isPlaceholder'>
                                    <div
                                        @click='onSort(header)'
                                        :class='[
                                            "flex justify-end",
                                            { "hover:cursor-pointer" : header.column.columnDef.isSortable },
                                        ]'
                                    >
                                        <div
                                            :class='[
                                                "flex items-center gap-1",
                                            ]'
                                        >
                                            <div
                                                v-if='header.column.columnDef.isSortable'
                                                class='pt-1 w-3'
                                            >
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
                                            
                                            <FlexRender
                                                :render='() => h("span", header.column.columnDef.label)'
                                                :props='header.getContext()'
                                                class='text-md truncate'
                                            />
                                        </div>
                                    </div>
                                </template>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        <!--   Loading   -->
                        <template v-if='loading'>
                            <TableRow>
                                <TableCell
                                    :colspan='columns.length'
                                    class='p-0'
                                >
                                    <Empty class='from-muted/25 to-background h-130 bg-gradient-to-b from-50%'>
                                        <EmptyHeader class='gap-3'>
                                            <EmptyMedia
                                                variant='icon'
                                                class='w-16 h-16'
                                            >
                                                <Spinner class='size-8 text-primary' />
                                            </EmptyMedia>
                                            
                                            <EmptyTitle>Loading protocols...</EmptyTitle>
                                            
                                            <EmptyDescription>Synchronizing with the defi market, hold on tight!</EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                </TableCell>
                            </TableRow>
                        </template>
                        
                        <template v-else>
                            <!--   Results   -->
                            <template v-if='isTableReady'>
                                <TableRow
                                    v-for='row in table.getRowModel().rows'
                                    :key='row.id'
                                    class='hover:cursor-pointer border-t-0 !px-6 animate-fadeIn'
                                >
                                    <NuxtLink
                                        :to='`/defi/protocols/prrrrotocol`'
                                        class='contents'
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
                                    </NuxtLink>
                                </TableRow>
                            </template>
                            
                            <!--   No results   -->
                            <template v-else>
                                <TableRow>
                                    <TableCell :colspan='columns.length' class='p-0'>
                                        <Empty class='from-muted/25 to-background h-130 bg-gradient-to-b from-50%'>
                                            <EmptyHeader class='gap-3'>
                                                <EmptyMedia variant='icon' class='w-24 h-24'>
                                                    <NuxtIcon name='ph:notches-thin' size='60' />
                                                </EmptyMedia>
                                                
                                                <EmptyTitle>No data available</EmptyTitle>
                                                
                                                <EmptyDescription>No data found. Check back later for updates.</EmptyDescription>
                                            </EmptyHeader>
                                            
                                            <EmptyContent>
                                                <Button
                                                    variant='outline'
                                                    @click='getDefillamaProtocols()'
                                                    aria-label='get market'
                                                >
                                                    <NuxtIcon name='ph:repeat-thin' size='20' />
                                                    Retry
                                                </Button>
                                            </EmptyContent>
                                        </Empty>
                                    </TableCell>
                                </TableRow>
                            </template>
                        </template>
                    </TableBody>
                </Table>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { Button } from '~/components/ui/button';
    import { Card } from '~/components/ui/card';
    import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger  } from '~/components/ui/dropdown-menu';
    import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
    import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel, getFilteredRowModel } from '@tanstack/vue-table';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass } from '~/utils/styleUtils.js';
    import glossary from '~/assets/data/market/glossary.json';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index';
    import InfoIcon from '@/components/InfoIcon.vue';
    import { Input } from '~/components/ui/input';
    import { h } from 'vue';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { Spinner } from '~/components/ui/spinner';
    import Title from '~/components/Title.vue';
    import { valueUpdater } from '~/components/ui/table/utils.ts';
    
    // Theme
    import { checkTheme } from '@/composables/checkTheme.js';
    const { darkThemes } = checkTheme();
    
    // Dayjs
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    const props = defineProps({
        protocols: {
            type: Array,
            required: true,
        },
    });
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    const DefiStore = useDefiStore();
    const { getDefillamaProtocols } = DefiStore;
    
    const { protocols } = toRefs(props);
    console.log(JSON.parse(JSON.stringify(protocols.value)));
    
    // Sorting + Filtering
    const sorting = ref([]);
    const sortingLabel = ref('Market Cap');
    const onSort = header => {
        // if(header.column.id === 'checkbox' || header.column.id === 'market_cap_rank' || header.column.id === 'sparkline_in_7d') return;
        header.column.toggleSorting(header.column.getIsSorted() === 'asc');
        sortingLabel.value = header.column.columnDef.pageTitle || header.column.columnDef.label;
    };
    const emit = defineEmits(['updateLabel']);
    watch(sortingLabel, () => emit('updateLabel', sortingLabel.value));
    
    const columnFilters = ref([]);
    const columnVisibility = ref({
        price_change_percentage_30d_in_currency: false,
        max_supply: false,
        // total_volume: false,
        circulating_supply: false,
        total_supply: false,
        fully_diluted_valuation: false,
        // sparkline_in_7d: false,
        ath_change_percentage: false,
        atl_change_percentage: false,
    });
    
    const headerWidths = {
        name: 'w-32',
        current_price: 'min-w-20',
        price_change_percentage_1h_in_currency: 'min-w-18',
        price_change_percentage_24h: 'min-w-20',
        price_change_percentage_7d_in_currency: 'min-w-20',
        price_change_percentage_30d_in_currency: 'min-w-20',
        market_cap: 'min-w-28',
        total_volume: 'min-w-30',
        max_supply: 'min-w-30',
        circulating_supply: 'min-w-38',
        total_supply: 'min-w-38',
        fully_diluted_valuation: 'min-w-20',
        ath_change_percentage: 'min-w-20',
        atl_change_percentage: 'min-w-20',
    };
    
    const columns = computed(() => [
        // {
        //     id: 'market_cap_rank',
        //     label: '#',
        //     accessorKey: 'market_cap_rank',
        //     cell: cell => h('div', { class: 'text-center' }, cell.getValue()),
        // },
        {
            label: 'Name',
            accessorKey: 'name',
            isSortable: true,
            meta: { useSlot: true },
        },
        {
            label: 'Price',
            accessorKey: 'current_price',
            cell: cell => {
                const current_price = formatNumber(cell.getValue(), {
                    maximumFractionDigits: 4,
                });
                return h('div', { class: 'text-right' }, current_price);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            id: 'price_change_percentage_1h_in_currency',
            label: '1h %',
            pageTitle: 'Last hour % change',
            accessorKey: 'price_change_percentage_1h_in_currency',
            cell: cell => {
                const price_change_percentage_1h = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-right ${trend}` }, price_change_percentage_1h);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            id: 'price_change_percentage_24h',
            label: '24h %',
            pageTitle: 'Last day % change',
            accessorKey: 'price_change_percentage_24h',
            cell: cell => {
                const price_change_percentage_24h = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-right ${trend}` }, price_change_percentage_24h);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            id: 'price_change_percentage_7d_in_currency',
            label: '7d %',
            pageTitle: 'Last week % change',
            accessorKey: 'price_change_percentage_7d_in_currency',
            cell: cell => {
                const price_change_percentage_7d = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-right ${trend}` }, price_change_percentage_7d);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: '30d %',
            pageTitle: 'Last month % change',
            accessorKey: 'price_change_percentage_30d_in_currency',
            cell: cell => {
                const price_change_percentage_30d = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-right ${trend}` }, price_change_percentage_30d);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            id: 'market_cap',
            label: glossary.market_cap.label,
            accessorKey: 'market_cap',
            description: glossary.market_cap.description,
            cell: cell => {
                const market_cap = formatNumber(cell.getValue(), {
                    compact: true, decimals: 2,
                });
                return h('div', { class: 'text-right' }, market_cap);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: glossary.volume.label_short,
            pageTitle: glossary.volume.label,
            accessorKey: 'total_volume',
            description: glossary.volume.description,
            cell: cell => {
                const total_volume = formatNumber(cell.getValue(), {
                    compact: true, decimals: 2,
                }) ;
                return h('div', { class: 'text-right' }, total_volume);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: glossary.max_supply.label,
            accessorKey: 'max_supply',
            description: glossary.max_supply.description,
            cell: cell => {
                const max_supply = formatNumber(cell.getValue(), {
                    compact: true, style: 'decimal',
                });
                const symbol = cell.row?.original?.symbol?.toUpperCase();
                const label = () => cell.getValue() ? `${max_supply} ${symbol.toUpperCase()}` : max_supply;
                return h('div', { class: 'text-right' }, label());
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: glossary.circulating_supply.label,
            accessorKey: 'circulating_supply',
            description: glossary.circulating_supply.description,
            cell: cell => {
                const circulating_supply = formatNumber(cell.getValue(), {
                    compact: true, style: 'decimal', decimals: 2,
                });
                const symbol = cell.row?.original?.symbol?.toUpperCase();
                const label = () => cell.getValue() ? `${circulating_supply} ${symbol.toUpperCase()}` : circulating_supply;
                return h('div', { class: 'text-right' }, label());
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: glossary.total_supply.label,
            accessorKey: 'total_supply',
            description: glossary.total_supply.description,
            cell: cell => {
                const total_supply = formatNumber(cell.getValue(), {
                    compact: true, style: 'decimal', decimals: 2,
                });
                const symbol = cell.row?.original?.symbol?.toUpperCase();
                const label = () => cell.getValue() ? `${total_supply} ${symbol.toUpperCase()}` : total_supply;
                return h('div', { class: 'text-right' }, label());
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: glossary.fully_diluted_valuation.acronym,
            pageTitle: glossary.fully_diluted_valuation.label,
            accessorKey: 'fully_diluted_valuation',
            description: glossary.fully_diluted_valuation.description,
            cell: cell => {
                const fully_diluted_valuation = formatNumber(cell.getValue(), {
                    compact: true, decimals: 1,
                });
                return h('div', { class: 'text-right' }, fully_diluted_valuation);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'From ATH',
            pageTitle: 'From All Time High',
            accessorKey: 'ath_change_percentage',
            cell: cell => {
                const ath_change_percentage = formatNumber(cell.getValue(), {
                    style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0,
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-right ${trend}` }, ath_change_percentage);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'From ATL',
            pageTitle: 'From All Time Low',
            accessorKey: 'atl_change_percentage',
            cell: cell => {
                const atl_change_percentage = formatNumber(cell.getValue(), {
                    style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0,
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-right ${trend}` }, atl_change_percentage);
            },
            isFilterable: true,
            isSortable: true,
        },
    ]);
    
    const table = useVueTable({
        get data() { return protocols.value; },
        get columns() { return columns.value; },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
        onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
        getFilteredRowModel: getFilteredRowModel(),
        // onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
        state: {
            get sorting() { return sorting.value; },
            get columnFilters() { return columnFilters.value; },
            // get columnVisibility() { return columnVisibility.value; },
        },
    });
    
    // Loading state
    const loading = ref(true);
    const isTableReady = computed(() => table.getRowModel().rows);
    watch(() => isTableReady.value, rows => {
        if(rows.length > 0) {
            loading.value = false;
        }
    }, { immediate: true });
</script>