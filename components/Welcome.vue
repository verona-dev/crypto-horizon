<template>
    <div class='flex flex-col items-center gap-8 md:gap-32 px-10 pb-10'>
        <h1 class='my-20 md:my-0'>Crypto Horizon</h1>
        
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
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525072/btc-circle_mbhyga.svg',
            alt: 'market image',
            to: '/market',
        },
        {
            title: 'News',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525063/btc-pink_nxk9ig.svg',
            alt: 'news image',
            to: '/news',
        },
        {
            title: 'Defi',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525063/btc-tree_b2gnne.svg',
            alt: 'defi image',
            to: '/defi',
        },
    ];
</script>

<style scoped>
    h1 {
        letter-spacing: 1rem;
        word-spacing: 2.5rem;
        background-image: url('https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        //background-image: url('https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-size: 300%;
        background-position: 0 50%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: animate-background 100s infinite alternate linear;
    }
    
    @keyframes animate-background {
        0% {
            background-position: 0 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }
</style>