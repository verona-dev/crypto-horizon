<template>
    <div class='market component'>
        Market
        <UButton
            @click="fetchTokens"
            :loading="loading"
            color='pink'
            variant='outline'
        >
            Fetch
        </UButton>
        
        {{ eth }}
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useFetch } from '#app';
    
    const eth = ref(null);
    const loading = ref(false);
    const coin = 'ethereum';
    const contract = '0xdF574c24545E5FfEcb9a659c229253D4111d87e1,coingecko:ethereum,bsc:0x762539b45a1dcce3d36d080f74d1aed37844b878,ethereum:0xdB25f211AB05b1c97D595516F45794528a807ad8';
    
    const fetchTokens = async() => {
        loading.value = true;
        try {
            const { data: fetchedData } = await useFetch(`https://coins.llama.fi/prices/current/${coin}:${contract}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            eth.value = fetchedData.value;
        } catch (err) {
            console.error(err)
        } finally {
            loading.value = false;
        }
    }
</script>

<style scoped lang='scss'>
    .market {}
</style>