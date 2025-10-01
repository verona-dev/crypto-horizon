<template>
    <main class='flex flex-col my-0 min-h-screen items-center justify-center'>
        <slot />
        
        <CoingeckoAttribution />
    </main>
</template>

<script>
    import CoingeckoAttribution from '~/components/CoingeckoAttribution.vue';
</script>