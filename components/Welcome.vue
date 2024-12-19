<template>
    <div class='welcome'>
        <section class='illustrations-container'>
            <NuxtLink to='/coins'>
                <NuxtImg v-if='coins' :src='coins' alt="Image" />
                <h2>Coins</h2>
            </NuxtLink>
            
            <NuxtLink to='/defi'>
                <NuxtImg v-if='defi' :src='defi' alt="Image" />
                <h2>Defi</h2>
            </NuxtLink>
        </section>
    </div>
</template>

<script setup>
const coins = 'btc-pink.svg';
const defi = 'btc-tree.svg';
</script>

<style scoped lang='scss'>
    .welcome {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        h2 {
            margin: 20px 0;
            text-transform: uppercase;
        }
        
        .illustrations-container {
            display: flex;
            justify-content: space-evenly;
            width: 1400px;
            
            img {
                border-radius: 6px;
                height: 500px;
                object-fit: cover;
                transition: all 200ms ease-in-out;
                width: 600px;
                
                &:hover {
                    opacity: 0.85;
                    transition: all 100ms ease-in-out;
                }
            }
        }
    }
</style>