<template>
    <div class='glossary max-w-5xl flex flex-col gap-8'>
        <Title>Glossary</Title>
        
        <div class='flex flex-col gap-12'>
            <Item
                v-for='item in encyclopedia'
                :key='item.id'
                variant='muted'
            >
                <ItemContent>
                    <ItemTitle class='text-primary'>{{ item.title }}</ItemTitle>
                    <ItemDescription class='text-muted-foreground'>{{ item.description }}</ItemDescription>
                </ItemContent>
            </Item>
        </div>
    </div>
</template>

<script setup>
    import Title from '@/components/Title';
    import { Item, ItemDescription, ItemContent, ItemTitle } from '~/components/ui/item';
    
    // AcademyStore
    import { storeToRefs } from 'pinia';
    import { useAcademyStore } from '@/stores/AcademyStore.js';
    const AcademyStore = useAcademyStore();
    const { encyclopedia } = storeToRefs(AcademyStore);
    const { getEncyclopedia } = AcademyStore;
    
    onMounted(async() => {
        if(!encyclopedia.value.length) await getEncyclopedia();
    });
</script>