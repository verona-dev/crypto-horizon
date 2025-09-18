<template>
    <div class='overflow-hidden w-screen'>
        <!--  Hero Slide  -->
        <div class='hero-container w-screen h-screen relative'>
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
            class='global-market-container h-screen w-[450%] overscroll-none flex justify-center items-center overflow-hidden wrapper relative'
            ref='container'
        >
            <!--  Astronaut  -->
            <div class='astronaut-container slide h-full w-full'>
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
        <div class='flex justify-center'>
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
        z-index: 0;
    }
    
    .hero-container::after,
    .global-market-container::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #0e0e0e 100%);
        z-index: 1;
    }
    
    .astronaut-container::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 100px;
        background: linear-gradient(
            to top,
            rgba(14, 14, 14, 0) 0%,
            rgba(14, 14, 14, 0.05) 20%,
            rgba(14, 14, 14, 0.1) 40%,
            rgba(14, 14, 14, 0.15) 60%,
            rgba(14, 14, 14, 0.25) 80%,
            #0e0e0e 100%
        );
    }
</style>