<template>
    <section v-if='coingecko' class='flex lg:flex-col items-stretch px-20'>
        <h5 class='mb-6'>About
            <span class='capitalize'>{{ coingecko.id }}</span>
            <span class='ml-2'>&#40;{{ coin.symbol }}&#41;</span>
        </h5>
        
        <!--  Description  -->
        <div v-show='description' class='bg-accent-foreground rounded-t-md'>
            <Accordion type='single' collapsible class='py-3 px-6'>
                <AccordionItem value='item-1' class=''>
                    <AccordionTrigger>
                        <p>What is {{ coingecko.name }}</p>
                    </AccordionTrigger>
                    
                    <AccordionContent class='py-6'>{{ description }}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        
        <!--  Categories  -->
        <div v-if='coingecko.categories' class='bg-accent-foreground rounded-b-md'>
            <Accordion type='single' collapsible class='py-3 px-6'>
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
    </section>
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
    const description = coingecko.value?.description?.en;
</script>

<style scoped>
    h6 {
        text-transform: capitalize;
    }
</style>