<template>
    <Card
        v-if='link'
        class='!bg-background w-52 2xl:min-w-76 p-12 2xl:pl-4 2xl:pr-2 2xl:py-3 flex flex-col 2xl:flex-row gap-6 2xl:gap-3 rounded-lg
                hover:border-green-shamrock/75 hover:shadow-2xl transition-all duration-500 ease-out border-border/50 shadow-md'
    >
        <!--  Logo + Name  -->
        <div class='flex flex-1 flex-col 2xl:flex-row items-center gap-2 2xl:gap-3 w-full'>
            <NuxtIcon
                :name='platform_icon'
                size='30'
                class='mt-0.5'
            />
            
            <CardTitle class='text-lg font-satoshi flex-1 capitalize'>{{ name }}</CardTitle>
        </div>
        
        <!--  Copy + Open link -->
        <div class='flex items-center gap-1 justify-self-end'>
            <TooltipProvider :delayDuration='250'>
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant='ghost' @click='onCopy(name, src)'>
                            <NuxtIcon
                                name='ph:copy'
                                size='17'
                            />
                        </Button>
                    </TooltipTrigger>
                    
                    <TooltipContent :side-offset='5'>
                        <p class='text-xs'>Copy link</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider :delayDuration='250'>
                <Tooltip>
                    <TooltipTrigger>
                        <NuxtLink
                            :to='src'
                            external
                            target='_blank'
                            class='ghost-link-as-button'
                        >
                            <NewTabIcon size='17' />
                        </NuxtLink>
                    </TooltipTrigger>
                    
                    <TooltipContent :side-offset="5">
                        <p class='text-xs'>Open link in a new tab</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </Card>
</template>

<script setup>
    import { capitalize } from '@/utils/formatUtils.js';
    import { Button } from '@/components/ui/button/index.ts';
    import { Card, CardTitle } from '@/components/ui/card/index.ts';
    import NewTabIcon from '@/components/NewTabIcon.vue';
    import { toast } from 'vue-sonner';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
    
    const props = defineProps({
        link: {
            type: Object,
            required: true,
        },
        category: {
            type: String,
        },
    });
    
    const { link, category } = toRefs(props);
    const name = ref(link.value?.key);
    const src = ref(link.value?.value);
    const platform_icon = computed(() => {
        if(name.value === 'chat') return 'ph:chat-teardrop-thin';
        else if(name.value === 'forum') return 'ph:chat-centered-text-thin';
        else if(category.value === 'socials') return `ph:${name.value}-logo-thin`;
        else if(category.value === 'github') return 'ph:github-logo-thin';
        else if(name.value === 'homepage') return 'ph:house-thin';
        else if(name.value === 'whitepaper') return 'ph:book-open-thin';
        else return 'ph:link-light';
    });
    
    const onCopy = (name, src) => {
        navigator.clipboard.writeText(src);
        
        toast.promise(() => new Promise((resolve) => setTimeout(resolve, 750)), {
            loading: 'Copying...',
            success: () => `${capitalize(name)} link copied to clipboard.`,
            error: () => 'Error',
            class: '!flex !gap-3',
        });
    };
</script>