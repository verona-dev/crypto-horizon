<template>
    <div class='page'>
        <Glossary />
    </div>
</template>

<script setup>
    import Glossary from '~/components/academy/Glossary.vue';
    import Title from '~/components/Title.vue';
    
    // SEO
    const title = 'Crypto & DeFi Academy: Learn Blockchain & Cryptocurrency';
    const description = 'Master the blockchain and DeFi basics with free guides and tutorials. Learn and stay ahead in the fast-moving crypto space.';
    
    definePageMeta({
        title,
        description,
    });
</script>