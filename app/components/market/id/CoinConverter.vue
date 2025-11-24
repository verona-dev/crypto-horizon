<template>
    <div v-if='coin_price' class='coin-converter flex flex-col gap-4'>
        <!-- Converter Title -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='ph:calculator'
                size='20'
                class='mt-0.5'
            />
            
            <h4>{{ coin_symbol }} converter</h4>
        </div>
        
        <div>
            <!-- $COIN Input -->
            <div class='relative h-12'>
                <Label for='coin' class='absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground'>
                    {{ coin_symbol }}
                </Label>
                
                <Input
                    :modelValue='coin_input'
                    type='text'
                    id='coin'
                    class='coin-input !bg-background h-full pl-14 focus-visible:border-blue-hippie focus-visible:ring-[0px] rounded-bl-none rounded-br-none'
                    :defaultValue='coin_price'
                    @input='(e: Event) => onInput("coin", e)'
                    @change='resetOnInvalidNumber'
                />
            </div>
            
            <!-- $USD Input -->
            <div class='relative h-12'>
                <Label for='usd' class='absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground'>
                    USD
                </Label>
                
                <Input
                    :modelValue='usd_input'
                    type='text'
                    id='usd'
                    class='usd-input !bg-background h-full pl-14 focus-visible:border-blue-hippie focus-visible:ring-[0px] rounded-tl-none rounded-tr-none'
                    :defaultValue='coin_input'
                    @input='(e: Event) => onInput("usd", e)'
                    @change='resetOnInvalidNumber'
                />
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
    import { Input } from '~/components/ui/input';
    import { Label } from '~/components/ui/label';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const coin_symbol = coin.value?.symbol;
    const coin_price = computed(() => {
        const rate = coin.value?.coingecko?.market_data?.current_price?.usd;
        if (rate == null) return 0;
        return Math.round(rate * 100) / 100;
    });
    const coin_input = ref('1');
    const usd_input = ref(String(coin_price.value || 1));
    
    const isValidNumber = (value: string) => {
        return /^\d*\.?\d*$/.test(value) && value.trim() !== '';
    };
    
    const onInput = (type: 'coin' | 'usd', event: Event) => {
        let input = event?.target;
        let sanitized_input = input?.value.replace(/[^\d.]/g, '');
        const numbers = sanitized_input.split('.');
        
        if (numbers.length > 2) {
            sanitized_input = numbers.shift() + '.' + numbers.join('');
        }
        
        input.value = sanitized_input;
        
        if (isValidNumber(sanitized_input)) {
            const inputVal = parseFloat(sanitized_input);
            
            if (type === 'coin') {
                usd_input.value = String(Math.round(inputVal * coin_price.value * 100) / 100);
                coin_input.value = sanitized_input;
            } else {
                coin_input.value = String(
                    Math.round((inputVal / coin_price.value) * 10000) / 10000
                );
                usd_input.value = sanitized_input;
            }
        } else {
            resetInputs();
        }
    };
    
    const resetOnInvalidNumber = (event: Event) => {
        const input = event.target;
        if (!isValidNumber(input?.value)) {
            resetInputs();
        }
    };
    
    const resetInputs = () => {
        coin_input.value = '1';
        usd_input.value = String(coin_price.value);
    };
</script>

<style>
    .coin-converter {
        input[type="text"]::-webkit-outer-spin-button,
        input[type="text"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        input {
            -moz-appearance: textfield;
        }
    }
</style>