<template>
    <div class='relative hidden lg:flex w-full h-full flex-col items-center justify-center overflow-hidden'>
        <div class='flex w-full items-center justify-center mr-6'>
            <TextGlitch
                :speed='3.5'
                :enable-shadows='true'
                text='Crypto Horizon'
                :enableOnHover='true'
                class='font-great animate-pulse !z-10'
            />
        </div>
        
        <div class='grid place-content-center'>
            <IconCloud
                :images='imageUrls'
                class='cursor-grab !z-10'
            />
        </div>
    </div>
</template>

<script setup>
    import { IconCloud } from '~/components/ui/icon-cloud';
    import TextGlitch from '@/components/ui/text-glitch/TextGlitch.vue';
    
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