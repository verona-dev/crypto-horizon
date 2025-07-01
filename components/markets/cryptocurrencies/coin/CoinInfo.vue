<template>
    <div
        v-if='coingecko.description'
        class='w-[500px] self-center'
    >
        <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
                <AccordionTrigger>What is {{ coingecko.name }}</AccordionTrigger>
                <AccordionContent>{{ coingecko.description.en }}</AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion/index.js';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
</script>
