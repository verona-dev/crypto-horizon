<template>
    <div class='w-full'>
        <Breadcrumb class='breadcrumb flex h-10 w-fit'>
            <BreadcrumbList>
                <BreadcrumbItem v-for='(item, index) in items' :key='index'>
                    <template v-if='index !== items.length - 1'>
                        <NuxtLink :to='item.url'>{{ item.name }}</NuxtLink>
                        
                        <BreadcrumbSeparator />
                    </template>
                    <template v-else>
                        <BreadcrumbPage>{{ item.name }}</BreadcrumbPage>
                    </template>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </div>
</template>

<script setup>
    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb';
    
    // NewsStore
    import { storeToRefs } from 'pinia';
    import { useNewsStore } from '~/stores/NewsStore';
    const NewsStore = useNewsStore();
    
    const route = useRoute();
    const { article, loading, errorFetch } = storeToRefs(NewsStore);
    const source = ref();
    watch(article, () => source.value = article.value?.SOURCE_DATA?.NAME);
    
    const sub_route_name = computed(() => {
        if(!!errorFetch.value) {
            return 'Not found';
        } else {
            return source.value;
        }
    });
    
    const items = computed(() => {
        let crumbs;
        const paths = route.path.split('/').filter(Boolean);
        
        if (route.name === 'news-slug') {
            crumbs = [
                { name: 'Home', url: '/' },
                { name: 'News', url: '/news' },
                { name: sub_route_name.value },
            ];
            
        } else {
            crumbs = [
                { name: 'Home', url: '/' },
                ...paths.map((path, i) => {
                    const url = '/' + paths.slice(0, i + 1).join('/');
                    const name = path.charAt(0).toUpperCase() + path.slice(1);
                    return { name, url };
                }),
            ];
        }
        
        return crumbs;
    });
</script>