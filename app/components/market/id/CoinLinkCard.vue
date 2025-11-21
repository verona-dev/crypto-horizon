<template>
    <Card
        v-if='link'
        class='!bg-background w-52 2xl:min-w-84 p-16 2xl:px-4 2xl:py-3 flex flex-col 2xl:flex-row items-center gap-6 2xl:gap-3 rounded-lg
                hover:border-green-shamrock/75 transition-all duration-500 ease-out border-border/100 shadow-none'
    >
        <div class='flex flex-col items-center gap-2 2xl:gap-3 w-full'>
            <NuxtIcon
                :name='icon'
                size='25'
                class='mt-0.5'
            />
            
            
            <CardTitle class='text-lg font-satoshi flex-1 capitalize'>{{ name }}</CardTitle>
            <span v-if='social_handle' class='text-xs font-satoshi'>{{ src }}</span>
            
        </div>
        
        <div class='flex items-center gap-3 justify-self-end'>
            <Button variant='outline' @click='onCopy(name, src)'>
                <NuxtIcon
                    name='ph:copy'
                    size='15'
                />
            </Button>
            
            <NuxtLink
                :to='src'
                external
                target='_blank'
                class='link-as-button'
            >
                <NewTabIcon />
            </NuxtLink>
        </div>
    </Card>
</template>

<script setup>
    import { Button } from '@/components/ui/button/index.ts';
    import { Card, CardTitle } from '@/components/ui/card/index.ts';
    import NewTabIcon from '@/components/NewTabIcon.vue';
    import { toast } from 'vue-sonner';
    import { capitalize } from '@/utils/formatUtils.js';
    
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
    const social_handle = computed(() => category.value === 'socials');
    const icon = computed(() => {
        if(name.value === 'website') return 'ph:house-thin';
        else if(name.value === 'whitepaper') return 'ph:book-open-thin';
        else if(category.value === 'socials') return `ph:${name.value}-logo-thin`;
        else return 'ph:link-light';
    });
    
    // console.log(link.value);
    
    const onCopy = (name, src) => {
        navigator.clipboard.writeText(src);
        
        toast.promise(() => new Promise((resolve) => setTimeout(resolve, 750)), {
            loading: 'Copying...',
            success: (data) => `${capitalize(name)} link copied to clipboard.`,
            error: (data) => 'Error',
            class: '!flex !gap-3',
        });
    };
</script>