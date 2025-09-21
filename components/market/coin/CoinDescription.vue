<template>
    <div v-if='coingecko' class='flex flex-col gap-6'>
        <div v-if='description' class='description-container flex flex-col'>
            <Alert class='bg-background flex flex-col gap-4 p-8'>
                <AlertTitle class='flex items-center gap-2'>
                    <NuxtIcon
                        name='mdi:about-variant'
                        class='block text-foreground'
                        size='30'
                    />
                    
                    <h6 class='flex items-center gap-2'>
                        What is {{ coingecko.name }}
                        <span class='mt-0.5'>&#40;{{ coin.symbol }}&#41;</span>
                    </h6>
                </AlertTitle>
                
                <AlertDescription class=''>
                    <p class='text-sm'>{{ description }}</p>
                </AlertDescription>
            </Alert>
        </div>
        
        <Separator class='my-10' />
        
        <!--  Categories  -->
        <div v-if='coingecko.categories' class='flex flex-col gap-6'>
            <h5>Categories</h5>
            
            <div class='categories-container'>
                <MazBadge
                    v-for='category in coingecko.categories'
                    :key='category'
                    color='gray'
                    class='m-2'
                    outline
                >
                    {{ category }}
                </MazBadge>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Info } from "lucide-vue-next"
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
    
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
