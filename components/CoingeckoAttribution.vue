<template>
    <Alert class='w-fit coingecko-attribution flex flex-col gap-32 p-16'>
        
        <AlertTitle class='flex items-center gap-2'>
            <h6 class='flex items-center gap-2'>
                Powered by
                <NuxtLink
                    to='https://www.coingecko.com/en/api/'
                    target='_blank'
                    class='underline'
                    external
                >
                </NuxtLink>
                
                <NuxtImg
                    src='https://res.cloudinary.com/dgcyv1ehi/image/upload/v1759342218/CGAPI-Lockup-1_ysyezi.svg'
                />
                
                <NuxtIcon
                    name='iconoir:open-new-window'
                    size='50'
                />
            </h6>
        </AlertTitle>
        
        <AlertDescription>
            <p>This project uses the free Demo API plan from CoinGecko. We thank CoinGecko for providing high-quality cryptocurrency market data. Consider upgrading to a paid plan for enhanced features and higher rate limits.</p>
        </AlertDescription>
    </Alert>
</template>

<script setup>
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
    import { Skeleton } from '~/components/ui/skeleton/index.js';
</script>

<style scoped>

</style>