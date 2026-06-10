<template>
    <Card class='flex flex-col gap-24 p-16' v-if='coingecko'>
        <div
            v-if='description_formatted'
            class='text-primary flex flex-col gap-6'
        >
            <CardTitle class='flex items-center gap-2'>
                <NuxtIcon
                    name='ph:info-duotone'
                    class='block'
                    size='36'
                />
                
                <Title :tag='4'>
                    What is {{ coingecko.name }}
                    <span class='mt-0.5'>&#40;{{ coin.symbol }}&#41;</span>
                </Title>
            </CardTitle>
            
            <CardDescription class='flex flex-col gap-6'>
                <p
                    v-for='paragraph in description_formatted'
                    :key='paragraph'
                    class='text-foreground'
                >
                    {{ paragraph }}
                </p>
            </CardDescription>
        </div>
        
        <!--  Categories  -->
        <div
            v-if='coingecko.categories'
            class='flex flex-col gap-6'
        >
            <CardTitle class='text-primary flex items-center gap-2'>
                <NuxtIcon
                    name='ph:hash-duotone'
                    class='block'
                    size='32'
                />
                
                <Title :tag='4'>Categories</Title>
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
    import { Badge } from '~/components/ui/badge';
    import { Card, CardTitle, CardDescription } from '~/components/ui/card';
    import Title from '~/components/Title.vue';
    
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
