<script setup lang="ts">
    import {
        NavigationMenu,
        NavigationMenuContent,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        NavigationMenuTrigger,
        navigationMenuTriggerStyle,
    } from '@/components/ui/navigation-menu'
    
    const defiItems: { title: string, href: string, description: string }[] = [
        {
            title: 'What',
            href: '/defi',
            description:
                'What is Defi?',
        },
        {
            title: 'When',
            href: '/defi',
            description:
                'When to Defi?',
        },
        {
            title: 'Where',
            href: '/defi',
            description:
                'Where to Defi',
        },
        {
            title: 'How',
            href: '/defi',
            description: 'How to Defi?',
        },
    ]
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList>
            <!--  Logo  -->
            <NavigationMenuItem>
                <NavigationMenuLink href='/' :class='navigationMenuTriggerStyle()'>
                    Crypto Horizon
                </NavigationMenuLink>
            </NavigationMenuItem>
            
            <!--  Markets  -->
            <NavigationMenuItem>
                <NavigationMenuTrigger>Markets</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul class='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]'>
                        
                        <!--  Markets Logo  -->
                        <li class='row-span-3'>
                            <NavigationMenuLink as-child>
                                <a
                                    class='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                                    href='/'
                                >
                                    <img src='https://www.reka-ui.com/logo.svg' class='h-6 w-6'>
                                    <div class='mb-2 mt-4 text-lg font-medium'>
                                        shadcn/ui
                                    </div>
                                    <p class='text-sm leading-tight text-muted-foreground'>
                                        Beautifully designed components built with Radix UI and
                                        Tailwind CSS.
                                    </p>
                                </a>
                            </NavigationMenuLink>
                        </li>
                        
                        <!--  Markets - Cryptocurrencies -->
                        <li>
                            <NavigationMenuLink as-child>
                                <NuxtLink
                                    to='/coins'
                                    class='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                >
                                    <div class='text-sm font-medium leading-none'>Cryptocurrencies</div>
                                    <p class='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                        Check the market.
                                    </p>
                                </NuxtLink>
                            </NavigationMenuLink>
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            
            <!--  Defi  -->
            <NavigationMenuItem>
                <NavigationMenuTrigger>Defi</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul class='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                        <li v-for='item in defiItems' :key='item.title'>
                            <NavigationMenuLink as-child>
                                <NuxtLink
                                    :to='item.href'
                                    class='block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                >
                                    <div class='text-sm font-medium leading-none'>{{ item.title }}</div>
                                    <p class='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                        {{ item.description }}
                                    </p>
                                </NuxtLink>
                            </NavigationMenuLink>
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<style>
    .m-card-spotlight {
        .content {
            padding: 0 !important;
        }
    }
</style>