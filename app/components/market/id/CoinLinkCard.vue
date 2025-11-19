<template>
    <Card
        v-if='link'
        class='!bg-background w-52 2xl:min-w-84 p-16 2xl:px-4 2xl:py-3 flex flex-col 2xl:flex-row items-center gap-6 2xl:gap-3 rounded-lg
                hover:border-green-shamrock/75 transition-all duration-500 ease-out border-border/100 shadow-none'
    >
        <div class='flex flex-col 2xl:flex-row items-center gap-2 2xl:gap-3 w-full'>
            <NuxtIcon
                :name='icon'
                size='25'
                class='mt-0.5'
            />
            
            <CardTitle class='text-lg font-satoshi flex-1 capitalize'>{{ name }}</CardTitle>
        </div>
        
        <div class='flex items-center gap-3 justify-self-end'>
            <Button variant='outline' @click='onCopy(src)'>
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
    import { h, resolveComponent } from 'vue';
    import NewTabIcon from '@/components/NewTabIcon.vue';
    import { toast } from 'vue-sonner';
    
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
    const icon = computed(() => {
        if(name.value === 'website') return 'ph:house-thin';
        else if(name.value === 'whitepaper') return 'ph:book-open-thin';
        else if(category.value === 'socials') return `ph:${name.value}-logo-thin`;
        else return 'ph:link-light';
    });
    
    console.log(link.value);
    
    const onCopy = (url) => {
        navigator.clipboard.writeText(url);
        
        toast(``, {
            title: () =>
                h('h6', {
                    class: 'font-medium',
                }, 'Link copied to clipboard.'),
            icon: () =>
                h(resolveComponent('NuxtIcon'), {
                    name: 'ph:check-circle-light',
                    size: 30,
                    class: 'w-[50px]',
                }),
            action: {
                label: 'OK',
            },
            description: () =>
                h('span', url),
        });
    };
</script>