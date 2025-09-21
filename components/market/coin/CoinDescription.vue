<template>
    <div v-if='coingecko' class='flex flex-col gap-6'>
        <h5>About</h5>
        
        <div v-if='description' class='description-container flex flex-col gap-4'>
            
            <h6 class='flex items-center gap-1'>
                What is {{ coingecko.name }}
                <span>&#40;{{ coin.symbol }}&#41;</span>
            </h6>
            
            <div>{{ description }}</div>
        </div>
        
        <Separator class='my-10' />
        
        <!--  Categories  -->
        <div v-if='coingecko.categories' class='flex flex-col gap-6'>
            <h5>Categories</h5>
            
            <div class='categories-container'>
                <MazBadge
                    v-for='category in coingecko.categories'
                    :key='category'
                    color='gray'
                    class='m-2'
                    outline
                >
                    {{ category }}
                </MazBadge>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        coin: {
            type: Object,
            required: true,
        }
    });
    
    const { coin } = toRefs(props);
    const coingecko = toRef(coin.value?.coingecko);
    const description = coingecko.value?.description?.en;
</script>
