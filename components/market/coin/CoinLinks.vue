<template>
    <section class='coin-links flex flex-wrap items-start gap-10'>
        <!-- Websites -->
        <div class='websites'>
            <h5 class='mb-4'>Websites</h5>
            
            <NuxtLink
                v-if='homepage'
                :to='homepage'
                external
                target='_blank'
                class='flex items-center mb-3 link-item'
            >
                <NuxtIcon name='radix-icons:home' size='25' class='w-[50px]' />
                <p>Homepage</p>
            </NuxtLink>
            
            <NuxtLink
                v-if='whitepaper'
                :to='whitepaper'
                external
                target='_blank'
                class='flex items-center mb-3 link-item'
            >
                <NuxtIcon name='iconoir:open-book' size='25' class='w-[50px]' />
                <p>Whitepaper</p>
            </NuxtLink>
            
            <div v-for='(link, name) in official_forum' :key='name'>
                <NuxtLink
                    v-if='link'
                    :to='link'
                    external
                    target='_blank'
                    class='flex items-center mb-3 link-item'
                >
                    <NuxtIcon name='radix-icons:chat-bubble' size='25' class='w-[50px]' />
                    <p>Official Forum</p>
                </NuxtLink>
            </div>
        </div>
        
        <!-- Chat -->
        <div v-if='chats.length' class='chat'>
            <h5 class='mb-4'>Chat</h5>
            
            <div v-for='chat in chats' :key='chat'>
                <NuxtLink
                    v-if='chat'
                    :to='chat'
                    external
                    target='_blank'
                    class='flex items-center mb-3 link-item'
                >
                    <NuxtIcon name='iconoir:chat-lines' size='25' class='w-[50px]' />
                    <p class='text-sm'>{{ chat }}</p>
                </NuxtLink>
            </div>
        </div>
        
        <!-- Community -->
        <div v-if='socials && Object.keys(socials).length' class='community'>
            <h5 class='mb-4'>Community</h5>
            
            <div
                v-for='(link, name) in socials'
                :key='name'
            >
                <NuxtLink
                    v-if='link && name'
                    :to='link'
                    external
                    target='_blank'
                    class='flex items-center py-2 link-item'
                >
                    <NuxtIcon :name='`fa-brands:${name}`' size='25' class='w-[50px]' />
                    <p>{{ name }}</p>
                </NuxtLink>
            </div>
        </div>
        
        <!-- Github -->
        <div v-if='github.length' class='github'>
            <h5 class='mb-4'>Github</h5>
            
            <div v-for='link in github' :key='link'>
                <NuxtLink
                    v-if='link'
                    :to='link'
                    external
                    target='_blank'
                    class='flex items-center py-2 link-item'
                >
                    <NuxtIcon name='fa-brands:github' size='25' class='w-[50px]' />
                    <p class='text-sm'>{{ link }}</p>
                </NuxtLink>
            </div>
        </div>
    </section>
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
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
            
            &:hover {
                color: var(--secondary);
                text-decoration: underline;
            }
        }
    }
</style>