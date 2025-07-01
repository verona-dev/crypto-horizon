<template>
    <div class='coin-links'>
        <!--  Website  -->
        <div v-if='livecoinwatchLinks?.website' class='links mt-10'>
            <h4>Website</h4>
            
            <!--  Website  -->
            <NuxtLink
                v-if='livecoinwatchLinks.website'
                :to='livecoinwatchLinks.website'
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
                    <p>Homepage</p>
                </div>
            </NuxtLink>
            
            <!--  Whitepaper  -->
            <NuxtLink
                v-if='livecoinwatchLinks.whitepaper'
                :to='livecoinwatchLinks.whitepaper'
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
        <div v-if='livecoinwatchLinks?.socials' class='socials mt-20'>
            <h4>Community</h4>
            
            <div
                v-for='(link, name) in livecoinwatchLinks?.socials'
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
        
        <!--  Explorers  -->
        <div v-if='coingeckoLinks?.blockchain_site' class='explorers mt-20'>
            <h4>Explorers</h4>
            
            <NuxtLink
                v-for='link in coingeckoLinks.blockchain_site'
                :to='link'
                external
                target='_blank'
                class='flex'
            >
                <div class='link-item flex items-center my-2'>
                    <MazBadge
                        rounded-size='md'
                        color='gray'
                        size='0.8rem'
                        outline
                    >
                        {{ link }}
                    </MazBadge>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, toRefs } from 'vue';
    
    const props = defineProps({
        livecoinwatchLinks: {
            type: Object,
            required: true,
        },
        coingeckoLinks: {
            type: Object,
            required: true,
        }
    });
    
    const { livecoinwatchLinks, coingeckoLinks } = toRefs(props);
</script>

<style scoped>
    .coin-links {
        .link-item {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        }
        
        h4 {
            margin-bottom: 24px;
        }
    }

</style>