<template>
    <header>
        <h2>
            <NuxtLink to='/'>Crypto App</NuxtLink>
        </h2>
        
        <nav>
            <ul>
                <li>
                    <NuxtLink to='/market'>Market</NuxtLink></li>
                <li>
                    <NuxtLink to='/defi'>Defi</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang='scss'>
    header {
        align-items: center;
        border-bottom: 1px solid var(--color-pink_cabaret);
        padding: 1em;
        display: flex;
        justify-content: space-between;
        
        a:hover {
            color: var(--color-pink_cabaret);
        }
        
        .q-spinner {
            color: var(--color-purple);
        }
        
        nav {
            width: 200px;
            
            ul {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                align-content: center;
            }
        }
    }
</style>