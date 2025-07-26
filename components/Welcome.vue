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

<template>
    <section class='welcome xl:mt-40 flex flax-col md:flex-row justify-center items-center gap-10 xl:gap-30'>
        <WelcomeItem
            v-for='item in welcomeItems'
            :title='item.title'
            :src='item.src'
            :alt='item.alt'
            :to='item.to'
            :keyItem='item.title'
        />
        
        <!--
        <NuxtLink to='/cryptocurrencies' class='link-item flex flex-col items-center justify-center'>
            <WelcomeSkeleton v-if='!isLoaded' />
            
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525072/btc-circle_mbhyga.svg'
                alt='Image'
                @load='loadImg'
                v-else
            />
            <h3 class='my-5 uppercase'>Cryptocurrencies</h3>
        </NuxtLink>
        -->
        
<!--
        <NuxtLink to='/news' class='link-item flex flex-col items-center justify-center'>
            <WelcomeSkeleton v-if='!isLoaded' />
            
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525063/btc-pink_nxk9ig.svg'
                alt='Image'
                @load='loadImg'
                v-else
            />
            <h3 class='my-5 uppercase'>News</h3>
        </NuxtLink>
        -->
        
<!--
        <NuxtLink to='/defi' class='link-item flex flex-col items-center justify-center'>
            <WelcomeSkeleton v-if='!isLoaded' />
            
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525063/btc-tree_b2gnne.svg'
                alt='Image'
                @load='loadImg'
                v-else
            />
            <h3 class='my-5 uppercase'>Defi</h3>
        </NuxtLink>
        -->
    </section>
</template>

<style scoped>
    /*
    .welcome {
        .link-item {
            &:hover img {
                opacity: 0.85;
                scale: 1.02;
            }
            
            &:hover h3 {
                color: var(--secondary);
            }
        }
        
        img {
            border-radius: 6px;
            height: 450px;
            object-fit: cover;
            transition: all 200ms ease-in-out;
            width: 300px;
        }
    }
    */
</style>