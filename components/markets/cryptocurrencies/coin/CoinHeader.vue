<template>
    <CardHeader v-if='coin' class='flex justify-center items-center'>
        <div class='flex flex-col lg:flex-row items-center'>
            <div class='m-10'>
                <!-- Logo  -->
                <NuxtImg
                    v-if='coingecko?.image?.large'
                    :src='coin.coingecko.image.large'
                    alt='symbol'
                    width='150'
                    height='150'
                />
            </div>
            
            <div>
                <!--  Name + Rank  -->
                <div class='flex items-center'>
                    <h2>{{ coingecko.name }}</h2>
                    
                    <MazBadge
                        color='info'
                        size='1.25rem'
                        rounded-size='md'
                        class='ml-8 mt-2'
                    >
                        #{{ coingecko.market_cap_rank }}
                    </MazBadge>
                </div>
                
                <!-- Symbol  -->
                <div class='ml-1 mt-2'>
                    <p class='inline mr-3'>{{ coin.symbol }}</p>
                    <p v-if='livecoinwatch.symbol' class='inline'>{{ livecoinwatch.symbol }}</p>
                </div>
                
                <!--  Coin price  -->
                <h4 class='text-foreground mt-4'>{{ coingecko.rateFormatted }}</h4>
            </div>
        </div>
    </CardHeader>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';
    
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        },
    });
    
    const { coin } = toRefs(props);
    const livecoinwatch = toRef(coin.value.livecoinwatch);
    const coingecko = toRef(coin.value.coingecko);
</script>

<style scoped>
    p {
        color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
    }
</style>