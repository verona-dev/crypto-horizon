<template>
    <div class='flex flex-col items-center gap-8 md:gap-32 px-10 pb-10'>
        <h1 class='my-20 md:my-0 select-none'>
            Crypto Horizon
        </h1>
        
        <div class='flex flex-col md:flex-row justify-center items-center gap-6 xl:gap-30'>
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
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545829/cryptocurrency-6601591_1920_i7bpq2.jpg',
            alt: 'news image',
            to: '/news',
        },
        {
            title: 'Defi',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755195953/cyberpunk-bitcoin-illustration_jejcnb.webp',
            alt: 'defi image',
            to: '/defi',
        },
    ];
</script>

<style scoped>
    h1 {
        letter-spacing: 1rem;
        word-spacing: 2.5rem;
        font-weight: 600;
        
        background-image: url('~/assets/images/hero.webp');
        background-size: 110%;
        animation: animate-background 100s infinite alternate linear;
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