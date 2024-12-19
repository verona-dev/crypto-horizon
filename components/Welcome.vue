<template>
    <div class='welcome'>
        <section class='illustrations-container'>
            <NuxtLink to='/coins'>
                <NuxtImg src='btc-pink.svg' alt="Image" width="1536" />
                <h2>Coins</h2>
            </NuxtLink>
            
            <NuxtLink to='/defi'>
                <NuxtImg src='btc-tree.svg' alt="Image" width="1536" />
                <h2>Defi</h2>
            </NuxtLink>
        </section>
    </div>
</template>

<script setup>
// const coins = 'btc-pink.svg';
// const defi = 'btc-tree.svg';
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