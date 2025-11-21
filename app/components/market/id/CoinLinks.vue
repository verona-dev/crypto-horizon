<template>
    <Card class='coin-links bg-background flex flex-col 2xl:flex-row gap-16 p-10 lg:py-20 lg:px-12 w-full'>
        <CardContent class='flex flex-col gap-12'>
            <!-- Project -->
            <h3>Project</h3>
            
            <div class='flex flex-wrap 2xl:flex-col gap-9 2xl:gap-3'>
                <CoinLinkCard
                    v-for='link in links.main'
                    :link='link'
                />
            </div>
        </CardContent>
        
        <CardContent
            v-if='links.socials'
            class='flex flex-col gap-12'
        >
            <!-- Socials -->
            <h3>Socials</h3>
            
            <div class='flex flex-wrap 2xl:flex-col gap-9 2xl:gap-3'>
                <CoinLinkCard
                    v-for='link in links.socials'
                    :key='link'
                    :link='link'
                    category='socials'
                />
            </div>
        </CardContent>
        
        <CardContent
            v-if='links.github'
            class='flex flex-col gap-12'
        >
            <!-- Github -->
            <h3>Github</h3>
            
            <div class='flex flex-wrap 2xl:flex-col gap-9 2xl:gap-3'>
                <CoinLinkCard
                    v-for='link in links.github'
                    :key='link'
                    :link='link'
                    category='github'
                />
            </div>
        </CardContent>
    </Card>
</template>

<script setup>
    import { Card, CardContent } from '~/components/ui/card';
    import CoinLinkCard from '@/components/market/id/CoinLinkCard.vue';
    
    const props = defineProps({
        links: {
            type: Object,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        }
    });
    
    const { links } = toRefs(props);
</script>