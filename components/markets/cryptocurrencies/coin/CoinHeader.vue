<template>
    <CardHeader>
        <div class='flex items-center'>
            <!-- Logo  -->
            <div class='logo w-[350px] flex justify-center items-center'>
                <NuxtImg
                    :src='coin.webp64'
                    alt='symbol'
                    width='100'
                    height='100'
                />
            </div>
            
            <div class='header-content flex-1 p-6'>
                <!--  Name + Rank  -->
                <div class='flex'>
                    <h1>{{ coin.name }}</h1>
                    
                    <MazBadge
                        color='gray'
                        size='1rem'
                        rounded-size='md'
                    >
                        #{{ coin.rank }}
                    </MazBadge>
                </div>
                
                <!-- Symbol  -->
                <p class='ml-2 mt-4'>{{ activeSymbol }}</p>
                
                <!--  Coin price  -->
                <h2 class='text-foreground'>{{ coin.rate }}</h2>
            </div>
        </div>
    </CardHeader>
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
        border: 1px dashed pink;
        
        p {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        }
    }
</style>