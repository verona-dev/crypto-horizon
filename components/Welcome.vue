<template>
    <div class='welcome'>
        <h1>Welcome to crypto-app</h1>
        
        <div class='logo-container'>
            <q-img
                :src='market'
                alt='logo'
            />
            <q-img
                :src='defi'
                alt='logo'
            />
        </div>
        
<!--        <q-img
            src='https://aibc.world/wp-content/uploads/2024/04/btc.webp'
            alt='logo'
            format='webp'
            width='75%'
        />-->
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
        
        .logo-container {
            align-items: center;
            //height: 50%;
            display: flex;
            justify-content: space-evenly;
            //margin-bottom: 100px;
            width: 100%;
            
            .q-img {
                border-radius: 8px;
                height: 100%;
                width: 40%;
            }
        }
    }
</style>