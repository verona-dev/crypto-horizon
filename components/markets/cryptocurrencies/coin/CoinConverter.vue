<template>
    <div class='coin-converter'>
        <MazInput
            v-model='priceValue'
            placeholder='Enter number'
            no-buttons
            color='info'
            no-radius
            class='coin-input'
        >
            <template #left-icon>
                {{ activeSymbol }}
            </template>
        </MazInput>
        
        <MazInputPrice
            v-model='priceValue'
            currency='USD'
            locale='en-US'
            @formatted='formattedPrice = $event'
            color='info'
            no-radius
            class='usd-input'
        >
            <template #left-icon>
                USD
            </template>
        </MazInputPrice>
    </div>

</template>

<script lang='ts' setup>
    import { ref } from 'vue';
    
    const priceValue = ref(1);
    const formattedPrice = ref();
    
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
    console.log(coin.value)
</script>

<style>
    .coin-converter {
        border-radius: 12px;
        width: 250px;
        
        .coin-input {
            border-top-left-radius: 22px !important;
        }
    }
</style>