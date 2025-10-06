<template>
    <div v-if='nft'>
        {{ nft.name }}
    </div>
</template>

<script setup>
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const props = defineProps({
       nft: {
           type: Object,
       }
    });
    
    const { nft } = toRefs(props);
    
    const slug = nft.value?.id;
    const name = nft.value?.name;
    const symbol = nft.value?.symbol;
    const image = nft.value?.thumb;
    const price = nft.value?.floor_price_in_native_currency;
    const price_label = formatNumber(price);
    const currency = nft.value?.native_currency;
    
    const flooe_price = nft.value?.data?.floor_price;
    const price_change_percentage_1d = nft.value?.data?.floor_price_in_usd_24h_percentage_change;
    const price_change_percentage_1d_label = formatNumber(price_change_percentage_1d, {
        style: 'percent', compact: true, decimals: 2,
    });
    const volume_24h = nft.value?.data?.h24_volume;
    const average_sale_price_24h = nft.value?.data?.h24_average_sale_price;
    const sparkline = nft.value?.data?.sparkline;
    const title = nft.value?.data?.content?.title;
    const description = nft.value?.data?.content?.description;
</script>