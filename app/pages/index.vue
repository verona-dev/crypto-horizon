<template>
    <div class='flex flex-col items-center gap-8 2xl:gap-32 px-20 pb-20 2xl:pb-10'>
        <h1 class='mt-20 mb-20 2xl:mb-0 select-none break-words flex flex-col gap-3'>
            <span>Crypto</span>
            <span>Horizon</span>
        </h1>
        
        <div class='flex flex-wrap justify-center items-center gap-12 md:gap-20 2xl:gap-30'>
            <WelcomeItem
                v-for='item in welcomeItems'
                :title='item.title'
                :src='item.src'
                :alt='item.alt'
                :to='item.to'
                :key='item.title'
            />
        </div>
    </div>
</template>

<script setup>
    import WelcomeItem from '~/components/WelcomeItem.vue';
    
    const welcomeItems = [
        {
            title: 'Markets',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755195826/cyberpunk-bitcoin-illustration-2_u6fytd.webp',
            alt: 'market image',
            to: '/market',
        },
        {
            title: 'News',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545835/ai-generated-8517436_1920_vk0pnk.png',
            alt: 'news image',
            to: '/news',
        },
        {
            title: 'Defi',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755195953/cyberpunk-bitcoin-illustration_jejcnb.webp',
            alt: 'defi image',
            to: '/defi',
        },
        {
            title: 'Learn',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755194748/andre-francois-mckenzie-uw3VwkDHiMI-unsplash_hs9t15.jpg',
            alt: 'learn image',
            to: '/learn',
        },
    ];
    
    definePageMeta({
        layout: 'welcome',
    })
</script>

<style scoped>
    h1 {
        letter-spacing: 1rem;
        word-spacing: 2.5rem;
        font-weight: 600;
        
        background-image: url('~/assets/images/hero.webp');
        background-size: 110%;
        animation: animate-background 25s infinite linear;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    @keyframes animate-background {
        0% {
            background-position: 75% 90%;
        }
        100% {
            background-position: 50% 0;
        }
    }
</style>