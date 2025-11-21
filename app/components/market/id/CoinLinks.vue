<template>
    <Card class='coin-links bg-background flex flex-col 2xl:flex-row gap-16 p-10 lg:py-20 lg:px-12 w-full'>
        <CardContent class='flex flex-col gap-9'>
            <!-- Websites -->
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
            class='flex flex-col gap-9'
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

        <!--
        <div v-for='(link, name) in official_forum' :key='name'>
            <NuxtLink
                v-if='link'
                :to='link'
                external
                target='_blank'
                class='flex items-center link-item gap-2'
            >
                <NuxtIcon name='ph:chat-centered-text-light' size='22' />
                <p class='text-sm'>Official Forum</p>
            </NuxtLink>
        </div>
        -->
        
        <!--
        &lt;!&ndash; Chat &ndash;&gt;
        <CardContent v-if='chats.length' class='chat flex flex-col gap-8'>
            <h3>Chat</h3>
            
            <div v-for='chat in chats' :key='chat' class='flex flex-col gap-4'>
                <NuxtLink
                    v-if='chat'
                    :to='chat'
                    external
                    target='_blank'
                    class='flex items-center link-item gap-3'
                >
                    <NuxtIcon name='ph:chat-teardrop-light' size='22' />
                    <p class='text-sm'>{{ chat }}</p>
                </NuxtLink>
            </div>
        </CardContent>
        
        &lt;!&ndash; Github &ndash;&gt;
        <CardContent v-if='github.length' class='github flex flex-col gap-8'>
            <h3>Github</h3>
            
            <div v-for='link in github' :key='link' class='flex items-center link-item gap-3'>
                <NuxtLink
                    v-if='link'
                    :to='link'
                    external
                    target='_blank'
                    class='flex items-center link-item gap-3'
                >
                    <NuxtIcon name='ph:github-logo-light' size='22' />
                    <p class='text-sm'>{{ link }}</p>
                </NuxtLink>
            </div>
        </CardContent>
        -->
    </Card>
</template>

<script setup>
    import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '~/components/ui/card';
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