<template>
    <div v-if='coingecko' class='flex flex-col gap-12'>
        <Alert
            v-if='description'
            class='bg-background flex flex-col gap-8 p-12'
        >
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
        
        <!--  Categories  -->
        <Alert
            v-if='coingecko.categories'
            class='bg-background flex flex-col gap-8 p-12'
        >
            <AlertTitle class='flex items-center gap-2'>
                <NuxtIcon
                    name='iconoir:hashtag'
                    class='block text-foreground'
                    size='24'
                />
                <h6>Categories</h6>
            </AlertTitle>
            
            <div>
                <MazBadge
                    v-for='category in coingecko.categories'
                    :key='category'
                    color='white'
                    class='m-2'
                    outline
                    pastel
                >
                    {{ category }}
                </MazBadge>
            </div>
        </Alert>
    </div>
</template>

<script setup>
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
    
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
