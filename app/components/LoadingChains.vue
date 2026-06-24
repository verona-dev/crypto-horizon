<template>
    <div class='grid place-content-center'>
        <IconCloud
            :images='logos'
            class='cursor-grab !z-10'
        />
    </div>
</template>

<script setup>
    import { IconCloud } from '~/components/ui/icon-cloud';
    
    const chains = [
        'btc',
        'eth',
        'ada',
        'dot',
        'matic',
        'sol',
        'bnb',
        'op',
        'xlm',
        'near',
        'hbar',
        'xrp',
        'icp',
        'ltc',
        'trx',
        'link',
        'avax',
        'gno',
    ];
    
    const logos = chains.map(symbol => `https://cdn.jsdelivr.net/gh/prasangapokharel/crypto-icons@v1.0.0/crypto/${symbol}.svg`);
    
    /*
    const chains = [
        'bitcoin',
        'ethereum',
        'cardano',
        'polkadot',
        'polygon',
        'solana',
        'bnbchain',
        'optimism',
        'stellar',
        'near',
        'hedera',
        'xrp',
        'internetcomputer',
        'litecoin',
        'dogecoin',
        'sui',
        'ton',
        'chainlink',
    ];
    const imageUrls = chains.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
    */
</script>