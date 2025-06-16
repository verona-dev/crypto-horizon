<template>
    <!--  Links  -->
    <CardContent>
        <div class='links'>
            <h3>Links:</h3>
            
            <MazBadge
                color='gray'
                outline
            >
                <span>Website: {{ links.website }}</span>
            </MazBadge>
            
            <MazBadge
                color='gray'
                outline
            >
                <span>Whitepaper: {{ links.whitepaper }}</span>
            </MazBadge>
        </div>
    </CardContent>
    
    <!--  Socials  -->
    <CardContent>
        <div class='socials w-[250px] m-4 p-6'>
            <h3>Socials:</h3>
            
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
                    <div class='social-item flex p-3'>
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
    .socials {
        border: 1px dashed orange;
        
        .social-item {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
            transition: all .15s ease-in-out;
            
            &:hover {
                color: var(--secondary);
                scale: 1.05;
                transition: all .15s ease-in-out;
            }
        }
    }
</style>