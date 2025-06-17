<template>
    <CardHeader>
        <div class='flex items-center'>
            <!-- Logo  -->
            <div class='logo w-[300px] flex justify-center items-center'>
                <NuxtImg
                    v-if='coin.webp64'
                    :src='coin.webp64'
                    alt='symbol'
                    width='100'
                    height='100'
                />
            </div>
            
            <div class='header-content flex flex-col flex-1 p-6'>
                <!--  Name + Rank  -->
                <div class='flex items-center'>
                    <h2>{{ coin.name }}</h2>
                    
                    <MazBadge
                        color='info'
                        size='1rem'
                        rounded-size='md'
                        class='ml-4 mt-4'
                    >
                        #{{ coin.rank }}
                    </MazBadge>
                </div>
                
                <!-- Symbol  -->
                <p class='ml-1 mt-2'>{{ activeSymbol }}</p>
                
                <!--  Coin price  -->
                <h4 class='text-foreground mt-8'>{{ coin.rate }}</h4>
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
        activeSymbol: {
            type: String,
            default: '',
        }
    });
    
    const { coin, activeSymbol } = toRefs(props);
</script>

<style scoped>
    .header-content {
        p {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        }
    }
</style>