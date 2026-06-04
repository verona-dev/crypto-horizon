<template>
    <div class='glossary max-w-5xl flex flex-col gap-8'>
        <Title>Glossary</Title>
        
        <div class='flex flex-col gap-6'>
            <Item
                v-for='item in encyclopedia'
                :key='item.id'
                variant='muted'
            >
                <ItemContent class='gap-2 py-6 px-8'>
                    <Title :tag='1' :level='4' class='text-primary'>{{ item.title }}</Title>
                    <ItemDescription class='text-muted-foreground text-base line-clamp-none text-pretty'>{{ item.description }}</ItemDescription>
                </ItemContent>
            </Item>
        </div>
    </div>
</template>

<script setup>
    import Title from '@/components/Title';
    import { Item, ItemDescription, ItemContent } from '~/components/ui/item';
    
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