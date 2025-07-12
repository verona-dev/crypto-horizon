<template>
    <section class='coin-links lg:flex-row gap-y-20 lg:gap-0 lg:items-baseline'>
        <div class='coin-link-container flex flex-col justify-center items-center lg:justify-start lg:items-start'>
            <!--  Websites  -->
            <div class='websites'>
                <h4>Websites</h4>
                
                <!--  Homepage  -->
                <NuxtLink
                    v-if='livecoinwatchLinks.website'
                    :to='livecoinwatchLinks.website'
                    external
                    target='_blank'
                    class='flex'
                >
                    <div class='link-item flex items-center'>
                        <NuxtIcon
                            name='radix-icons:home'
                            size='25'
                            class='w-[50px]'
                        />
                        <p>Homepage</p>
                    </div>
                </NuxtLink>
                
                <!--  Whitepaper  -->
                <NuxtLink
                    v-if='livecoinwatchLinks.whitepaper'
                    :to='livecoinwatchLinks.whitepaper'
                    external
                    target='_blank'
                    class='flex mt-4'
                >
                    <div class='link-item flex items-center'>
                        <NuxtIcon
                            name='iconoir:open-book'
                            size='25'
                            class='w-[50px]'
                        />
                        <p>Whitepaper</p>
                    </div>
                </NuxtLink>
                
                <!--  Forum  -->
                <div
                    v-for='(link, name) in coingeckoLinks.official_forum_url'
                    :key='name'
                    class='flex items-center justify-start'
                >
                    <NuxtLink
                        v-if='link'
                        :to='link'
                        external
                        target='_blank'
                        class='flex mt-4'
                    >
                        <div class='link-item flex items-center'>
                            <NuxtIcon
                                name='radix-icons:chat-bubble'
                                size='25'
                                class='w-[50px]'
                            />
                            <p>Official Forum</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            
            <!--  Chat  -->
            <div v-if='coingeckoLinks.chat_url.length' class='chat my-20'>
                <h4>Chat</h4>
                
                <div
                    v-for='chat in coingeckoLinks.chat_url'
                    :key='chat'
                    class='flex items-center justify-start'
                >
                    <NuxtLink
                        v-if='chat'
                        :to='chat'
                        external
                        target='_blank'
                        class='flex mt-4'
                    >
                        <div class='link-item flex items-center'>
                            <NuxtIcon
                                name='iconoir:chat-lines'
                                size='25'
                                class='w-[50px]'
                            />
                            <p>{{ chat }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        
        <!--  Community  -->
        <div v-if='livecoinwatchLinks?.socials && Object.keys(livecoinwatchLinks.socials).length' class='coin-link-container flex flex-col justify-center items-center lg:justify-start lg:items-start'>
            <h4>Community</h4>
            
            <div
                v-for='(link, name) in livecoinwatchLinks?.socials'
                :key='name'
                class='flex items-center justify-start'
            >
                <NuxtLink
                    v-if='link && name'
                    :to='link'
                    external
                    target='_blank'
                    class=''
                >
                    <div class='link-item flex items-center py-3'>
                        <NuxtIcon
                            v-if='name'
                            :key='name'
                            :name="`fa-brands:${name}`"
                            size='25'
                            class='w-[50px]'
                        />
                        
                        <p>{{ name }}</p>
                    </div>
                
                </NuxtLink>
            </div>
        </div>
        
        <!--  Github  -->
        <div v-if='coingeckoLinks.repos_url?.github.length' class='coin-link-container flex flex-col justify-center items-center lg:justify-start lg:items-start'>
            <h4>Github</h4>
            
            <div
                v-for='link in coingeckoLinks.repos_url.github'
                :key='link'
                class='flex items-center justify-start'
            >
                <NuxtLink
                    v-if='link'
                    :to='link'
                    external
                    target='_blank'
                    class=''
                >
                    <div class='link-item flex items-center py-3'>
                        <NuxtIcon
                            name='iconoir:github'
                            size='25'
                            class='w-[50px]'
                        />
                        
                        <p class='text-sm'>{{ link }}</p>
                    </div>
                
                </NuxtLink>
            </div>
        </div>
    </section>
    
    <Separator class='my-4' />

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
</script>

<style>
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