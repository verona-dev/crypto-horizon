<template>
    <div>
        <main class='flex flex-col my-0 min-h-screen items-center justify-center'>
            <ClientOnly>
                <slot />
            
            </ClientOnly>
        </main>
        <CoingeckoAttribution />
    </div>
</template>

<script>
    import CoingeckoAttribution from '~/components/CoingeckoAttribution.vue';
</script>