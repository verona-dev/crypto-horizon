<template>
    <NuxtLink
        :to='to'
        class='link-item w-[450px] flex flex-col items-center justify-center rounded-lg z-10 cursor-pointer'
        @mouseenter='isHovered = true'
        @mouseleave='isHovered = false'
    >
        <div class='relative rounded-lg border border-muted flex items-center justify-center'>
            <NuxtImg
                :src='src'
                :alt='alt'
                :custom='true'
                v-slot='{ src, isLoaded, imgAttrs }'
                preload
            >
                <img
                    v-if='isLoaded'
                    v-bind='imgAttrs'
                    :src='src'
                    :alt='alt'
                    class='!rounded-lg'
                >
                
                <Skeleton
                    v-else
                    class='h-[275px] w-[385px] !rounded-lg'
                />
            </NuxtImg>
            
            <BorderBeam
                v-show='isHovered'
                :size='200'
                :duration='15'
                :border-width='3'
                :anchor='anchor'
                colorFrom='#1cd1a1'
                colorTo='#f7931a'
                class=''
            />
        </div>
        
        
        <h2 class='my-10'>{{ title }}</h2>
    </NuxtLink>
</template>

<script setup>
    import { Skeleton } from '~/components/ui/skeleton';
    
    const props = defineProps({
        item: {
            type: Object,
            required: true,
        }
    });
    
    const { item } = toRefs(props);
    const title = toRef(item.value?.title);
    const src = toRef(item.value?.src);
    const alt = toRef(item.value?.alt);
    const to = toRef(item.value?.to);
    const anchor = toRef(item.value?.anchor);
    
    const isHovered = ref(false);
</script>

<style scoped>
    .link-item {
        img {
            border-radius: 6px;
            height: 250px;
            object-fit: cover;
            transition: all 150ms ease-out;
            width: 375px;
        }
        
        &:hover {
            transition: all 200ms ease;
            color: var(--foreground);
            
            img {
                border-radius: 8px !important;
                padding: 16px;
            }
        }
        
        h2 {
            letter-spacing: 0.5rem;
        }
        
        &:hover h2 {
            color: var(--primary);
            //text-decoration: underline;
            //text-underline-offset: 8px;
        }
    }
</style>