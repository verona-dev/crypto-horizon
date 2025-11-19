<template>
    <Card class='coin-links bg-background flex flex-col lg:flex-row gap-16 lg:justify-around p-10 lg:py-20 lg:px-12 w-full'>
        <CardContent v-if='links' class='websites flex flex-col gap-8'>
            <h3>Links</h3>
            
            <!-- Websites -->
            <div class='flex flex-col gap-4'>
                <CoinLinkCard
                    v-for='link in links.main'
                    :key='link'
                    :link='link'
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
        
        &lt;!&ndash; Community &ndash;&gt;
        <CardContent v-if='socials && Object.keys(socials).length' class='community flex flex-col gap-8'>
            <h3>Community</h3>
            
            <div class='flex flex-col gap-4'>
                <div
                    v-for='(link, name) in socials'
                    :key='name'
                >
                    <NuxtLink
                        v-if='link && name'
                        :to='link'
                        external
                        target='_blank'
                        class='flex items-center link-item gap-3'
                    >
                        <NuxtIcon :name='`ph:${name}-logo-light`' size='22' />
                        <p class='text-sm'>{{ name }}</p>
                    </NuxtLink>
                </div>
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
        }
    });
    
    const { links } = toRefs(props);
    // const websites = computed(() => homepage.value || whitepaper.value || official_forum.value);
    // const homepage = computed(() => coingeckoLinks.value?.homepage[0]);
    // const whitepaper = computed(() => coingeckoLinks.value?.whitepaper);
    // const official_forum = computed(() => coingeckoLinks.value?.official_forum_url);
    // const chats = computed(() => coingeckoLinks.value?.chat_url);
    // const github = computed(() => coingeckoLinks.value?.repos_url?.github);
    // const socials = computed(() => livecoinwatchLinks.value?.socials);
    
    console.log(links.value);
</script>