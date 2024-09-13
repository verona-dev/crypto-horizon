<template>
    <div class='welcome'>
        <div class='illustrations-container'>
            <NuxtLink to='/market'>
                <q-img
                    :src='market'
                    no-spinner
                    alt='logo'
                />
                <h2>Market</h2>
            </NuxtLink>
            
            <NuxtLink to='/defi'>
                <q-img
                    :src='defi'
                    no-spinner
                    alt='logo'
                />
                <h2>Defi</h2>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import market from 'assets/illustrations/btc-pink.svg';
import defi from 'assets/illustrations/btc-tree.svg';
</script>

<style scoped lang='scss'>
    .welcome {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        width: 100%;
        
        h1 {
            color: var(--color-pink_cabaret);
        }
        
        h2 {
            font-family: 'Roboto', serif;
            margin: 10px 0;
            text-transform: uppercase;
        }
        
        .illustrations-container {
            align-items: center;
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            
            a {
                height: 100%;
                width: 30%;
                max-width: 700px;
            }
            
            .q-img {
                border: 2px solid transparent;
                border-radius: 6px;
                height: 100%;
                transition: all 200ms ease-in-out;
                width: 100%;
                
                &:hover {
                    border: 2px solid var(--color-aqua);
                    opacity: 0.85;
                    transition: all 100ms ease-in-out;
                    transform: scale(1.03);
                }
            }
        }
    }
</style>