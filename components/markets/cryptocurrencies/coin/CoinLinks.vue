<template>
    <div class='coin-links flex flex-col'>
        <!--  Websites  -->
        <div class='coin-link-container mb-28 flex flex-col justify-center items-center lg:justify-start lg:items-start'>
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
        
        <!--  Community  -->
        <div v-if='livecoinwatchLinks?.socials' class='coin-link-container mb-28 flex flex-col justify-center items-center lg:justify-start lg:items-start'>
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
        <div
            v-if='coingeckoLinks?.blockchain_site'
            class='explorers coin-link-container mb-28 flex flex-col justify-center items-center lg:justify-start lg:items-start'
        >
            <h4>Explorers</h4>
            
            <div class='flex items-center'>
                <!--  Main Explorer  -->
                <NuxtLink
                    :to='explorers[0].href'
                    external
                    target='_blank'
                    class='inline-flex items-center'
                >
                    <MazBadge class='main-explorer-badge'>
                        <div class='py-1.5 pr-4 flex items-center'>
                            <NuxtIcon
                                name='radix-icons:globe'
                                size='20'
                                class='w-[50px]'
                            />
                            {{ explorers[0].name }}
                        </div>
                    </MazBadge>
                </NuxtLink>
                
                <Separator orientation='vertical' class='separator' />
                
                <!--  All Explorers - Dropdown menu  -->
                <MazDropdown trigger='click'>
                    <template #dropdown>
                        <div
                            v-for='explorer in explorers'
                            :key='explorer'
                            class='min-w-44'
                        >
                            <NuxtLink
                                :to='explorer.href'
                                external
                                target='_blank'
                            >
                                <MazBtn
                                    color='transparent'
                                    style='--justify:start'
                                    class='w-full'
                                >
                                    <NuxtIcon
                                        name='radix-icons:globe'
                                        size='20'
                                    />
                                    {{ explorer.name }}
                                </MazBtn>
                            </NuxtLink>
                        </div>
                    </template>
                </MazDropdown>
            </div>
        </div>
        
        <!--  Github  -->
        <div v-if='coingeckoLinks.repos_url?.github' class='coin-link-container mb-28 flex flex-col justify-center items-center lg:justify-start lg:items-start'>
            <h4>Github Repositories</h4>
            
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
                        
                        <p class='text-sm'>{{ link }}</p>
                    </div>
                
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { Separator } from '@/components/ui/separator';
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
    
    const extractNameFromUrl = url => {
        try {
            const hostname = new URL(url).hostname.replace(/^www\./, '');
            const rootName = hostname.split('.')[0];
            return rootName.charAt(0).toUpperCase() + rootName.slice(1);
        } catch (e) {
            console.error('Invalid URL', e);
            return null;
        }
    };
    
    const explorers = computed(() => {
        const sites = coingeckoLinks.value?.blockchain_site || [];
        return sites.map(href => ({
            name: extractNameFromUrl(href),
            href,
        }));
    });
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
        
        h4 {
            margin-bottom: 24px;
        }
        
        .explorers {
            /* Main explorer */
            .main-explorer-badge {
                background-color: var(--accent-foreground) !important;
                border: 1px solid transparent;
                height: 50px;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                
                &:hover {
                    border: 1px solid var(--secondary) !important;
                }
            }
            
            /* Dropdown icon */
            .m-dropdown__wrapper {
                .m-btn {
                    background-color: var(--accent-foreground) !important;
                    border-top-left-radius: 0 !important;
                    border-bottom-left-radius: 0 !important;
                    height: 50px;
                    
                    &:hover {
                        background-color: var(--accent) !important;
                    }
                }
            }
            
            /* Dropdown menu */
            .menu {
                background-color: var(--accent-foreground) !important;
                
                .m-btn:hover {
                    border: 1px solid var(--secondary) !important;
                }
            }
        }
    }
</style>