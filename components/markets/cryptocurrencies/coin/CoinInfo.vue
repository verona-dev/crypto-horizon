<template>
    <CardContent v-if='coingecko' class='px-20 my-10 flex flex-col'>
        <!--  Description  -->
        <div v-if='coingecko.description' class='bg-accent-foreground'>
            <Accordion type='single' collapsible class='py-2 px-8'>
                <AccordionItem value='item-1' class=''>
                    <AccordionTrigger class=''>
                        <p>What is {{ coingecko.name }}</p>
                    </AccordionTrigger>
                    <AccordionContent v-html='coingecko.description.en'></AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        
        <!--  Categories  -->
        <div v-if='coingecko.categories' class='bg-accent-foreground'>
            <Accordion type='single' collapsible class='py-2 px-8'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger class=''>
                        <p class=''>Categories</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <MazBadge
                            v-for='category in coingecko.categories'
                            :key='category'
                            color='gray'
                            class='m-1.5'
                            outline
                        >
                            {{ category }}
                        </MazBadge>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </CardContent>
    
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
