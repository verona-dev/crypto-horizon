<template>
    <div class='overflow-hidden w-screen'>
        <!--  Hero Slide  -->
        <div class='hero-container w-screen h-screen'>
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
        
        <!--  Horizontal Sliders  -->
        <div
            class='global-market-container h-screen w-[350%] overscroll-none flex justify-center items-center overflow-hidden wrapper'
            ref='container'
        >
            <!--  Astronaut  -->
            <div class='slide h-full w-full'>
                <NuxtImg
                    src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757869820/cat-7710382_zqbc1t.jpg'
                    class='w-full h-[125%]'
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
            
            <div class='slide w-1/2 flex items-center'>
                <h1 class='tracking-[0.4rem] text-[140px] shadow-sm'>Global Statistics</h1>
<!--                <h1 class='truncate tracking-[0.4rem] text-[120px] shadow-2xl whitespace-nowrap'>Global Statistics</h1>-->
            </div>
            
            <GlobalMarket />
        </div>
        
        <!--  Ending Slide  -->
        <div class='w-screen flex justify-center items-center'>
            <CoinsTable />
        </div>
    </div>
</template>

<script setup>
    import GlobalMarket from '~/components/market/GlobalMarket.vue';
    import CoinsTable from '~/components/market/CoinsTable.vue';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { ScrollToPlugin } from "gsap/ScrollToPlugin";
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    const container = ref(null);
    let ctx;
    
    onMounted(async() => {
        ctx = gsap.context((self) => {
            const slides = self.selector('.slide');
            const amount = slides.length - 1;
            
            gsap.to(slides, {
                xPercent: -100 * amount,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.value,
                    start: 'top top',
                    end: '+=3500',
                    scrub: 1,
                    pin: true,
                    snap: 1 / amount
                }
            });
        }, container.value);
    });
    
    onUnmounted(() => {
        ctx.revert();
    });
    
    definePageMeta({
        layout: 'scroll-animation',
    });
</script>

<style scoped>
    .global-market-container {
        background-image: url('https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757866335/aperture-vintage-Z6EpCdMcoUU-unsplash_dpdgla.jpg');
        background-size: 30% 100%;
        background-repeat: no-repeat;
    }

</style>