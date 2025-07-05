<template>
    <div
        v-if='contracts'
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
            >
                <template #dropdown>
                    <div
                        v-for='contract in contracts'
                        :key='contract'
                        class=''
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
                                        <span>{{ contract.value.slice(0, 15) + '...' }}</span>
                                    </div>
                                </div>
                                
                                <div class='flex items-center justify-center'>
                                    Copy link
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
    const props = defineProps({
        coin: [],
        required: true,
    });
    // CryptocurrenciesStore
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { coin } = toRefs(props);
    const { getCoingeckoContractListCoins } = CryptocurrenciesStore;
    let ids = [];
    
    const contracts = Object.entries(coin.value.platforms).map(([key, value]) => ({
        'name': key,
        'value': value
    }));
    
    console.log('contracts: ' ,contracts);
    
    contracts.forEach(contract => ids.push(contract.name));
    
    // console.log('ids: ', ids);
    
    // coin list with market data
    onMounted(async() => {
        const response = await getCoingeckoContractListCoins({
            query: { ids }
        });
        // if(response) console.log('getCoingeckoContractListCoins: ', response);
    });
</script>

<style>
    .menu {
        width: 100px !important;
    }
</style>