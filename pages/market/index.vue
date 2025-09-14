<template>
    <div class='overflow-hidden w-screen'>
        <!--  Hero Slide  -->
        <div class='w-screen h-screen'>
            <NuxtImg
                src='https://c02.purpledshub.com/uploads/sites/41/2019/09/GettyImages-471296532-c-db7bc08.jpg?w=1880&webp=1'
                class='w-full h-full rotate-180'
                alt='alt'
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
            class='global-market h-screen w-[200%] overscroll-none flex justify-center items-center overflow-hidden wrapper'
            ref='container'
        >
            <GlobalMarket />
        </div>
        
        <!--  Ending Slide  -->
        <div class='w-screen h-screen flex justify-center items-center'>
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
    .global-market {
        background-image: url('https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757866373/jeremy-thomas-E0AHdsENmDg-unsplash_ylo2pv.jpg');
        background-size: 50% 100%;
        background-repeat: no-repeat;
    }
</style>