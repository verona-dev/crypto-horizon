<template>
    <div class='coin-links'>
        <!--  Websites  -->
        <div class='coin-link-container'>
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
                        name='radix-icons:link-2'
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
                        name='radix-icons:reader'
                        size='25'
                        class='w-[50px]'
                    />
                    <p>Whitepaper</p>
                </div>
            </NuxtLink>
            
            <!--  Forum  -->
            <NuxtLink
                v-if='coingeckoLinks.official_forum_url'
                :to='coingeckoLinks.official_forum_url'
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
        
        <!--  Community  -->
        <div v-if='livecoinwatchLinks?.socials' class='coin-link-container'>
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
        
        <!--  Explorers  -->
        <div v-if='coingeckoLinks?.blockchain_site' class='coin-link-container'>
            <h4>Explorers</h4>
            
            <div
                v-for='link in coingeckoLinks.blockchain_site'
                :key='link'
                class='my-4'
            >
                <NuxtLink
                    :to='link'
                    external
                    target='_blank'
                    class='inline-flex items-center'
                >
                    <MazBadge
                        rounded-size='lg'
                        color='gray'
                        size='0.7rem'
                        outline
                        class='link-item badge-item'
                    >
                        <div class='py-1.5 pr-4 flex items-center'>
                            <NuxtIcon
                                name='radix-icons:globe'
                                size='20'
                                class='w-[50px]'
                            />
                            {{ link }}
                        </div>
                    </MazBadge>
                </NuxtLink>
            </div>
        </div>
        
        <!--  Github  -->
        <div v-if='coingeckoLinks.repos_url?.github' class='coin-link-container'>
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
                            name='radix-icons:github-logo'
                            size='25'
                            class='w-[50px]'
                        />
                        
                        <p>{{ link }}</p>
                    </div>
                
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';
    
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

<style scoped>
    .coin-links {
        .coin-link-container {
            margin-bottom: 100px;
        }
        
        .link-item {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
            
            &:hover {
                color: var(--secondary);
                text-decoration: underline;
            }
        }
        
        .badge-item:hover {
            border: 1px solid var(--secondary);
        }
        
        h4 {
            margin-bottom: 24px;
        }
    }
</style>