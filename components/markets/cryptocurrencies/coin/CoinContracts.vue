<template>
    <div
        v-if='contracts.length'
        class='coin-contracts'
    >
        <h6>Contracts</h6>
        
        <div class='flex items-center'>
            <!--  Main Contract  -->
            <NuxtLink
                to=''
                target='_blank'
                class='inline-flex items-center flex-1'
            >
                <MazBadge
                    class='main-badge w-full'
                    color='info'
                >
                    <div class='py-1.5 pr-4 flex items-center'>
                        <p class='capitalize'>{{ contracts[0].name }}</p>
                    </div>
                </MazBadge>
            </NuxtLink>
            
            <div class='vertical-separator'></div>
            
            <!--  All Contracts - Dropdown menu  -->
            <MazDropdown
                trigger='click'
                class='contracts-dropdown'
                position='bottom right'
            >
                <template #dropdown>
                    <div
                        v-for='contract in contracts'
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
                                    <NuxtIcon name='radix-icons:globe' size='20' />
                                    
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
    
    
    const props = defineProps({
        coin: [],
        required: true,
    });
    // CryptocurrenciesStore
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { coin } = toRefs(props);
    const { getCoingeckoContractListCoins } = CryptocurrenciesStore;
    let chains = [];
    
    const contracts = Object.entries(coin.value?.platforms)
        .filter(([key, value]) => key.trim() !== '' && value.trim() !== '')
        .map(([key, value]) => ({
            'name': key,
            'value': value
        }));
    
    console.log('contracts: ' ,contracts);
    
    contracts.forEach(contract => chains.push(contract.name));
    
    console.log('ids: ', chains);
    
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
        const response = await getCoingeckoContractListCoins({
            query: { ids: chains }
        });
        // if(response) console.log('getCoingeckoContractListCoins: ', response);
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