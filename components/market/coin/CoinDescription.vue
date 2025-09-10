<template>
    <div v-if='coingecko' class='flex flex-col'>
        <h5 class='mb-6'>About
            <span class='capitalize'>{{ coingecko.id }}</span>
            <span class='ml-2'>&#40;{{ coin.symbol }}&#41;</span>
        </h5>
        
        <Accordion
            v-show='description'
            type='single'
            collapsible class='py-3 px-6 rounded-t-md'
        >
            <AccordionItem value='item-1' class=''>
                <AccordionTrigger>
                    <p>What is {{ coingecko.name }}</p>
                </AccordionTrigger>
                
                <AccordionContent class='py-6'>{{ description }}</AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <Separator class='bg-ring' />
        
        <!--  Categories  -->
        <Accordion v-if='coingecko.categories' type='single' collapsible class='py-3 px-6 rounded-b-md'>
            <AccordionItem value='item-1'>
                <AccordionTrigger>
                    <p>Categories</p>
                </AccordionTrigger>
                
                <AccordionContent class='py-6'>
                    <MazBadge
                        v-for='category in coingecko.categories'
                        :key='category'
                        color='gray'
                        class='m-2'
                        outline
                    >
                        {{ category }}
                    </MazBadge>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
</template>

<script setup>
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion/index.ts';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const description = coingecko.value?.description?.en;
</script>

<style scoped>
    h6 {
        text-transform: capitalize;
    }
    
    [data-slot='accordion-content'] {
        width: 650px !important;
    }
</style>