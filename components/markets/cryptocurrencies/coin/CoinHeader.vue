<template>
    <CardHeader class='my-6 flex justify-center items-center'>
        <div class='header-content flex items-center'>
            <div class='mr-10'>
                <!-- Logo  -->
                <NuxtImg
                    v-if='coin.liveCoinWatch.webp64'
                    :src='coin.liveCoinWatch.webp64'
                    alt='symbol'
                    width='100'
                    height='100'
                />
            </div>
            
            <div>
                <!--  Name + Rank  -->
                <div class='flex items-center'>
                    <h2>{{ coin.liveCoinWatch.name }}</h2>
                    
                    <MazBadge
                        color='info'
                        size='1.25rem'
                        rounded-size='md'
                        class='ml-8 mt-2'
                    >
                        #{{ coin.liveCoinWatch.rank }}
                    </MazBadge>
                </div>
                
                <!-- Symbol  -->
                <p class='ml-1 mt-2'>{{ coin.symbol }} {{ coin.liveCoinWatch.symbol }}</p>
                
                <!--  Coin price  -->
                <h4 class='text-foreground mt-4'>{{ coin.liveCoinWatch.rateFormatted }}</h4>
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
            default: () => ({}),
        },
    });
    
    const { coin } = toRefs(props);
</script>

<style scoped>
    p {
        color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
    }
</style>