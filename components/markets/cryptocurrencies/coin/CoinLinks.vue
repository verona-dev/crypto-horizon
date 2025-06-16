<template>
    <!--  Links  -->
    <CardContent class='flex items-start'>
        <div class='links w-[250px] m-4 p-6'>
            <h3 class='mb-4'>Links:</h3>
            
            <!--  Website  -->
            <NuxtLink
                v-if='links.website'
                :to='links.website'
                external
                target='_blank'
            >
                <div class='link-item flex py-3'>
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
            >
                <div class='link-item flex py-3'>
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
        <div class='socials w-[250px] m-4 p-6'>
            <h3 class='mb-4'>Socials:</h3>
            
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
                    <div class='link-item flex py-3'>
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
</template>

<script setup>
    import { CardContent } from '@/components/ui/card';
    
    import { defineProps, toRefs } from 'vue';
    
    const props = defineProps({
        links: {
            type: Object,
            default: () => ({}),
            required: true,
        }
    });
    
    const { links } = toRefs(props);
</script>

<style scoped>
    .links,
    .socials {
        border: 1px dashed gray;
    }
    
    .link-item {
        color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        transition: all .15s ease-in-out;
        
        &:hover {
            color: var(--secondary);
            scale: 1.05;
            transition: all .15s ease-in-out;
        }
    }
</style>