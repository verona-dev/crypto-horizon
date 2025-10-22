<template>
    <div v-if='platforms_list.length' class='coin-contracts flex flex-col gap-4'>
        <!--  Contracts Title  -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='iconoir:page-edit'
                size='20'
            />
            <h4>Contracts</h4>
        </div>
        
        <div class='h-12 bg-input flex items-center justify-between border rounded-lg'>
            <!--  Main Contract  -->
            <div
                class='flex items-center justify-evenly w-full cursor-pointer'
                @click='onCopyLink(platforms[0])'
            >
                <NuxtImg
                    v-if='platformImageMap.find(platform => platform.name === platforms[0].name)?.image'
                    :src='platformImageMap.find(platform => platform.name === platforms[0].name).image'
                    width='20'
                    height='20'
                />
                
                <p class='capitalize text-sm'>{{platforms[0].value.slice(0, 5) + '...' + platforms[0].value.slice(-5) }}</p>
                
                <NuxtIcon
                    name='iconoir:copy'
                    size='15'
                    class='ml-1'
                />
            </div>
            
            <!--  All Contracts - Dropdown menu  -->
            <DropdownMenu v-model:open='open' :modal=false>
                <DropdownMenuTrigger as-child :disabled='disable_dropdown'>
                    <Button
                        variant='ghost'
                        class='group !h-full rounded-tl-none rounded-bl-none border-l border-border'
                        :data-state='open ? "open" : "closed"'
                    >
                        <ChevronDown class='text-primary ml-auto transition-transform duration-400 group-data-[state=open]:rotate-180' />
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent class='min-w-76 rounded-lg' align='end'>
                    <DropdownMenuLabel class='text-lg px-4 py-4 my-1'>Contracts</DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup class='px-1'>
                        <DropdownMenuItem
                            v-for='contract in platforms'
                            :key='contract'
                            @click='onCopyLink(contract)'
                            class='py-3 my-2 rounded-lg cursor-pointer'
                        >
                            <div class='px-3 flex justify-between items-center w-full'>
                                <div class='flex items-center'>
                                    <!--  Logo  -->
                                    <div class='logo-container flex w-12'>
                                        <NuxtImg
                                            v-if='platformImageMap.find(platform => platform.name === contract.name)?.image'
                                            :src='platformImageMap.find(platform => platform.name === contract.name).image'
                                            width='20'
                                            height='20'
                                        />
                                        
                                        <NuxtIcon
                                            v-else
                                            name='bitcoin-icons:block-outline'
                                            size='25'
                                            class='self-start'
                                        />
                                    </div>
                                    
                                    <!--  Name + Contract  -->
                                    <div class='flex flex-col items-start'>
                                        <span class='capitalize font-bold'>{{ contract.name }}</span>
                                        <span>{{ contract.value.slice(0, 6) + '...' + contract.value.slice(-6) }}</span>
                                    </div>
                                </div>
                                
                                <!--  Copy contract  -->
                                <div class='flex items-center justify-center cursor-pointer'>
                                    <NuxtIcon name='radix-icons:copy' size='20' />
                                </div>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup>
    import { toast } from 'vue-sonner';
    import { h, resolveComponent } from 'vue';
    import { capitalize } from '~/utils/formatUtils.js';
    import { ChevronDown } from 'lucide-vue-next';
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
    import { storeToRefs } from 'pinia';
    
    const props = defineProps({
        coin: Object,
        required: true,
    });
    const MarketStore = useMarketStore();
    const { getCoinsMarkets } = MarketStore;
    
    const { coin } = toRefs(props);
    const { platformsSummary } = storeToRefs(MarketStore);
    const open = ref(false);
    const platforms_list = ref([]);
    const platforms_summary = computed(() => platformsSummary.value);
    const disable_dropdown = computed(() => platforms_list.value?.length === 1);
    
    const platforms = Object.entries(coin.value?.platforms)
        .filter(([key, value]) => key.trim() !== '' && value.trim() !== '')
        .map(([key, value]) => ({
            'name': key,
            'value': value
        }));
    
    platforms.forEach(contract => platforms_list.value.push(contract.name));
    
    const platformImageMap = computed(() => {
        if (!platforms_summary.value) return [];
        return platforms_list.value.map(name => {
            const platformData = platforms_summary.value?.find(obj => obj.id === name);
            return {
                name,
                image: platformData?.image || null,
            };
        });
    });

    
    const onCopyLink = contract => {
        navigator.clipboard.writeText(contract.value);
        
        toast(``, {
            title: () =>
                h('h6', {
                    class: 'font-medium',
                }, `${coin.value?.name} (${capitalize(contract.name)}) contract copied.`),
            icon: () =>
                h(resolveComponent('NuxtIcon'), {
                    name: 'iconoir:check-circle-solid',
                    size: 30,
                    class: 'w-[50px]',
                }),
            action: {
                label: 'OK',
            },
            description: () =>
                h('span', {
                    class: '',
                }, contract.value),
        });
    };
    
    // coin list with market data
    onMounted(async() => {
        if (platforms_summary.value?.length) {
            await getCoinsMarkets({
                params: {
                    vs_currency: 'usd',
                    ids: platforms_list.value,
                },
            }, 'list');
        }
    });
</script>