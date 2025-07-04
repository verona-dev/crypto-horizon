<template>
    <div
        v-if='coingeckoLinks?.blockchain_site'
        class='coin-explorers'
    >
        <h6>Explorers</h6>
        
        <div class='flex items-center'>
            <!--  Main Explorer  -->
            <NuxtLink
                :to='explorers[0].href'
                external
                target='_blank'
                class='inline-flex items-center flex-1'
            >
                <MazBadge class='main-explorer-badge w-full'>
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
            
            <div class='vertical-separator'></div>
            
            <!--  All Explorers - Dropdown menu  -->
            <MazDropdown
                trigger='click'
                v-model:open='isOpen'
            >
                <template #dropdown>
                    <div
                        v-for='explorer in explorers'
                        :key='explorer'
                        @click='isOpen = false'
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
</template>

<script setup>
    const props = defineProps({
        coingeckoLinks: {
            type: Object,
            required: true,
        }
    });
    
    const { coingeckoLinks } = toRefs(props);
    const isOpen = ref(false);
    
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
    .coin-explorers {
        /* Main explorer */
        .main-explorer-badge {
            background-color: var(--accent-foreground) !important;
            border: 1px solid transparent !important;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            height: 50px;
            
            &:hover {
                background-color: var(--accent) !important;
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
            
            /*
            .m-btn:hover {
                border: 1px solid var(--secondary) !important;
            }
            */
        }
    }

</style>