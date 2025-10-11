<template>
    <div v-if='coin_price' class='coin-converter flex flex-col gap-4'>
        <!-- Converter Title -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='iconoir:calculator'
                size='20'
            />
            
            <h4>{{ coin_symbol }} converter</h4>
        </div>
        
        <div>
            <!-- $COIN Input -->
            <div class='relative h-12'>
                <Label
                    for='coin' class='absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground'
                >
                    {{ coin_symbol }}
                </Label>
                
                <Input
                    :modelValue='coin_input'
                    type='number'
                    id='coin'
                    class='coin-input h-full !bg-popover pl-14 focus-visible:border-blue-hippie focus-visible:ring-[0px] rounded-bl-none rounded-br-none'
                    :defaultValue='coin_price'
                    @input='updatePrice("coin", $event)'
                    @change='resetOnInvalidNumber($event)'
                />
            </div>
            
            <!-- $USD Input -->
            <div class='relative h-12'>
                <Label
                    for='usd' class='absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground'
                >
                    USD
                </Label>
                
                <Input
                    :modelValue='usd_input'
                    type='number'
                    id='usd'
                    :defaultValue='coin_input'
                    class='usd-input h-full !bg-popover pl-14 focus-visible:border-blue-hippie focus-visible:ring-[0px] rounded-tl-none rounded-tr-none'
                    @input='updatePrice("usd", $event)'
                    @change='resetOnInvalidNumber'
                />
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    
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
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        input {
            -moz-appearance: textfield;
        }
    }
</style>