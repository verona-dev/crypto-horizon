<template>
    <div class='coin-links'>
        <!--  Website  -->
        <div class='links mt-10'>
            <h4 class='mb-6'>Website</h4>
            
            <!--  Website  -->
            <NuxtLink
                v-if='links.website'
                :to='links.website'
                external
                target='_blank'
                class='flex'
            >
                <div class='link-item flex items-center'>
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
        
        <!--  Community  -->
        <div class='socials mt-20'>
            <h4 class='mb-6'>Community</h4>
            
            <div
                v-for='(link, name) in links?.socials'
                :key='name'
                class='flex items-center justify-start'
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
    </div>
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
        /*
        transition: all .15s ease-out;
        */
        
        &:hover {
            color: var(--secondary);
            text-decoration: underline;
            /*
            scale: 1.05;
            transition: all .15s ease-out;
            */
        }
    }
</style>