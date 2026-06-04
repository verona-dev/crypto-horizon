<template>
    <div class='glossary'>
        <Title>this is component</Title>
    </div>
</template>

<script setup>
    import Title from '@/components/Title';
    
    // AcademyStore
    import { useAcademyStore } from '@/stores/AcademyStore.js';
    const AcademyStore = useAcademyStore();
    const { encyclopedia } = storeToRefs(AcademyStore);
    const { getEncyclopedia } = AcademyStore;

    onMounted(async() => {
       await getEncyclopedia();
    });
</script>