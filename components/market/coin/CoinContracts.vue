<template>
    <div v-if='platforms_list.length' class='coin-contracts'>
        <div class='flex items-center mb-4'>
            <NuxtIcon
                name='bitcoin-icons:sign-outline'
                size='45'
                class='mr-3 min-w-14'
            />
            <h5>Contracts</h5>
        </div>
        
        <div class='flex items-center rounded-md border border-card-border'>
            <!--  Main Contract  -->
            <MazBadge
                class='main-badge w-full cursor-pointer'
                color='info'
                @click='onCopyLink(platforms[0])'
            >
                <div class='flex items-center w-3/4 justify-around'>
                    <NuxtImg
                        v-if='platformImageMap.find(platform => platform.name === platforms[0].name)?.image'
                        :src='platformImageMap.find(platform => platform.name === platforms[0].name).image'
                        width='30'
                        height='30'
                        class='mr-2'
                    />
                    
                    <p class='capitalize'>{{ platforms[0].value.slice(0, 5) + '...' + platforms[0].value.slice(-5) }}</p>
                    
                    <div class='flex items-center justify-center'>
                        <NuxtIcon
                            name='radix-icons:copy'
                            size='20'
                            class='w-[50px]'
                        />
                    </div>
                </div>
            </MazBadge>
            
            <div class='vertical-separator'></div>
            
            <!--  All Contracts - Dropdown menu  -->
            <MazDropdown
                trigger='click'
                class='contracts-dropdown'
                position='bottom right'
                :disabled='disable_dropdown'
            >
                <template #dropdown>
                    <div
                        v-for='contract in platforms'
                        :key='contract'
                    >
                        <MazBtn
                            block
                            justify='start'
                            class='my-1'
                            color='transparent'
                            @click='onCopyLink(contract)'
                        >
                            <div class='py-1 flex justify-between items-center w-full'>
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
                        </MazBtn>
                    </div>
                </template>
            </MazDropdown>
        </div>
    </div>
</template>

<script setup>
    import { toast } from 'vue-sonner';
    import { h, resolveComponent } from 'vue';
    // MarketStore
    import { useMarketStore } from '~/stores/MarketStore.js';
    
    const props = defineProps({
        coin: Object,
        required: true,
    });
    const MarketStore = useMarketStore();
    
    const { coin } = toRefs(props);
    const { getCoingeckoCoinListSummary } = MarketStore;
    const platforms_list = ref([]);
    const platforms_summary = ref([]);
    const disable_dropdown = computed(() => platforms_list.value?.length === 1);
    
    const platforms = Object.entries(coin.value?.platforms)
        .filter(([key, value]) => key.trim() !== '' && value.trim() !== '')
        .map(([key, value]) => ({
            'name': key,
            'value': value
        }));
    
    platforms.forEach(contract => platforms_list.value.push(contract.name));
    
    const platformImageMap = computed(() => {
        return platforms_list.value.map(name => {
            const platformData = platforms_summary.value.find(obj => obj.id === name);
            return {
                name,
                image: platformData?.image || null,
            };
        });
    });
    
    const onCopyLink = contract => {
        navigator.clipboard.writeText(contract.value);

        toast(`${coin.value?.name} (${capitalize(contract.name)}) contract copied to clipboard`, {
            duration: 2500,
            icon: () =>
                h(resolveComponent('NuxtIcon'), {
                    name: 'iconoir:check-circle-solid',
                    size: 30,
                    class: 'w-[50px]',
                }),
            action: {
                label: 'OK',
            },
        });
    };
    
    // coin list with market data
    onMounted(async() => {
        platforms_summary.value = await getCoingeckoCoinListSummary({
            query: { ids: platforms_list.value }
        });
    });
</script>