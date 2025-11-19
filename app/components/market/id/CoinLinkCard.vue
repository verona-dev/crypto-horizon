<template>
    <Card
        v-if='link'
        class='!bg-background min-w-80 px-4 py-3 flex items-center gap-2 rounded-lg
               hover:border-green-shamrock transition-all duration-500 ease-out border-border/100 shadow-none'
    >
        <NuxtIcon
            :name='icon'
            size='22'
            class='mb-0.5'
        />
        
        <CardTitle class='text-sm flex-1 capitalize'>{{ name }}</CardTitle>
        
        <div class='flex items-center gap-4 justify-self-end'>
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
        }
    });
    
    const { link } = toRefs(props);
    const name = ref(link.value?.key);
    const src = ref(link.value?.value);
    const icon = computed(() => {
        if(name.value === 'website') return 'ph:house-light';
        if(name.value === 'whitepaper') return 'ph:book-open-light';
    });
    
    // console.log(link.value);
    
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