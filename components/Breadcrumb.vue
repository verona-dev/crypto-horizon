<template>
    <Breadcrumb class='breadcrumbs mt-20'>
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
    
    const route = useRoute();
    console.log(route);
    
    const items = computed(() => {
        const paths = route.path.split('/').filter(Boolean);
        
        return [
            { name: 'Home', url: '/' },
            ...paths.map((segment, i) => {
                const url = '/' + paths.slice(0, i + 1).join('/');
                const name = segment.charAt(0).toUpperCase() + segment.slice(1);
                return { name, url };
            }),
        ];
    });
</script>