<template>
    <section class='welcome xl:mt-40 flex flax-col md:flex-row justify-center items-center gap-10 xl:gap-30'>
        <NuxtLink to='/cryptocurrencies' class='link-item flex flex-col items-center justify-center'>
            <NuxtImg src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525072/btc-circle_mbhyga.svg' alt='Image' />
            <h3 class='my-5 uppercase'>Cryptocurrencies</h3>
        </NuxtLink>
        
        <NuxtLink to='/news' class='link-item flex flex-col items-center justify-center'>
            <NuxtImg src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525063/btc-pink_nxk9ig.svg' alt='Image' />
            <h3 class='my-5 uppercase'>News</h3>
        </NuxtLink>
        
        <NuxtLink to='/defi' class='link-item flex flex-col items-center justify-center'>
            <NuxtImg src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753525063/btc-tree_b2gnne.svg' alt='Image' />
            <h3 class='my-5 uppercase'>Defi</h3>
        </NuxtLink>
    </section>
</template>

<script setup>
    // const cryptocurrencies = 'btc-pink.svg';
    // const defi = 'btc-tree.svg';
</script>

<style scoped>
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
</style>