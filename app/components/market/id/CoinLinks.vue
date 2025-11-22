<template>
    <Card class='coin-links bg-background flex flex-col 2xl:flex-row gap-16 p-10 lg:py-20 lg:px-12 w-full'>
        <CardContent
            v-if='links.main'
            class='card-content'
        >
            <!-- Project -->
            <h3>Project</h3>
            
            <div class='cards-container'>
                <CoinLinkCard
                    v-for='link in links.main'
                    :link='link'
                    class='coin-link-card'
                />
            </div>
        </CardContent>
        
        <CardContent
            v-if='links.socials'
            class='card-content'
        >
            <!-- Socials -->
            <h3>Socials</h3>
            
            <div class='cards-container'>
                <CoinLinkCard
                    v-for='link in links.socials'
                    :key='link'
                    :link='link'
                    category='socials'
                    class='coin-link-card'
                />
            </div>
        </CardContent>
        
        <CardContent
            v-if='links.github'
            class='card-content'
        >
            <!-- Github -->
            <h3>Github</h3>
            
            <div class='cards-container'>
                <CoinLinkCard
                    v-for='link in links.github'
                    :key='link'
                    :link='link'
                    category='github'
                    class='coin-link-card'
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