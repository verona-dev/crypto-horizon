<template>
    <div class='welcome'>
        <section class='illustrations-container'>
            <NuxtLink to='/market'>
                <NuxtImg :src='market' alt="Image" />
                <h2>Market</h2>
            </NuxtLink>
            
            <NuxtLink to='/defi'>
                <NuxtImg :src='defi' alt="Image" />
                <h2>Defi</h2>
            </NuxtLink>
        </section>
    </div>
</template>

<script setup>
const market = 'btc-circle.svg';
const defi = 'btc-tree.svg';
</script>

<style scoped lang='scss'>
    .welcome {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        h2 {
            //color: var(--color-pink_cabaret);
            font-family: 'Roboto', serif;
            margin: 10px 0;
            text-transform: uppercase;
        }
        
        .illustrations-container {
            display: flex;
            justify-content: space-evenly;
            width: 1200px;
            
            img {
                width: 500px;
                border-radius: 6px;
                transition: all 200ms ease-in-out;
                object-fit: contain;
                
                
                &:hover {
                    opacity: 0.85;
                    transition: all 100ms ease-in-out;
                }
            }
        }
    }
</style>