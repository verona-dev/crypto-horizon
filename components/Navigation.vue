<script setup lang='ts'>
    import {
        NavigationMenu,
        NavigationMenuContent,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        NavigationMenuTrigger,
        navigationMenuTriggerStyle,
    } from '~/components/ui/navigation-menu'
    
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
    <NavigationMenu disableHoverTrigger>
        <MazCardSpotlight color='secondary' :padding='false'>
            <NavigationMenuList>
                <!--  Logo  -->
                <NavigationMenuItem>
                    <NuxtLink to='/' :class='navigationMenuTriggerStyle()'>
                        <NavigationMenuLink class='text-2xl'>
                            CryptoHorizon
                        </NavigationMenuLink>
                    </NuxtLink>
                </NavigationMenuItem>
                
                <!--  Cryptocurrencies  -->
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Cryptocurrencies</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul class='flex items-center p-6 md:w-[400px] gap-4'>
                            <!--  Cryptocurrencies Logo  -->
                            <li class='w-24'>
                                <NuxtIcon
                                    name='bitcoin-icons:bitcoin-circle-filled'
                                    size='100'
                                />
                            </li>
                            
                            <!--  Cryptocurrencies -->
                            <li>
                                <NavigationMenuLink as-child>
                                    <NuxtLink
                                        to='/pages/markets'
                                        class='flex items-start select-none space-y-1 rounded-md px-6 py-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
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
                
                <!--  News  -->
                <NavigationMenuItem>
                    <NavigationMenuTrigger>News</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul class='flex items-center justify-around p-6 md:w-[500px] gap-4'>
                            <!--  News Logo  -->
                            <li class='w-24'>
                                <NuxtIcon
                                    name='emojione-monotone:newspaper'
                                    size='85'
                                />
                            </li>
                            
                            <li>
                                <ul class='flex flex-col gap-3'>
                                    <!--  Check the News -->
                                    <li>
                                        <NavigationMenuLink as-child>
                                            <NuxtLink
                                                to='/news'
                                                class='flex items-start select-none space-y-1 rounded-md px-6 py-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                            >
                                                <div class='text-sm font-medium leading-none'>News</div>
                                                <p class='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                                    Discover the latest news.
                                                </p>
                                            </NuxtLink>
                                        </NavigationMenuLink>
                                    </li>
                                    
                                    <!-- News Sources -->
                                    <li>
                                        <NavigationMenuLink as-child>
                                            <NuxtLink
                                                to='/news/outlets'
                                                class='flex justify-start items-start select-none space-y-1 rounded-md px-6 py-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                            >
                                                <div class='text-sm font-medium leading-none'>Outlets</div>
                                                <p class='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                                    Check the news sources.
                                                </p>
                                            </NuxtLink>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
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
        </MazCardSpotlight>
    </NavigationMenu>
</template>

<style>
    ul {
        background-color: var(--background) !important;
    }
    
    nav {
        position: relative;
        left: calc((100vw - 101%) / 2);
    }
    
    .m-card-spotlight {
        border-radius: 0 !important;
        width: 100% !important;
        
        .inner {
            border-radius: 0 !important;
        }
    }
</style>