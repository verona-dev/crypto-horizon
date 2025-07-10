<template>
    <section v-if='coingecko' class='flex lg:flex-col items-stretch px-20'>
        <h6>About
            <span>{{ coingecko.id }}</span>
            <span class='ml-2'>&#40;{{ coin.symbol }}&#41;</span>
        </h6>
        
        <!--  Description  -->
        <div v-if='coingecko.description.length' class='bg-accent-foreground rounded-t-md'>
            <Accordion type='single' collapsible class='py-3 px-6'>
                <AccordionItem value='item-1' class=''>
                    <AccordionTrigger class=''>
                        <p>What is {{ coingecko.name }}</p>
                    </AccordionTrigger>
                    
                    <AccordionContent class='py-6'>
                        {{ coingecko.description.en }}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        
<!--        <Separator class='custom-separator'/>-->
        
        <!--  Categories  -->
        <div v-if='coingecko.categories' class='bg-accent-foreground rounded-b-md'>
            <Accordion type='single' collapsible class='py-3 px-6'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger class=''>
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
</script>

<style scoped>
h6 {
    text-transform: capitalize;
}
</style>