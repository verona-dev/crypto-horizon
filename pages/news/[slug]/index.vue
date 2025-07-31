<template>
    <div class='single-news bg-background custom-flex'>
        <div v-if='loading' class='flex items-center h-[75vh]'>
            <MazSpinner
                color='secondary'
                size='3em'
            />
            <h4 class='ml-4 mb-0'>Loading...</h4>
        </div>
        
        <div v-else>
            <Card v-if='article && article.ID' class='bg-background flex flex-col rounded-none'>
                <CardHeader class='p-0'>
                    Header
                </CardHeader>
                
                <CardContent>
                    Content
                </CardContent>
                
                <CardFooter class='flex justify-center my-10'>
                    Footer
                </CardFooter>
            </Card>
        </div>
    </div>

</template>

<script setup>
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
    import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card/index.js';
    import { Badge } from '~/components/ui/badge/index.js';
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar/index.js';
    import { Button } from '~/components/ui/button/index.js';
    
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    const { article, loading } = storeToRefs(CryptocurrenciesStore);
    const { getCoindeskNewsSingle } = CryptocurrenciesStore;
    
    onMounted(async() => {
        const { source_key, guid } = route.query;
        await getCoindeskNewsSingle(source_key, guid);
    });
</script>