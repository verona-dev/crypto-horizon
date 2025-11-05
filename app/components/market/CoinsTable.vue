<template>
    <Card class='bg-background shadow-none w-screen md:max-w-[1920px] p-10 md:px-24 z-10'>
        <div class='w-full h-210 flex flex-col gap-6'>
            <h3 class='text-3xl font-medium tracking-widest'>Leading Cryptocurrencies by {{ sortingLabel }}</h3>
            
            <DropdownMenu :modal='false'>
                <DropdownMenuTrigger as-child class='flex items-center gap-4'>
                    <Button
                        variant='outline'
                        class='ml-auto p-5'
                    >
                        <div class='pt-1'>
                            <NuxtIcon name='ph:funnel-simple' size='20' />
                        </div>
                        Filter
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align='end' class='w-56 p-1'>
                    <DropdownMenuLabel class='text-xl py-4 px-5 border-b'>Filters</DropdownMenuLabel>
                    
                    <DropdownMenuCheckboxItem
                        v-for='column in table.getAllColumns().filter((column) => column.getCanHide() && column.columnDef.isFilterable)'
                        :key='column.id'
                        :modelValue='column.getIsVisible()'
                        @update:modelValue='(value) => column.toggleVisibility(!!value)'
                        class='checkbox-item capitalize h-12 my-1 pl-10 rounded-lg hover:cursor-pointer dark:text-foreground/50 dark:data-[state=checked]:text-snowy-mint'
                        @select='event => event.preventDefault()'
                    >
                        {{ column.columnDef.label }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
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
                    
                    <TableBody>
                        <template v-if='table.getRowModel().rows?.length'>
                            <TableRow
                                v-for='row in table.getRowModel().rows'
                                :key='row.id'
                                class='hover:cursor-pointer border-none !px-6'
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
            
            <div class='flex items-center justify-center'>
                <span class='text-xs'>Market data updated {{ lastApiUpdate }}</span>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { h } from 'vue';
    import { Button } from '~/components/ui/button';
    import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
    import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger,  } from '@/components/ui/dropdown-menu';
    import { Spinner } from '~/components/ui/spinner';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { FlexRender, getCoreRowModel, useVueTable, getSortedRowModel } from '@tanstack/vue-table';
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
    
    const columnVisibility = ref({
        price_change_percentage_30d_in_currency: false,
        max_supply: false,
        total_volume: false,
        circulating_supply: false,
        total_supply: false,
        fully_diluted_valuation: false,
        sparkline_in_7d: false,
    });
    const lastApiUpdate = computed(() => dayjs(coins.value[0]?.last_updated).fromNow() || 'Unknown');
    
    const columns = computed(() => [
        {
            id: 'checkbox',
            label: 'checkbox',
            header: () => h('p', { class: 'text-center w-12' },  'Fav')
        },
        {
            label: 'Rank',
            titleLabel: 'Market Cap',
            accessorKey: 'market_cap_rank',
            header: () => h('p','#'),
            meta: { useHeaderSlot: true },
            cell: (cell) => h('div', { class: 'text-left' }, cell.getValue()),
            isSortable: true,
        },
        {
            label: 'Name',
            accessorKey: 'name',
            header: () => h('p', 'Name'),
            meta: { useSlot: true },
            isSortable: true,
        },
        {
            label: 'Price',
            accessorKey: 'current_price',
            header: () => h('p', 'Price'),
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
            header: () => h('p', '1h %'),
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
            header: () => h('p', '24h %'),
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
            header: () => h('p', '7d %'),
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
            header: () => h('p', '30d %'),
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
            header: () => h('p',  'Market Cap'),
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
        },
    });
    
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

<style>
    .checkbox-item {
        span {
            margin-left: 6px !important;
            margin-top: 1px !important;
        }
    }
</style>