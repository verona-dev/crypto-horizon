<template>
    <div class='glossary max-w-5xl flex flex-col gap-8'>
        <div class='flex flex-col gap-24'>
            <Title>Glossary</Title>
            
            <!--  Letters Index  -->
            <div class='sticky top-0 flex flex-wrap justify-center gap-2'>
                <Button
                    v-for='letter in letters'
                    :key='letter'
                    @click='scrollToLetter(letter)'
                    class='hover:bg-muted/50 hover:text-primary hover:border-primary/25 font-bold text-4xl w-16 h-16'
                    variant='outline'
                >
                    {{ letter }}
                </Button>
            </div>
        </div>
        
        <div
            v-for='(items, letter) in groupedEncyclopedia'
            :key='letter'
            :ref='el => (letterRefs[letter] = el)'
            class='flex flex-col gap-8 py-12'
        >
            <!--  Letter Group  -->
            <h2 class='text-2xl font-bold capitalize py-4'>{{ letter }}</h2>
            
            <!--  Glossary Content  -->
            <Item
                v-for='item in items'
                :key='item.id'
                variant='muted'
            >
                <ItemContent class='gap-2 py-6 px-8'>
                    <Title :tag='1' :level='4' class='text-primary'>
                        {{ item.title }}
                    </Title>
                    <ItemDescription class='text-muted-foreground text-base line-clamp-none text-pretty'>
                        {{ item.description }}
                    </ItemDescription>
                </ItemContent>
            </Item>
        </div>
    </div>
</template>

<script setup>
    import { Button } from '@/components/ui/button/index.ts';
    import Title from '@/components/Title'
    import { Item, ItemDescription, ItemContent } from '~/components/ui/item'
    import { useAcademyStore } from '@/stores/AcademyStore.js'
    
    // Academy Store
    import { storeToRefs } from 'pinia'
    const store = useAcademyStore()
    const { encyclopedia } = storeToRefs(store)
    const { getEncyclopedia } = store
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const letterRefs = reactive({});
    
    const groupedEncyclopedia = computed(() => {
        const groups = {}
        for (const item of encyclopedia.value) {
            const letter = item.title[0].toUpperCase();
            (groups[letter] ??= []).push(item);
        }
        return groups;
    })
    
    const scrollToLetter = (letter) => {
        letterRefs[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    };
    
    onMounted(() => {
        if (!encyclopedia.value.length) getEncyclopedia()
    })
</script>