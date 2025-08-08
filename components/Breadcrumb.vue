<template>
    <Breadcrumb class='breadcrumbs mt-20 mb-10 border border-t-secondary border-b-secondary border-r-0 border-l-0 px-4 py-2'>
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
</template>

<script setup>
    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb';
    
    const props = defineProps({
        article: {},
    });
    
    const route = useRoute();
    const { article } = toRefs(props);
    const source = ref();
    watch(article, () => source.value = article.value?.SOURCE_DATA?.NAME || 'Article');
    
    const items = computed(() => {
        let crumbs;
        const paths = route.path.split('/').filter(Boolean);
        
        if (route.name === 'news-slug') {
            if(source.value) {
                crumbs = [
                    { name: 'Home', url: '/' },
                    { name: 'News', url: '/news' },
                    { name: source.value, url: '/' },
                ];
            }
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