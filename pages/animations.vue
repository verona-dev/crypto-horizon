<template>
    <div class='overflow-hidden'>
        <div class='w-full h-screen'>
            <NuxtImg
                src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1757751346/nasa-Q1p7bh3SHj8-unsplash_ls6py3.jpg'
                alt='alt'
                :custom='true'
                v-slot='{ src, isLoaded, imgAttrs }'
                preload
            >
                <img
                    v-if='isLoaded'
                    v-bind='imgAttrs'
                    class='w-fit h-full image rotate-180'
                    :src='src'
                    alt='alt'
                >
                
                <Skeleton
                    v-else
                    class='w-full h-full image'
                />
            </NuxtImg>
        </div>
        
        <div
            class='h-screen w-[600%] overscroll-none flex overflow-hidden wrapper'
            ref='container'
        >
            <div
                v-for='slide in slides'
                :key='slide.id'
                class='w-full h-full text-[60px] image'
                :class='`bg-${slide.color}-200`'
                ref='image'
            >
                {{ slide.id }}
            </div>
        </div>
        
        <div class='w-screen hh-screen-screen bg-violet-200'>FINISH</div>
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
        { id: "one", color: "teal" },
        { id: "two", color: "orange" },
        { id: "three", color: "emerald" },
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