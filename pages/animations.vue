<template>
    <div class='overflow-hidden'>
        <!--  Slide 1  -->
        <div class='w-screen h-screen'>
            <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dgcyv1ehi&public_id=200636-913478601_small_invszg&profile=cld-default"
                width="640"
                height="360"
                style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowfullscreen
                frameborder="0"
            ></iframe>
        </div>
        
        <div
            class='h-screen w-[600%] overscroll-none flex overflow-hidden wrapper'
            ref='container'
        >
            <NuxtImg
                v-for='slide in slides'
                :key='slide.id'
                :src='slide.src'
                class='w-full h-full text-[60px] image'
                ref='image'
                alt='alt'
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
        
        <div class='w-screen h-screen bg-violet-200'>
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545829/bitcoin-7678812_b86ffi.jpg'
                class='w-full h-full'
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
    </div>
</template>

<script setup>
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { ScrollToPlugin } from "gsap/ScrollToPlugin";
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    const container = ref(null);
    let ctx;
    const slides = [
        { id: 'one', src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757762298/bitcoin-9193579_izajko.jpg' },
        { id: 'two', src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1755195826/cyberpunk-bitcoin-illustration-2_u6fytd.webp' },
        { id: 'three', src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545829/bitcoin-7678812_b86ffi.jpg' },
        { id: 'four', src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545824/bitcoin-8629504_nbvzjj.jpg' },
        { id: 'five', src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545827/crypto-7678815_h1ylkr.jpg' },
        { id: 'six', src: 'https://res.cloudinary.com/dgcyv1ehi/image/upload/v1753545828/bitcoin-7678816_zipi26.jpg' }
    ];
    
    onMounted(async() => {
        ctx = gsap.context((self) => {
            const images = self.selector('.image');
            const amount = images.length - 1;
            
            gsap.to(images, {
                xPercent: -100 * amount,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.value,
                    start: 'top top',
                    end: '+=3500',
                    scrub: 1,
                    markers: true,
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
</style>