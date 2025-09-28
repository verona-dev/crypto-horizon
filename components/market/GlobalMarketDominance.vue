<template>
    <Card>
        <h3 class='text-center'>Dominance</h3>
        <Separator />
        
        <CardContent>
            <NuxtLink
                to='/market/bitcoin'
                class='flex items-center'
            >
                <NuxtIcon
                    name='token-branded:btc'
                    size='70'
                    class='mr-4 mb-1'
                />
                
                <div class='flex flex-col items-start'>
                    <CardDescription class='text-left'>
                        BTC Dominance Index
                    </CardDescription>
                    
                    <p v-if='!!btc_dominance_label'>{{ btc_dominance_label }}&#37;</p>
                    <span v-else>&#8208;</span>
                </div>
            </NuxtLink>
        </CardContent>
        
        <CardContent>
            <NuxtLink
                to='/market/ethereum'
                class='flex items-center'
            >
                <NuxtIcon
                    name='token-branded:eth'
                    size='70'
                    class='mr-4'
                />
                
                <div class='flex flex-col items-start'>
                    <CardDescription class='text-left'>
                        ETH Dominance Index
                    </CardDescription>
                    
                    <p v-if='!!eth_dominance_label'>{{ eth_dominance_label }}&#37;</p>
                    <span v-else>&#8208;</span>
                </div>
            </NuxtLink>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Separator } from '~/components/ui/separator/index.js';
    import { Card, CardContent, CardDescription } from '~/components/ui/card/index.js';
    import { formatNumber } from '~/utils/formatUtils.js';
    
    const props = defineProps({
        mcap_dominance: {
            type: Object,
        }
    });
    const { mcap_dominance } = toRefs(props);
    
    const btc_dominance_label = computed(() => formatNumber(mcap_dominance.value?.btc, {
        style: 'percent', compact: true, decimals: 2
    }));
    const eth_dominance_label = computed(() => formatNumber(mcap_dominance.value?.eth, {
        style: 'percent', compact: true, decimals: 2
    }));
</script>