<template>
    <div class='page'>
        <Title>Glossary</Title>
        <Encyclopedia />
    </div>
</template>

<script setup>
    import Encyclopedia from '@/components/academy/Encyclopedia.vue';
    import Title from '~/components/Title.vue';
    
    // SEO
    const title = 'Crypto & DeFi Academy: Learn Blockchain & Cryptocurrency';
    const description = 'Master the blockchain and DeFi basics with free guides and tutorials. Learn and stay ahead in the fast-moving crypto space.';
    
    definePageMeta({
        title,
        description,
    });
</script>