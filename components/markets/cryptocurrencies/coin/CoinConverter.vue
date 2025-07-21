<template>
    <div v-if='coin_price' class='coin-converter flex flex-col'>
        <div class='flex items-center mb-4'>
            <NuxtIcon
                name='bitcoin-icons:exchange-outline'
                size='43'
                class='mr-3 min-w-14'
            />
            <h5>{{ coin_symbol }} to USD converter</h5>
        </div>
        
        <MazInput
            v-model.number='coin_input'
            color='info'
            rounded-size='md'
            class='coin-input'
            @input='updatePrice("coin", $event)'
            @change='resetOnInvalidNumber'
        >
            <template #left-icon>
                <span class='min-w-12'>{{ coin_symbol }}</span>
            </template>
        </MazInput>
        
        <MazInput
            v-model.number='usd_input'
            color='info'
            rounded-size='md'
            class='usd-input'
            @input='updatePrice("usd", $event)'
            @change='resetOnInvalidNumber'
        >
            <template #left-icon>
                <span class='min-w-12'>USD</span>
            </template>
        </MazInput>
    </div>

</template>

<script lang='ts' setup>
    import {ref} from 'vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const coin_symbol = coin.value?.symbol;
    const coin_price = computed(() => {
        const rate = coin.value?.coingecko.market_data.current_price.usd;
        if (rate == null) return 0;
        return Math.round(rate * 100) / 100;
    });
    const coin_input = ref(1);
    const usd_input = ref(coin_price.value || 1);
    
    const isNumberValid = (event: any) => {
        const input = event.target?.value;
        const isNumber = !isNaN(input);
        const isNotEmpty = input.trim() !== '';
        
        return isNumber && isNotEmpty;
    };
    
    const updatePrice = (type: 'coin' | 'usd', event: any) => {
        if(isNumberValid(event)) {
            const inputValue = parseFloat(event.target.value);
            
            if (type === 'coin') {
                usd_input.value = Math.round(inputValue * coin_price.value * 100) / 100;
            }
            
            if(type === 'usd') {
                coin_input.value = Math.round((inputValue / coin_price.value) * 10000) / 10000;
            }
        }
    };
    
    const resetOnInvalidNumber = (event: any) => {
        if(!isNumberValid(event)) {
            resetInputs();
        }
    };
    
    const resetInputs = () => {
        coin_input.value = 1;
        usd_input.value = coin_price.value;
    };
</script>

<style>
    .coin-converter {
        .m-input-wrapper {
            background-color: var(--accent-foreground) !important;
        }
        
        .coin-input {
            .m-input-wrapper {
                border-bottom-left-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                width: 100%;
            }
        }
        
        .usd-input {
            .m-input-wrapper {
                border-top-left-radius: 0 !important;
                border-top-right-radius: 0 !important;
                width: 100%;
            }
        }
    }
</style>