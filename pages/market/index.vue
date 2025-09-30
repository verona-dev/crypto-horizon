<template>
    <div class='market'>
        <!--  Hero Image  -->
        <!--
        <div class='hero-container w-screen'>
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757866406/GettyImages-471296532-c-db7bc08_edtsqo.webp'
                class='w-full h-full rotate-180'
                :custom='true'
                v-slot='{ src, isLoaded, imgAttrs }'
                preload
            >
                <img
                    v-if='isLoaded'
                    v-bind='imgAttrs'
                    :src='src'
                    alt='alt'
                >
                
                <Skeleton
                    v-else
                    class='w-full h-full'
                />
            </NuxtImg>
        </div>
        -->
        
        <!--  Ending Slide  -->
        <div class='flex flex-col items-center justify-center'>
            <GlobalMarket />
            <CoinsTable />
        </div>
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
</script>