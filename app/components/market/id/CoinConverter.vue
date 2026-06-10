<template>
    <div v-if='coin_price' class='flex flex-col gap-8'>
        <!-- Converter Title -->
        <div class='text-primary flex items-center gap-2'>
            <NuxtIcon
                name='ph:calculator-duotone'
                size='36'
            />
            
            <Title :tag='4'>{{ coin_symbol }} converter</Title>
        </div>
        
        <div>
            <!-- $COIN Input -->
            <div class='relative h-12'>
                <Label for='coin' class='absolute left-3 top-1/2 transform -translate-y-1/2'>
                    {{ coin_symbol }}
                </Label>
                
                <Input
                    :modelValue='coin_input'
                    type='text'
                    id='coin'
                    class='bg-muted/50 h-full pl-18 focus-visible:border-primary/50 focus-visible:ring-[0px] rounded-bl-none rounded-br-none'
                    :defaultValue='coin_price'
                    @input='(e: Event) => onInput("coin", e)'
                    @change='resetOnInvalidNumber'
                />
            </div>
            
            <!-- $USD Input -->
            <div class='relative h-12'>
                <Label for='usd' class='absolute left-3 top-1/2 transform -translate-y-1/2'>
                    USD
                </Label>
                
                <Input
                    :modelValue='usd_input'
                    type='text'
                    id='usd'
                    class='bg-muted/50 h-full pl-18 focus-visible:border-primary/50 focus-visible:ring-[0px] rounded-tl-none rounded-tr-none'
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
    import Title from '~/components/Title.vue';
    
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