<template>
    <Card class='coin-description flex flex-col gap-20 p-10' v-if='coingecko'>
        <div
            v-if='description_formatted'
            class='description flex flex-col gap-6'
        >
            <CardTitle class='flex items-center gap-2'>
                <NuxtIcon
                    name='mdi:about-variant'
                    class='block text-foreground'
                    size='30'
                />
                
                <h6 class='flex items-center gap-2'>
                    What is {{ coingecko.name }}
                    <span class='mt-0.5'>&#40;{{ coin.symbol }}&#41;</span>
                </h6>
            </CardTitle>
            
            <CardDescription class='flex flex-col gap-6'>
                <p
                    v-for='paragraph in description_formatted'
                    :key='paragraph'
                    class='text-sm text-foreground'
                >
                    {{ paragraph }}
                </p>
            </CardDescription>
        </div>
        
        <!--  Categories  -->
        <div
            v-if='coingecko.categories'
            class='categories flex flex-col gap-6'
        >
            <CardTitle class='flex items-center gap-2'>
                <NuxtIcon
                    name='iconoir:hashtag'
                    class='block'
                    size='24'
                />
                <h6>Categories</h6>
            </CardTitle>
            
            <div>
                <Badge
                    v-for='category in categories'
                    :key='category'
                    class='m-2 py-2 px-3'
                    variant='outline'
                >
                    {{ category }}
                </Badge>
            </div>
        </div>
    </Card>
</template>

<script setup>
    import { Badge } from '@/components/ui/badge';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const description = ref(coingecko.value?.description?.en);
    const categories = ref(coingecko.value?.categories);
    
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
