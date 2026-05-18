<template>
    <div class='relative hidden lg:flex w-full h-full flex-col items-center justify-center overflow-hidden'>
        <div class='flex w-full items-center justify-center mr-6'>
            <TextGlitch
                :speed='3.5'
                :enable-shadows='true'
                text='Crypto Horizon'
                :enableOnHover='true'
                class='font-great !z-10'
            />
        </div>
        
        <div class='grid place-content-center'>
            <IconCloud
                :images='imageUrls'
                class='cursor-grab !z-10'
            />
        </div>
        
        <SnowfallBg
            v-if='dark_mode'
            color="#e4d9e2"
            class='absolute inset-0 !min-h-lvh !min-w-full !z-0'
            :min-radius='0.1'
            :max-radius='2'
            :speed='0.2'
            :quantity='50'
        />
    </div>
</template>

<script setup>
    import { IconCloud } from '~/components/ui/icon-cloud';
    import { SnowfallBg } from '~/components/ui/snowfall-bg';
    import TextGlitch from '@/components/ui/text-glitch/TextGlitch.vue';
    
    const colorMode = useColorMode();
    const dark_mode = computed(() => colorMode.value === 'dark');
    
    const chains = [
        "bitcoin",
        "ethereum",
        "cardano",
        "polkadot",
        "polygon",
        "solana",
        "tron",
        "base",
        "bnbchain",
        "arbitrum",
        "avalanche",
        "optimism",
        "stellar",
        "near",
        "kava",
        "hedera",
        "xrp",
        "internetcomputer",
        "litecoin",
        "dogecoin",
    ];
    
    const imageUrls = chains.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
</script>