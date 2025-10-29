<template>
    <div class="absolute inset-0 overflow-hidden z-1">
    <span
        v-for="index in count"
        :key="'meteor-' + index"
        :class="meteorClasses"
        :style="{
        top: Math.random() * 100 + 'vh',
        left: Math.random() * 100 + 'vw',
        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
      }"
    ></span>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    
    const props = defineProps({
        count: {
            type: Number,
            default: 20,
        },
        class: String,
    });
    
    const meteorClasses = computed(() => [
        "absolute",
        "top-0",
        "h-0.5",
        "w-0.5",
        "rotate-[45deg]",
        "rounded-[9999px]",
        "bg-slate-500",
        "shadow-[0_0_0_1px_#ffffff10]",
        "before:absolute",
        "before:top-1/2",
        "before:h-[1px]",
        "before:w-[50px]",
        "before:-translate-y-[50%]",
        "before:transform",
        "before:bg-gradient-to-r",
        "before:from-[#64748b]",
        "before:to-transparent",
        "before:content-['']",
        "animate-meteor-effect",
        props.class,
    ]);
</script>

<style scoped>
    @keyframes meteor {
        0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
        }
        70% {
            opacity: 1;
        }
        100% {
            transform: rotate(215deg) translateX(-100vw);
            opacity: 0;
        }
    }
    
    .animate-meteor-effect {
        animation: meteor linear infinite;
    }
</style>
