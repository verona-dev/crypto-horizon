<template>
    <CardContent class='flex'>
        <!--  Official  -->
        <div class='links flex-1 m-4 p-6'>
            <h4 class='mb-6'>Official</h4>
            
            <!--  Website  -->
            <NuxtLink
                v-if='links.website'
                :to='links.website'
                external
                target='_blank'
                class='flex my-2'
            >
                <div class='link-item flex items-center py-3'>
                    <NuxtIcon
                        name='radix-icons:link-2'
                        size='25'
                        class='w-[50px]'
                    />
                    <p>Website</p>
                </div>
            </NuxtLink>
            
            <!--  Whitepaper  -->
            <NuxtLink
                v-if='links.whitepaper'
                :to='links.whitepaper'
                external
                target='_blank'
                class='flex my-2'
            >
                <div class='link-item flex items-center py-3'>
                    <NuxtIcon
                        name='radix-icons:reader'
                        size='25'
                        class='w-[50px]'
                    />
                    <p>Whitepaper</p>
                </div>
            </NuxtLink>
        </div>
        
        <!--  Socials  -->
        <div class='socials flex-1 m-4 p-6'>
            <h4 class='mb-6'>Social Networks</h4>
            
            <div
                v-for='(link, name) in links?.socials'
                :key='name'
                class='flex items-center justify-start my-2'
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
    </CardContent>
    
    <Separator class='my-4' />
</template>

<script setup>
    import { CardContent } from '@/components/ui/card';
    
    import { defineProps, toRefs } from 'vue';
    
    const props = defineProps({
        links: {
            type: Object,
            default: () => ({}),
        }
    });
    
    const { links } = toRefs(props);
</script>

<style scoped>
    .link-item {
        color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        transition: all .15s ease-in-out;
        
        &:hover {
            color: var(--secondary);
            scale: 1.05;
            transition: all .15s ease-in-out;
            text-decoration: underline;
        }
    }
</style>