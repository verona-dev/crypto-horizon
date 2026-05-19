<template>
    <div class='grid place-content-center'>
        <IconCloud
            :images='imageUrls'
            class='cursor-grab !z-10'
        />
    </div>
</template>

<script setup>
    import { IconCloud } from '~/components/ui/icon-cloud';
    
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