<template>
    <div v-if='links?.blockchain_site' class='coin-explorers flex flex-col gap-4'>
        <!--  Explorers Title  -->
        <div class='flex items-center gap-3'>
            <NuxtIcon
                name='ph:codepen-logo'
                size='22'
                class='mt-0.5'
            />
            <h4>Explorers</h4>
        </div>
        
        <div class='h-12 flex items-center justify-between border rounded-lg'>
            <!--  Main Explorer  -->
            <NuxtLink
                :to='main_explorer_link'
                external
                target='_blank'
                class='flex justify-around items-center w-full px-2'
            >
                <NuxtIcon
                    name='ph:codesandbox-logo-fill'
                    size='20'
                />
                
                <p>{{ main_explorer_name }}</p>
                
                <NuxtIcon
                    name='ph:arrow-square-out'
                    size='14'
                    class='icon mb-0.5'
                />
            </NuxtLink>
            
            <!--  All Explorers - Dropdown menu  -->
            <DropdownMenu v-model:open='open' :modal='false'>
                <DropdownMenuTrigger as-child>
                    <Button
                        variant='ghost'
                        class='group !h-full rounded-tl-none rounded-bl-none border-l border-border'
                        :data-state='open ? "open" : "closed"'
                    >
                        <ChevronDown class='text-primary ml-auto transition-transform duration-400 group-data-[state=open]:rotate-180' />
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent class='min-w-62 rounded-lg' align='end'>
                    <DropdownMenuLabel class='text-lg px-4 py-4 my-1'>Explorers</DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup class='px-1'>
                        <DropdownMenuItem
                            v-for='explorer in explorers'
                            :key='explorer'
                            class='h-12 !px-0 rounded-lg my-2'
                        >
                            <NuxtLink
                                :to='explorer.href'
                                external
                                target='_blank'
                                class='w-full h-12 px-3 rounded-lg'
                            >
                                <div class='flex items-center gap-3 h-full'>
                                    <NuxtIcon
                                        name='ph:codesandbox-logo-fill'
                                        size='20'
                                    />
                                    {{ explorer.name }}
                                </div>
                            </NuxtLink>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup>
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
    import { ChevronDown } from 'lucide-vue-next';
    
    const props = defineProps({
        links: {
            type: Object,
            required: true,
        }
    });
    
    const { links } = toRefs(props);
    const open = ref(false);
    
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