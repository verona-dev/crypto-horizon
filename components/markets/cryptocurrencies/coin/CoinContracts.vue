<template>
    <div
        v-if='platforms.length'
        class='coin-contracts'
    >
        <h6>Contracts</h6>
        
        <div class='flex items-center'>
            <!--  Main Contract  -->
            <MazBadge
                class='main-badge w-full'
                color='info'
            >
                <div class='flex items-center'>
                    <NuxtImg
                        v-if='platformImageMap.find(platform => platform.name === platforms[0].name)?.image'
                        :src='platformImageMap.find(platform => platform.name === platforms[0].name).image'
                        width='30'
                        height='30'
                        class='mr-2'
                    />
                    
                    <p class='capitalize'>{{ platforms[0].name }}</p>
                    
                    <div
                        @click='onCopyLink(platforms[0].value)'
                        class='flex items-center justify-center cursor-pointer'
                    >
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
            >
                <template #dropdown>
                    <div
                        v-for='contract in platforms'
                        :key='contract'
                    >
                        <MazBtn
                            block
                            justify='start'
                            class='h-20 p-4'
                            color='transparent'
                        >
                            <div class='flex justify-between items-center w-full gap-x-12'>
                                <div class='flex items-center gap-4'>
                                    <div class='flex w-12'>
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
                                    
                                    <div class='flex flex-col items-start'>
                                        <span class='capitalize'>{{ contract.name }}</span>
                                        <span>{{ contract.value.slice(0, 7) + '...' + contract.value.slice(-7) }}</span>
                                    </div>
                                </div>
                                
                                <div
                                    @click='onCopyLink(contract.value)'
                                    class='flex items-center justify-center cursor-pointer'
                                >
                                    <NuxtIcon
                                        name='radix-icons:copy'
                                        size='20'
                                        class='w-[50px]'
                                    />
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
    // CryptocurrenciesStore
    import { useCryptocurrenciesStore } from '~/stores/CryptocurrenciesStore';
    
    const props = defineProps({
        coin: [],
        required: true,
    });
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { coin } = toRefs(props);
    const { getCoingeckoCoinListSummary } = CryptocurrenciesStore;
    let platformsList = ref([]);
    const platformsSummary = ref([]);
    
    const platforms = Object.entries(coin.value?.platforms)
        .filter(([key, value]) => key.trim() !== '' && value.trim() !== '')
        .map(([key, value]) => ({
            'name': key,
            'value': value
        }));
    
    platforms.forEach(contract => platformsList.value.push(contract.name));
    
    const platformImageMap = computed(() => {
        return platformsList.value.map(name => {
            const platformData = platformsSummary.value.find(obj => obj.id === name);
            return {
                name,
                image: platformData?.image || null,
            };
        });
    });
    watch(platformImageMap, (newVal) => {
        console.log('platformImageMap updated:', newVal);
    }, { immediate: true });
    
    const onCopyLink = contract => {
        navigator.clipboard.writeText(contract);
        
        toast('Contract copied to clipboard', {
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
        platformsSummary.value = await getCoingeckoCoinListSummary({
            query: { ids: platformsList.value }
        });
    });
</script>

<style>
    .m-btn {
        cursor: auto !important;
    }
    
    [data-sonner-toast] {
        background-color: var(--card-small) !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        display: flex !important;
        justify-content: space-around !important;
    }
    
    [data-icon] {
        color: var(--chart-2) !important;
        margin-right: 10px !important;
    }
    
    [data-button] {
        margin: 0 !important;
    }
</style>