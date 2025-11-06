<template>
    <Card class='bg-background flex flex-col gap-12 border-none shadow-none w-screen md:max-w-[1920px] p-10 md:pb-16 md:px-24 z-10'>
        <h3 class='text-3xl font-medium tracking-wide inline-flex flex-wrap items-end'>
            <span>Leading Cryptocurrencies by&nbsp;</span>
            <Text3d
                class='text-6xl font-black uppercase'
                :animate='false'
                :strokeSize='4'
                :letterSpacing='0.15'
            >
                {{ sortingLabel }}
            </Text3d>
        </h3>
        
        <div class='w-full h-210 flex flex-col gap-4'>
            <div class='flex items-center py-4'>
                <!--   Search   -->
                <Input
                    class='max-w-sm focus-visible:border-foreground/75 focus-visible:ring-[0px] p-5'
                    placeholder='Search Coins...'
                    :model-value='table.getColumn("name")?.getFilterValue()'
                    @update:model-value='table.getColumn("name")?.setFilterValue($event)'
                />
                
                <!--   Filter Columns   -->
                <DropdownMenu :modal='false'>
                    <DropdownMenuTrigger as-child class='flex items-center gap-4'>
                        <Button
                            variant='outline'
                            class='ml-auto p-5 gap-2'
                        >
                            <div class='pt-1.5'>
                                <NuxtIcon name='ph:table-thin' size='20' />
                            </div>
                            
                            <span>Columns</span>
                        </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align='end' class='w-56 p-1 pb-0'>
                        <DropdownMenuLabel class='text-xl py-4 px-5 border-b'>Columns</DropdownMenuLabel>
                        
                        <DropdownMenuCheckboxItem
                            v-for='column in table.getAllColumns().filter((column) => column.getCanHide() && column.columnDef.isFilterable)'
                            :key='column.id'
                            :modelValue='column.getIsVisible()'
                            @update:modelValue='(value) => column.toggleVisibility(!!value)'
                            class='checkbox-item capitalize h-10 my-1 pl-10 rounded-lg hover:cursor-pointer dark:text-foreground/50 dark:data-[state=checked]:text-foreground/85'
                            @select='event => event.preventDefault()'
                        >
                            {{ column.columnDef.label }}
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <!--   Table   -->
            <div class='border rounded-xl h-120 flex flex-col flex-2/3 overflow-hidden shadow-2xl'>
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
                                        @click='onSort(header)'
                                        class='flex items-center gap-1'
                                        :class='{ "hover:cursor-pointer" : header.column.columnDef.isSortable }'
                                    >
                                        <FlexRender
                                            :render='header.column.columnDef.header'
                                            :props='header.getContext()'
                                            class='text-md'
                                        />
                                        
                                        <div class='pt-1 w-3' v-if='header.column.columnDef.isSortable'>
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
                    
                    <TableBody class='h-130'>
                        <!--   Loading   -->
                        <template v-if='loading'>
                            <TableRow>
                                <TableCell :colspan='columns.length' class='p-0'>
                                    <Empty class='from-muted/25 to-background h-130 bg-gradient-to-b from-50%'>
                                        <EmptyHeader class='gap-3'>
                                            <EmptyMedia variant='icon' class='w-16 h-16'>
                                                <Spinner class='size-8 text-green-shamrock' />
                                            </EmptyMedia>
                                            <EmptyTitle>Loading coins...</EmptyTitle>
                                            <EmptyDescription>Synchronizing with the crypto market, hold on tight!</EmptyDescription>
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
                                    class='hover:bg-muted/50 hover:cursor-pointer border-none !px-6'
                                >
                                    <TableCell
                                        v-for='cell in row.getVisibleCells()'
                                        :key='cell.id'
                                        class='py-4 text-center'
                                        :class='{ "text-left": cell.column.id === "name" }'
                                    >
                                        <!--   Checkbox / Favourites  -->
                                        <template v-if='cell.column.id === "checkbox"'>
                                            <div class='pt-1'>
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
                                            </div>
                                        </template>
                                        
                                        <NuxtLink
                                            v-else
                                            :to='`/market/${row.original.id}`'
                                        >
                                            <!--   Name  -->
                                            <template v-if='cell.column.id === "name"'>
                                                <div class='flex items-center gap-4 w-64'>
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
                                            
                                            <!--   Sparkline  -->
                                            <template v-else-if='cell.column.id === "sparkline_in_7d"'>
                                                <div class='w-30 h-14'>
                                                    <Line
                                                        v-if='cell.getValue().price?.length'
                                                        :key='cell.id'
                                                        :data='{
                                                        labels: Array(cell.getValue().price?.length).fill(""),
                                                        datasets: [{
                                                              data: cell.getValue().price,
                                                              borderColor: "rgb(14,165,233)",
                                                              borderWidth: 2,
                                                              backgroundColor: (context) => {
                                                                const ctx = context.chart.ctx;
                                                                const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
                                                                gradient.addColorStop(0.2, "rgba(14,165,233, 0.4)");
                                                                gradient.addColorStop(0.5, "rgba(14,165,233, 0.2)");
                                                                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
                                                                return gradient;
                                                              },
                                                              fill: true,
                                                              tension: 0.5,
                                                              pointRadius: 0,
                                                              pointHoverRadius: 5,
                                                              pointBackgroundColor: "oklch(0.985 0 0)",
                                                        }]
                                                    }'
                                                        :options='chartOptions'
                                                    />
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
                            
                            <!--   No results   -->
                            <template v-else>
                                <TableRow>
                                    <TableCell :colspan='columns.length' class='p-0'>
                                        <Empty class='from-muted/25 to-background h-130 bg-gradient-to-b from-50%'>
                                            <EmptyHeader class='gap-3'>
                                                <EmptyMedia variant='icon' class='w-24 h-24'>
                                                    <NuxtIcon
                                                        name='ph:notches-thin'
                                                        size='60'
                                                    />
                                                </EmptyMedia>
                                                <EmptyTitle>No data available</EmptyTitle>
                                                <EmptyDescription>No data found. Check back later for updates.</EmptyDescription>
                                            </EmptyHeader>
                                            <EmptyContent>
                                                <Button
                                                    @click='getCoinsMarkets({}, "table")'
                                                    variant='outline'
                                                >
                                                    <NuxtIcon
                                                        name='ph:repeat-thin'
                                                        size='20'
                                                    />
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
            
            <div class='flex items-center justify-center'>
                <span class='text-xs'>Market data updated {{ lastApiUpdate }}</span>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { h } from 'vue';
    import { Button } from '~/components/ui/button';
    import { Card } from '~/components/ui/card';
    import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger,  } from '@/components/ui/dropdown-menu';
    import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
    import { Input } from '~/components/ui/input';
    import { Spinner } from '~/components/ui/spinner';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { Text3d } from '~/components/ui/text-3d';
    import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel, getFilteredRowModel } from '@tanstack/vue-table';
    import { valueUpdater } from '~/components/ui/table/utils.ts';
    import { formatNumber } from '~/utils/formatUtils.js';
    import { getTrendClass } from '~/utils/styleUtils.js';
    
    import { Chart as ChartJS, CategoryScale, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
    ChartJS.register(CustomLineChart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Title, Tooltip, Legend);
    
    
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime, { rounding: Math.floor });
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    import { storeToRefs } from 'pinia';
    import { useMarketStore } from '~/stores/MarketStore.js';
    import { Line } from 'vue-chartjs';
    const MarketStore = useMarketStore();
    
    // Methods
    const { getCoinsMarkets } = MarketStore;
    // State
    const { coins } = storeToRefs(MarketStore);
    const sorting = ref([]);
    const sortingLabel = ref('Market Cap');
    const onSort = header => {
        if(header.column.id !== 'checkbox' && header.column.id !== 'sparkline_in_7d') {
            header.column.toggleSorting(header.column.getIsSorted() === 'asc');
            sortingLabel.value = header.column.columnDef.titleLabel || header.column.columnDef.label;
        }
    };
    
    const columnFilters = ref([]);
    const columnVisibility = ref({
        price_change_percentage_30d_in_currency: false,
        max_supply: false,
        total_volume: false,
        circulating_supply: false,
        total_supply: false,
        fully_diluted_valuation: false,
        sparkline_in_7d: false,
        ath_change_percentage: false,
        atl_change_percentage: false,
    });
    const lastApiUpdate = computed(() => dayjs(coins.value[0]?.last_updated).fromNow() || 'Unknown');
    
    const columns = computed(() => [
        {
            id: 'checkbox',
            label: 'Fav',
            header: () => h('p', { class: 'text-center w-12' },  'Fav'),
            cell: (cell) => h('div', { class: 'text-center' }, cell.getValue()),
        },
        {
            label: 'Rank',
            titleLabel: 'Market Cap Rank',
            accessorKey: 'market_cap_rank',
            header: () => h('p', { class: 'w-7 text-center' }, '#'),
            cell: (cell) => h('div', { class: 'text-center mr-4' }, cell.getValue()),
            isSortable: true,
        },
        {
            label: 'Name',
            accessorKey: 'name',
            header: () => h('p', { class: 'w-100' }, 'Name'),
            meta: { useSlot: true },
            isSortable: true,
        },
        {
            label: 'Price',
            accessorKey: 'current_price',
            header: () => h('p', { class: 'w-20' }, 'Price'),
            cell: (cell) => {
                const current_price = formatNumber(cell.getValue(), {
                    maximumFractionDigits: 4,
                });
                return h('div', { class: 'text-left' }, current_price);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: '1h %',
            titleLabel: '1 hour percentage change',
            accessorKey: 'price_change_percentage_1h_in_currency',
            header: () => h('p', { class: 'w-12' },'1h %'),
            cell: (cell) => {
                const price_change_percentage_1h = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-left ${trend}` }, price_change_percentage_1h);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: '24h %',
            titleLabel: '24 hours percentage change',
            accessorKey: 'price_change_percentage_24h',
            header: () => h('p', { class: 'w-12' },'24h %'),
            cell: (cell) => {
                const price_change_percentage_24h = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-left ${trend}` }, price_change_percentage_24h);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: '7d %',
            titleLabel: '7 days percentage change',
            accessorKey: 'price_change_percentage_7d_in_currency',
            header: () => h('p', { class: 'w-12' },'7d %'),
            cell: (cell) => {
                const price_change_percentage_7d = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-left ${trend}` }, price_change_percentage_7d);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: '30d %',
            titleLabel: '30 days percentage change',
            accessorKey: 'price_change_percentage_30d_in_currency',
            header: () => h('p', { class: 'w-12' },'30d %'),
            cell: (cell) => {
                const price_change_percentage_30d = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-left ${trend}` }, price_change_percentage_30d);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'Market Cap',
            accessorKey: 'market_cap',
            header: () => h('p',  { class: 'w-20' },'Market Cap'),
            cell: (cell) => {
                const market_cap = formatNumber(cell.getValue(), {
                    compact: true, decimals: 2
                });
                return h('div', { class: 'text-left' }, market_cap);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'Volume 24h',
            titleLabel: 'Trading volume in the last 24 hours',
            accessorKey: 'total_volume',
            header: () => h('p',  'Volume (24h)'),
            cell: (cell) => {
                const total_volume = formatNumber(cell.getValue(), {
                    compact: true, decimals: 2
                }) ;
                return h('div', { class: 'text-left' }, total_volume);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'Max Supply',
            accessorKey: 'max_supply',
            header: () => h('p',  'Max Supply'),
            cell: (cell) => {
                const max_supply = formatNumber(cell.getValue(), {
                    compact: true, style: 'decimal',
                });
                const symbol = cell.row?.original?.symbol?.toUpperCase();
                const label = () => cell.getValue() ? `${max_supply} ${symbol.toUpperCase()}` : max_supply;
                return h('div', { class: 'text-left w-24' }, label());
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'Circulating Supply',
            accessorKey: 'circulating_supply',
            header: () => h('p',  'Circ. Supply'),
            cell: (cell) => {
                const circulating_supply = formatNumber(cell.getValue(), {
                    compact: true, style: 'decimal', decimals: 2
                });
                const symbol = cell.row?.original?.symbol?.toUpperCase();
                const label = () => cell.getValue() ? `${circulating_supply} ${symbol.toUpperCase()}` : circulating_supply;
                return h('div', { class: 'text-left' }, label());
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'Total Supply',
            accessorKey: 'total_supply',
            header: () => h('p',  'Total Supply'),
            cell: (cell) => {
                const total_supply = formatNumber(cell.getValue(), {
                    compact: true, style: 'decimal', decimals: 2
                });
                const symbol = cell.row?.original?.symbol?.toUpperCase();
                const label = () => cell.getValue() ? `${total_supply} ${symbol.toUpperCase()}` : total_supply;
                return h('div', { class: 'text-left' }, label());
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'Fully Diluted Mcap (Fdv)',
            titleLabel: 'Fully Diluted Market Cap',
            accessorKey: 'fully_diluted_valuation',
            header: () => h('p',  'Fdv'),
            cell: (cell) => {
                const fully_diluted_valuation = formatNumber(cell.getValue(), {
                    compact: true, decimals: 1
                });
                return h('div', { class: 'text-left' }, fully_diluted_valuation);
            },
            isFilterable: true,
        },
        {
            id: 'sparkline_in_7d',
            label: 'Sparkline',
            accessorKey: 'sparkline_in_7d',
            header: () => h('p', 'Last 7 Days'),
            meta: { useSlot: true },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'From ATH',
            titleLabel: 'From All Time High',
            accessorKey: 'ath_change_percentage',
            header: () => h('p', 'From ATH'),
            cell: (cell) => {
                const ath_change_percentage = formatNumber(cell.getValue(), {
                    style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0,
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-left ${trend}` }, ath_change_percentage);
            },
            isFilterable: true,
            isSortable: true,
        },
        {
            label: 'From ATL',
            titleLabel: 'From All Time Low',
            accessorKey: 'atl_change_percentage',
            header: () => h('p', 'From ATL'),
            cell: (cell) => {
                const atl_change_percentage = formatNumber(cell.getValue(), {
                    style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0,
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `text-left ${trend}` }, atl_change_percentage);
            },
            isFilterable: true,
            isSortable: true,
        },
    ]);
    
    const table = useVueTable({
        get data() { return coins.value },
        get columns() { return columns.value },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
        onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
        state: {
            get sorting() { return sorting.value },
            get columnFilters() { return columnFilters.value },
            get columnVisibility() { return columnVisibility.value },
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
    
    // Sparkline chart options
    const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: false,
        hover: {
            mode: null,
        },
        interactions: {
            mode: 'none',
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                displayColors: false,
            }
        },
        scales: {
            x: {
                display: false,
                // min: 0,
                // max: 50,
            },
            y: {
                display: false,
            },
        }
    });
    
    onMounted(() => {
        getCoinsMarkets({}, 'table');
    });
</script>