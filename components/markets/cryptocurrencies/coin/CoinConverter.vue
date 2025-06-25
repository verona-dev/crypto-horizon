<template>
    <div class='coin-converter'>
        <MazInput
            v-model.number='coinInput'
            color='info'
            rounded-size='md'
            class='coin-input'
            @input='updatePrice("coin", $event)'
            @change='resetOnInvalidNumber'
        >
            <template #left-icon>
                {{ activeSymbol }}
            </template>
        </MazInput>
        
        <MazInput
            v-model.number='usdInput'
            color='info'
            rounded-size='md'
            class='usd-input'
            @input='updatePrice("usd", $event)'
            @change='resetOnInvalidNumber'
        >
            <template #left-icon>
                USD
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
            default: () => ({}),
        },
        activeSymbol: {
            type: String,
            default: '',
        }
    });
    
    const { coin, activeSymbol } = toRefs(props);
    const coinPrice = computed(() => {
        if (coin.value?.rate == null) return 0;
        return Math.round(coin.value.rate * 100) / 100;
    });
    const coinInput = ref(1);
    const usdInput = ref(coinPrice.value);
    
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
                usdInput.value = Math.round(inputValue * coinPrice.value * 100) / 100;
            }
            
            if(type === 'usd') {
                coinInput.value = Math.round((inputValue / coinPrice.value) * 100) / 100;
            }
        }
    };
    
    const resetOnInvalidNumber = (event: any) => {
        if(!isNumberValid(event)) {
            resetInputs();
        }
    };
    
    const resetInputs = () => {
        coinInput.value = 1;
        usdInput.value = coinPrice.value;
    };
</script>

<style>
    .coin-converter {
        width: 250px;
    }
    
    .m-input {
        
        .m-input-wrapper {
            /*background-color: #fff !important;*/
            //border-top-left-radius: 0 !important;
        }
    }
    
    .coin-input {
        .m-input-wrapper {
            /*background-color: #fff !important;*/
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
    }
    
    .usd-input {
        .m-input-wrapper {
            /*background-color: #fff !important;*/
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }
    }
</style>