<template>
    <Card class='w-full h-full !shadow-2xl'>
        <div class='w-full flex flex-col'>
            <!--   Header   -->
            <div class='flex flex-col items-center justify-center gap-8 p-14'>
                <Title :tag='1' :level='3'>Defi Protocols</Title>
                
                <!--  Search + Filter  -->
                <div class='flex items-center gap-4'>
                    <!--   Search   -->
                    <div class='relative'>
                        <Input
                            class='w-lg pl-8 border-primary/50 hover:bg-muted hover:border-primary/75'
                            placeholder='Search Protocol...'
                            :model-value='table.getColumn("name")?.getFilterValue()'
                            @update:model-value='table.getColumn("name")?.setFilterValue($event)'
                        />
                        
                        <NuxtIcon
                            name='ph:magnifying-glass-duotone'
                            size='16'
                            class='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                        />
                    </div>
                    
                    <!--   Filter Columns   -->
                    <DropdownMenu :modal='false'>
                        <DropdownMenuTrigger
                            as-child
                            class='flex items-center gap-4'
                        >
                            <Button variant='outline' class='gap-2 border border-primary/50 hover:bg-muted hover:border-primary/75' aria-label='filter button'>
                                <div class='pt-1.5'>
                                    <NuxtIcon
                                        name='ph:layout-light'
                                        size='20'
                                    />
                                </div>
                                
                                <span>Columns</span>
                            </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align='end' class='w-56 p-1 pb-0'>
                            <DropdownMenuLabel class='text-xl py-4 px-5 border-b'>Columns</DropdownMenuLabel>
                            
                            <DropdownMenuCheckboxItem
                                v-for='column in table.getAllColumns().filter((column) => column.getCanHide() && column.id !== "rank" && column.id !== "name")'
                                :key='column.id'
                                :model-value='column.getIsVisible()'
                                class='checkbox-item capitalize h-10 my-1 pl-10 rounded-lg hover:cursor-pointer text-foreground/50 data-[state=checked]:text-foreground/85'
                                @update:model-value='(value) => column.toggleVisibility(!!value)'
                                @select='event => event.preventDefault()'
                            >
                                {{ column.columnDef.label }}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            
            <!--   Table   -->
            <div class='border-t border-b rounded-none flex flex-col shadow-2xl overflow-auto'>
                <Table class='!border-none font-mono'>
                    <TableCaption class='py-6'>A list of Defi protocols.</TableCaption>
                    
                    <TableHeader :class='[ "h-24", { "shadow-2xl" : darkThemes } ]'>
                        <TableRow
                            v-for='headerGroup in table.getHeaderGroups()'
                            :key='headerGroup.id'
                            class='hover:bg-background'
                        >
                            <TableHead
                                v-for='header in headerGroup.headers'
                                :key='header.id'
                            >
                                <template v-if='!header.isPlaceholder'>
                                    <div
                                        @click='onSort(header)'
                                        :class='[
                                            "flex justify-center",
                                            { "hover:cursor-pointer" : header.column.columnDef.isSortable },
                                            { "justify-start": header.column.id === "name" },
                                        ]'
                                    >
                                        <div class='flex items-center gap-1'>
                                            <div v-if='header.column.columnDef.isSortable' class='pt-1 w-3'>
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
                                            
                                            <HoverCard
                                                v-if='header.column.columnDef.description'
                                                :open-delay='200'
                                                class='flex'
                                            >
                                                <HoverCardTrigger>
                                                    <InfoIcon />
                                                </HoverCardTrigger>
                                                
                                                <HoverCardContent>{{ header.column.columnDef.description }}</HoverCardContent>
                                            </HoverCard>
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
                                    class='hover:cursor-pointer border-t-0 animate-fadeIn h-20'
                                >
                                    <NuxtLink
                                        :to='`/defi/protocols/${row.original.slug}`'
                                        class='contents'
                                    >
                                        <TableCell
                                            v-for='cell in row.getVisibleCells().filter(cell => cell.column.id !== "audit_links")'
                                            :key='cell.id'
                                            class='text-center'
                                        >
                                            <!--   Name + Chains  -->
                                            <template v-if='cell.column.id === "name"'>
                                                <HoverCard :open-delay='200' class='flex'>
                                                    <HoverCardTrigger class='flex items-center gap-4'>
                                                        <!--   Logo  -->
                                                        <NuxtImg
                                                            :src='cell.row.original.logo'
                                                            width='44'
                                                            alt='platform logo'
                                                            class='rounded-full'
                                                        />
                                                        
                                                        <!--   Chains  -->
                                                        <div class='flex flex-col items-start'>
                                                            <p class='font-medium text-lg'>{{cell.getValue()}}</p>
                                                            <p class='text-primary/75'>{{ cell.row.original.chains.length }} chains</p>
                                                        </div>
                                                    </HoverCardTrigger>
                                                    
                                                    <HoverCardContent class='min-w-150 !p-0'>
                                                        <div class='bg-card flex flex-col gap-10 p-6'>
                                                            <div class='flex flex-col items-center gap-2'>
                                                                <!--   Title  -->
                                                                <Title :tag='4' class='text-primary'>{{ cell.getValue() }}</Title>
                                                                
                                                                <!--   Description  -->
                                                                <p v-if='cell.row.original.description' class='text-muted-foreground text-center'>{{ cell.row.original.description }}</p>
                                                            </div>
                                                            
                                                            <!--   Links  -->
                                                            <div class='w-full flex justify-center gap-8'>
                                                                <Button v-if='cell.row.original.url' variant='outline' class='w-fit' aria-label='website link'>
                                                                    <NuxtLink :to='cell.row.original.url' target='_blank' aria-label='link' class='flex items-center gap-2' external>
                                                                        <NuxtIcon
                                                                            name='ph:house-line-fill'
                                                                            size='20'
                                                                        />
                                                                        
                                                                        <span>Website</span>
                                                                    </NuxtLink>
                                                                </Button>
                                                                
                                                                <Button v-if='cell.row.original.twitter' variant='outline' class='w-fit'>
                                                                    <NuxtLink :to='`https://x.com/${cell.row.original.twitter}`' target='_blank' aria-label='link' class='flex items-center gap-2' external>
                                                                        <NuxtIcon
                                                                            name='ph:twitter-logo-fill'
                                                                            size='24'
                                                                            class='text-blue-sky'
                                                                        />
                                                                        
                                                                        <span>Twitter</span>
                                                                    </NuxtLink>
                                                                </Button>
                                                            </div>
                                                            
                                                            <!--   Address  -->
                                                            <p v-if='cell.row.original.address'>Address: <span class='text-secondary'>{{ cell.row.original.address }}</span></p>
                                                            
                                                            <!--   Chains  -->
                                                            <div class='flex flex-col gap-4 max-h-80 border border-muted rounded-md !py-4 !px-6'>
                                                                <Title :tag='6' class='underline'>Chains Breakdown</Title>
                                                                
                                                                <Table class=''>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead class='w-6 text-center'>#</TableHead>
                                                                            <TableHead class=''>Chain</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    
                                                                    <TableBody class=''>
                                                                        <TableRow
                                                                            v-for='(item, index) in cell.row.original.chains'
                                                                            :key='item'
                                                                        >
                                                                            <TableCell class='w-6 text-sm text-center !px-0'>{{ index + 1 }}.</TableCell>
                                                                            <TableCell class='text-sm flex flex-col'>{{ item }}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </template>
                                            
                                            <!--   Launch Date  -->
                                            <template v-else-if='cell.column.id === "listedAt"'>
                                                <span v-if='cell.getValue()'>{{ dayjs.unix(cell.getValue()).format('MMM YYYY') }}</span>
                                                <span v-else class='text-muted-foreground'>-</span>
                                            </template>
                                            
                                            <!--   Tvl  -->
                                            <template v-else-if='cell.column.id === "tvl"'>
                                                <HoverCard
                                                    v-if='cell.row.original.chainTvls'
                                                    :open-delay='200'
                                                    class='flex'
                                                >
                                                    <HoverCardTrigger class='flex justify-center items-center gap-1'>
                                                        <span>
                                                            {{
                                                                formatNumber(cell.getValue(), {
                                                                    compact: true, decimals: 2,
                                                                })
                                                            }}
                                                        </span>
                                                        
                                                        <InfoIcon />
                                                    </HoverCardTrigger>
                                                    
                                                    <HoverCardContent class='flex flex-col gap-4'>
                                                        <Title :tag='6' class='underline'>{{ glossary.tvl.acronym }} Breakdown</Title>
                                                        
                                                        <Table class='!p-12 !w-60'>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Asset</TableHead>
                                                                    <TableHead class='flex flex-col justify-center !items-end'>Quantity</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            
                                                            <TableBody class='!mt-6'>
                                                                <TableRow v-for='(tvl, chain) in cell.row.original.chainTvls'>
                                                                    <TableCell class='text-sm'>{{ chain }}</TableCell>
                                                                    <TableCell class='text-sm flex flex-col !items-end'>
                                                                        {{ formatNumber(tvl, { compact: true, decimals: 2 }) }}
                                                                    </TableCell>
                                                                </TableRow>
                                                                
                                                                <TableRow class='text-primary'>
                                                                    <TableCell class='text-base'>Total</TableCell>
                                                                    <TableCell class='text-base flex flex-col !items-end'>
                                                                        {{ formatNumber(cell.getValue(), { compact: true, decimals: 2 }) }}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </template>
                                            
                                            <!--   Open Source  -->
                                            <template v-else-if='cell.column.id === "openSource"'>
                                                <NuxtIcon
                                                    v-if='cell.getValue()'
                                                    name='ph:check-circle'
                                                    class='text-gray-dull/75'
                                                    size='24'
                                                />
                                                
                                                <span v-else class='text-muted-foreground'>-</span>
                                            </template>
                                            
                                            <!--   Hallmarks  -->
                                            <template v-else-if='cell.column.id === "hallmarks"'>
                                                <HoverCard :open-delay='200' class='flex'>
                                                    <HoverCardTrigger class='text-gray-dull/75'>
                                                        <NuxtIcon v-if='cell.row.original.hallmarks?.length' name='ph:calendar' size='24' />
                                                        <span v-else class='text-muted-foreground'>-</span>
                                                    </HoverCardTrigger>
                                                    
                                                    <HoverCardContent class='max-w-140'>
                                                        <Stepper v-if='cell.row.original.hallmarks.length' orientation='vertical' class='mx-auto flex w-full max-w-md flex-col justify-start gap-10'>
                                                            <StepperItem
                                                                v-for='(hallmark, index) in [...cell.getValue()].reverse()'
                                                                :key='index'
                                                                class='relative flex w-full items-center gap-6'
                                                                :step='1'
                                                            >
                                                                <StepperSeparator
                                                                    v-if='index < cell.getValue().length - 1'
                                                                    class='absolute left-[70px] top-[30px] block h-[105%] w-0.5 rounded-full bg-muted'
                                                                />
                                                                
                                                                <StepperTrigger as-child>
                                                                    <StepperTitle class='text-sm text-muted-foreground font-semibold transition lg:text-base flex-row'>
                                                                        <NuxtIcon name='ph:calendar-dot' size='20' class='mb-0.5' />
                                                                        
                                                                        {{ dayjs.unix(hallmark[0]).format('MMM D, YYYY')}}
                                                                    </StepperTitle>
                                                                </StepperTrigger>
                                                                
                                                                <div class='flex flex-col gap-1'>
                                                                    <StepperDescription class='sr-only text-xs text-foreground transition md:not-sr-only lg:text-sm'>
                                                                        {{ hallmark[1] }}
                                                                    </StepperDescription>
                                                                </div>
                                                            </StepperItem>
                                                        </Stepper>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </template>
                                            
                                            <!--   Oracles  -->
                                            <template v-else-if='cell.column.id === "oraclesBreakdown"'>
                                                <HoverCard :open-delay='200' class='flex'>
                                                    <HoverCardTrigger class='text-gray-dull/75'>
                                                        <NuxtIcon v-if='cell.row.original.oraclesBreakdown?.length' name='ph:stack' size='24' />
                                                        <span v-else class='text-muted-foreground'>-</span>
                                                    </HoverCardTrigger>
                                                    
                                                    <HoverCardContent class='flex flex-col gap-4'>
                                                        <Title :tag='6' class='underline'>Oracles Breakdown</Title>
                                                        
                                                        <Table class='!p-12 !w-60'>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Name</TableHead>
                                                                    <TableHead class='flex flex-col justify-center !items-end'>Type</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            
                                                            <TableBody class='!mt-6'>
                                                                <TableRow
                                                                    v-for='oracle in cell.row.original.oraclesBreakdown'
                                                                    :key='oracle.name'
                                                                >
                                                                    <TableCell class='text-sm'>{{ oracle.name }}</TableCell>
                                                                    <TableCell class='text-sm flex flex-col !items-end'>
                                                                        {{ oracle.type }}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </template>
                                            
                                            <template v-else>
                                                <FlexRender
                                                    :render='cell.column.columnDef.cell'
                                                    :props='cell.getContext()'
                                                />
                                            </template>
                                        </TableCell>
                                    </NuxtLink>
                                    
                                    <!--   Audit  -->
                                    <TableCell class='text-center'>
                                        <Button
                                            v-for='audit in row.original.audit_links'
                                            :key='audit'
                                            variant='link'
                                            aria-label='protocol audit'
                                            class='font-normal'
                                        >
                                            <NuxtLink :to='audit' aria-label='protocol audit link' external>Visit Audit</NuxtLink>
                                            <NewTabIcon />
                                        </Button>
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
    import { h } from 'vue';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card/index';
    import InfoIcon from '@/components/InfoIcon.vue';
    import { Input } from '~/components/ui/input';
    import NewTabIcon from '~/components/NewTabIcon.vue';
    import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
    import { Spinner } from '~/components/ui/spinner';
    import Title from '~/components/Title.vue';
    import { valueUpdater } from '~/components/ui/table/utils.ts';
    import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '~/components/ui/stepper';
    import { Check, Circle, Dot } from '@lucide/vue'
    
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
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    import { Badge } from '@/components/ui/badge/index.ts';
    import { ChevronRight } from 'lucide-vue-next';
    const DefiStore = useDefiStore();
    const { getDefillamaProtocols } = DefiStore;
    
    const { protocols } = toRefs(props);
    // console.log(JSON.parse(JSON.stringify(protocols.value)));
    
    // Sorting + Filtering
    const sorting = ref([]);
    const sortingLabel = ref('Market Cap');
    const onSort = header => {
        if(header.column.id === 'name') return;
        header.column.toggleSorting(header.column.getIsSorted() === 'asc');
        sortingLabel.value = header.column.columnDef.pageTitle || header.column.columnDef.label;
    };
    
    const columnFilters = ref([]);
    const columnVisibility = ref({
        openSource: false,
        hallmarks: false,
        oraclesBreakdown: false,
        chain: false,
    });
    
    const columns = computed(() => [
        {
            id: 'rank',
            label: '#',
            cell: ({ row }) => h('div', { class: '' }, row.index + 1),
        },
        {
            id: 'name',
            label: 'Name',
            accessorKey: 'name',
            isSortable: true,
        },
        {
            id: 'listedAt',
            label: 'Launch Date',
            accessorKey: 'listedAt',
            meta: { useSlot: true },
        },
        {
            id: 'category',
            label: 'Category',
            accessorKey: 'category',
            isSortable: true,
        },
        {
            id: 'tvl',
            label: glossary.tvl.acronym,
            description: glossary.tvl.description,
            accessorKey: 'tvl',
            isSortable: true,
        },
        {
            id: 'change_1h',
            label: '1h %',
            accessorKey: 'change_1h',
            isSortable: true,
            cell: cell => {
                const change_1h = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `${trend}` }, change_1h);
            },
        },
        {
            id: 'change_1d',
            label: '24h %',
            accessorKey: 'change_1d',
            isSortable: true,
            cell: cell => {
                const change_1d = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `${trend}` }, change_1d);
            },
        },
        {
            id: 'change_7d',
            label: '7d %',
            accessorKey: 'change_7d',
            isSortable: true,
            cell: cell => {
                const change_7d = formatNumber(cell.getValue(), {
                    style: 'percent',
                });
                const trend = getTrendClass(cell.getValue());
                return h('div', { class: `${trend}` }, change_7d);
            },
        },
        {
            id: 'openSource',
            label: glossary.open_source.label,
            description: glossary.open_source.description,
            accessorKey: 'openSource',
            isSortable: true,
        },
        {
            id: 'chain',
            label: 'Chain',
            accessorKey: 'chain',
            isSortable: true,
        },
        {
            id: 'hallmarks',
            label: 'Hallmarks',
            accessorKey: 'hallmarks',
        },
        {
            id: 'oraclesBreakdown',
            label: 'Oracle',
            accessorKey: 'oracleBreakdown',
        },
        {
            id: 'audit_links',
            label: 'Audit',
            accessorKey: 'audit_links',
            meta: { useSlot: true },
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
        onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
        state: {
            get sorting() { return sorting.value; },
            get columnFilters() { return columnFilters.value; },
            get columnVisibility() { return columnVisibility.value; },
        },
    });
    
    // Loading state
    const table_loading = ref(true);
    const isTableReady = computed(() => table.getRowModel().rows);
    watch(() => isTableReady.value, rows => {
        if(rows.length > 0) {
            table_loading.value = false;
        }
    }, { immediate: true });
    
    // onMounted(() => getDefillamaProtocols());
</script>