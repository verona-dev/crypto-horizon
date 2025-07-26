<template>
    <section class='welcome xl:mt-40 flex flax-col md:flex-row justify-center items-center gap-10 xl:gap-30'>
        <WelcomeItem
            v-for='item in welcomeItems'
            :title='item.title'
            :src='item.src'
            :alt='item.alt'
            :to='item.to'
            :key='item.title'
        />
    </section>
</template>

<script setup>
    import WelcomeItem from '~/components/WelcomeItem.vue';
    
    const welcomeItems = [
        {
            title: 'Cryptocurrencies',
            src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525072/btc-circle_mbhyga.svg',
            alt: 'cryptocurrencies image',
            to: '/cryptocurrencies',
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