<template>
    <div v-if='links?.blockchain_site' class='coin-explorers'>
        <div class='flex items-center mb-4'>
            <NuxtIcon
                name='bitcoin-icons:block-outline'
                size='42'
                class='mr-3 min-w-14'
            />
            <h5>Explorers</h5>
        </div>
        
        <div class='flex items-center rounded-md border border-card-border'>
            <!--  Main Explorer  -->
            <NuxtLink
                :to='main_explorer_link'
                external
                target='_blank'
                class='inline-flex items-center flex-1'
            >
                <MazBadge class='main-badge w-full'>
                    <div class='py-1.5 pr-4 flex items-center'>
                        <NuxtIcon
                            name='radix-icons:globe'
                            size='20'
                            class='w-[50px]'
                        />
                        <p>{{ main_explorer_name }}</p>
                    </div>
                </MazBadge>
            </NuxtLink>
            
            <div class='vertical-separator'></div>
            
            <!--  All Explorers - Dropdown menu  -->
            <MazDropdown
                trigger='click'
                v-model:open='isOpen'
                position='bottom right'
                class='explorers-dropdown'
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
        links: {
            type: Object,
            required: true,
        }
    });
    
    const { links } = toRefs(props);
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
        const sites = links.value?.blockchain_site || [];
        return sites.map(href => ({
            name: extractNameFromUrl(href),
            href,
        }));
    });
    
    const main_explorer_link = explorers.value[0].href;
    const main_explorer_name = explorers.value[0].name;
</script>

<style>
    .coin-explorers {
        .m-btn {
            cursor: pointer !important;
        }
    }
</style>