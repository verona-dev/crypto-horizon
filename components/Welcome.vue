<template>
    <div class='welcome'>
        <section class='illustrations-container'>
            <NuxtLink to='/cryptocurrencies'>
                <NuxtImg src='btc-pink.svg' alt='Image' width='1536' />
                <h3>Markets</h3>
            </NuxtLink>
            
            <NuxtLink to='/defi'>
                <NuxtImg src='btc-tree.svg' alt='Image' width='1536' />
                <h3>Defi</h3>
            </NuxtLink>
        </section>
    </div>
</template>

<script setup>
// const cryptocurrencies = 'btc-pink.svg';
// const defi = 'btc-tree.svg';
</script>

<style scoped>
    .welcome {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        h3 {
            margin: 20px 0;
            text-transform: uppercase;
        }
        
        .illustrations-container {
            display: flex;
            justify-content: space-evenly;
            width: 80%;
            
            img {
                border-radius: 6px;
                height: 400px;
                object-fit: cover;
                transition: all 200ms ease-in-out;
                width: 500px;
                
                &:hover {
                    opacity: 0.85;
                    transition: all 100ms ease-in-out;
                }
            }
        }
    }
</style>