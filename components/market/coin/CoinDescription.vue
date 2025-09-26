<template>
    <div v-if='coingecko' class='flex flex-col gap-12'>
        <Alert class='flex flex-col gap-32 p-16'>
            <div
                v-if='description_formatted'
                class='description flex flex-col gap-8'
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
                
                <AlertDescription class='flex flex-col gap-6'>
                    <p
                        v-for='paragraph in description_formatted'
                        :key='paragraph'
                        class='text-sm text-foreground'
                    >
                        {{ paragraph }}
                    </p>
                </AlertDescription>
            </div>
            
            <!--  Categories  -->
            <div
                v-if='coingecko.categories'
                class='categories flex flex-col gap-8'
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
    const description = ref(coingecko.value?.description?.en);
    
    const description_formatted = computed(() => {
        if (!description.value) return '';
        
        let sentences = description.value
            .split(/\. +|\.(?=\n)|\.(?=$)/)
            .map(s => s.trim())
            .filter(s => s.length);
        
        let paragraphs = [];
        
        for (let i = 0; i < sentences.length; i += sentences.length / 4) {
            let par = sentences.slice(i, i + sentences.length / 4).map(s => s + '.').join(' ');
            paragraphs.push(par);
        }
        
        return paragraphs;
    });
</script>
