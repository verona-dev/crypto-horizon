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
                                            "",
                                            { "hover:cursor-pointer" : header.column.columnDef.isSortable },
                                        ]'
                                    >
                                        <div :class='[""]'
                                        >
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
                                                class='truncate'
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
                                        :to='`/defi/protocols/${row.original.slug}`'
                                        class='contents text-left'
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
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
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
        if(header.column.id === 'name') return;
        header.column.toggleSorting(header.column.getIsSorted() === 'asc');
        sortingLabel.value = header.column.columnDef.pageTitle || header.column.columnDef.label;
    };
    
    const columnFilters = ref([]);
    const columnVisibility = ref({
        name: true,
        category: true,
    });
    
    const headerWidths = {
        name: 'w-32',
        category: 'min-w-10',
    };
    
    const columns = computed(() => [
        {
            label: 'Name',
            accessorKey: 'name',
            isSortable: true,
            meta: { useSlot: true },
        },
        {
            label: 'Category',
            accessorKey: 'category',
            isSortable: true,
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