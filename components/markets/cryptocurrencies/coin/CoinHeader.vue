<template>
    <CardHeader v-if='coin' class='my-6 flex flex-col justify-center items-center'>
        <div class='header-content flex items-center'>
            <div class='mr-10'>
                <!-- Logo  -->
                <NuxtImg
                    v-if='coinGecko?.image?.large'
                    :src='coin.coingecko.image.large'
                    alt='symbol'
                    width='150'
                    height='150'
                />
            </div>
            
            <div>
                <!--  Name + Rank  -->
                <div class='flex items-center'>
                    <h2>{{ liveCoinWatch.name }}</h2>
                    
                    <MazBadge
                        color='info'
                        size='1.25rem'
                        rounded-size='md'
                        class='ml-8 mt-2'
                    >
                        #{{ liveCoinWatch.rank }}
                    </MazBadge>
                </div>
                
                <!-- Symbol  -->
                <p class='ml-1 mt-2'>{{ coin.symbol }} {{ liveCoinWatch.symbol }}</p>
                
                <!--  Coin price  -->
                <h4 class='text-foreground mt-4'>{{ liveCoinWatch.rateFormatted }}</h4>
            </div>
        </div>
        
        <div
            v-if='coinGecko.description'
            class='w-[500px] self-center'
        >
            <Accordion type='single' collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is {{ coinGecko.name }}</AccordionTrigger>
                    <AccordionContent>{{ coinGecko.description.en }}</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </CardHeader>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
    import { defineProps, toRefs } from 'vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const liveCoinWatch = toRef(coin.value.liveCoinWatch);
    const coinGecko = toRef(coin.value.coingecko);
</script>

<style scoped>
    p {
        color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
    }
</style>