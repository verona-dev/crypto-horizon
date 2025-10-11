<template>
    <Card class='coin-links bg-background flex flex-col flex-wrap gap-10 p-10 w-full'>
        <!--  Links Title  -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='iconoir:link'
                size='20'
            />
            <h4>Links</h4>
        </div>
        
        <div class='flex flex-col gap-12'>
            <!-- Websites -->
            <div v-if='websites' class='websites flex flex-col gap-4'>
                <h5>Websites</h5>
                
                <NuxtLink
                    v-if='homepage'
                    :to='homepage'
                    external
                    target='_blank'
                    class='flex items-center link-item gap-3'
                >
                    <NuxtIcon name='radix-icons:home' size='20' />
                    <p class='text-sm'>Homepage</p>
                </NuxtLink>
                
                <NuxtLink
                    v-if='whitepaper'
                    :to='whitepaper'
                    external
                    target='_blank'
                    class='flex items-center link-item gap-2'
                >
                    <NuxtIcon name='iconoir:open-book' size='25' />
                    <p class='text-sm'>Whitepaper</p>
                </NuxtLink>
                
                <div v-for='(link, name) in official_forum' :key='name'>
                    <NuxtLink
                        v-if='link'
                        :to='link'
                        external
                        target='_blank'
                        class='flex items-center link-item gap-2'
                    >
                        <NuxtIcon name='radix-icons:chat-bubble' size='25' />
                        <p class='text-sm'>Official Forum</p>
                    </NuxtLink>
                </div>
            </div>
            
            <!-- Chat -->
            <div v-if='chats.length' class='chat flex flex-col gap-4'>
                <h5>Chat</h5>
                
                <div v-for='chat in chats' :key='chat'>
                    <NuxtLink
                        v-if='chat'
                        :to='chat'
                        external
                        target='_blank'
                        class='flex items-center link-item gap-3'
                    >
                        <NuxtIcon name='iconoir:chat-lines' size='20' />
                        <p class='text-sm'>{{ chat }}</p>
                    </NuxtLink>
                </div>
            </div>
            
            <!-- Community -->
            <div v-if='socials && Object.keys(socials).length' class='community flex flex-col gap-4'>
                <h5>Community</h5>
                
                <div
                    v-for='(link, name) in socials'
                    :key='name'
                >
                    <NuxtLink
                        v-if='link && name'
                        :to='link'
                        external
                        target='_blank'
                        class='flex items-center py-2 link-item gap-3'
                    >
                        <NuxtIcon :name='`fa-brands:${name}`' size='20' />
                        <p class='text-sm'>{{ name }}</p>
                    </NuxtLink>
                </div>
            </div>
            
            <!-- Github -->
            <div v-if='github.length' class='github flex flex-col gap-4'>
                <h5>Github</h5>
                
                <div v-for='link in github' :key='link'>
                    <NuxtLink
                        v-if='link'
                        :to='link'
                        external
                        target='_blank'
                        class='flex items-center link-item gap-3'
                    >
                        <NuxtIcon name='fa-brands:github' size='20' />
                        <p class='text-sm'>{{ link }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup>
    const props = defineProps({
        livecoinwatchLinks: {
            type: Object,
            required: true,
        },
        coingeckoLinks: {
            type: Object,
            required: true,
        }
    });
    
    const { livecoinwatchLinks, coingeckoLinks } = toRefs(props);
    const websites = computed(() => homepage.value || whitepaper.value || official_forum.value);
    const homepage = computed(() => coingeckoLinks.value?.homepage[0]);
    const whitepaper = computed(() => coingeckoLinks.value?.whitepaper);
    const official_forum = computed(() => coingeckoLinks.value?.official_forum_url);
    const chats = computed(() => coingeckoLinks.value?.chat_url);
    const github = computed(() => coingeckoLinks.value?.repos_url?.github);
    const socials = computed(() => livecoinwatchLinks.value?.socials);
</script>

<style scoped>
    .coin-links {
        .link-item {
            color: var(--ring);
            
            &:hover {
                color: var(--foreground);
                text-decoration: underline;
            }
        }
    }
</style>