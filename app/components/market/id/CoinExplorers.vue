<template>
    <div v-if='links?.blockchain_site' class='flex flex-col gap-8'>
        <!--  Explorers Title  -->
        <div class='text-primary flex items-center gap-3'>
            <NuxtIcon
                name='ph:codepen-logo'
                size='48'
            />
            
            <Title :tag='3'>Explorers</Title>
        </div>
        
        <div class='flex items-center justify-between'>
            <!--  Main Explorer  -->
            <Item variant='muted' size='sm' class='rounded-tr-none rounded-br-none' as-child>
                <NuxtLink
                    :to='main_explorer_link'
                    external
                    target='_blank'
                    class='w-full h-13 border flex items-center'
                >
                    <ItemMedia>
                        <NuxtIcon
                            name='ph:codesandbox-logo-fill'
                            size='20'
                        />
                    </ItemMedia>
                    
                    <ItemContent>
                        <ItemTitle class='text-lg mx-auto'>{{ main_explorer_name }}</ItemTitle>
                    </ItemContent>
                    
                    <ItemActions>
                        <NewTabIcon />
                    </ItemActions>
                </NuxtLink>
            </Item>
            
            <!--  All Explorers - Dropdown menu  -->
            <DropdownMenu v-model:open='open' :modal='false'>
                <DropdownMenuTrigger as-child>
                    <Button
                        variant='ghost'
                        class='bg-muted/50 group h-13 rounded-tl-none rounded-bl-none border-l-border'
                        :data-state='open ? "open" : "closed"'
                    >
                        <ChevronDown class='!w-5 !h-5 ml-auto transition-transform duration-400 group-data-[state=open]:rotate-180' />
                    </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent class='min-w-62' align='end'>
                    <DropdownMenuLabel class='text-xl p-4'>Explorers</DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            v-for='explorer in explorers'
                            :key='explorer'
                            class='h-13'
                        >
                            <NuxtLink
                                :to='explorer.href'
                                external
                                target='_blank'
                                class='w-full h-13 pl-1.5 flex items-center gap-3'
                            >
                                <NuxtIcon
                                    name='ph:codesandbox-logo-fill'
                                    size='20'
                                />
                                {{ explorer.name }}
                            </NuxtLink>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup>
    import { ChevronDown } from 'lucide-vue-next';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
    import NewTabIcon from '~/components/NewTabIcon.vue';
    import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '~/components/ui/item';
    import Title from '~/components/Title.vue';
    
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
    
    const main_explorer_link = explorers.value[0]?.href;
    const main_explorer_name = explorers.value[0]?.name;
</script>