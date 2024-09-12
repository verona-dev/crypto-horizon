<template>
    <header>
        <h2>
            <NuxtLink to='/'>Crypto App</NuxtLink>
        </h2>
        
        <q-spinner-bars
            v-if='loading'
            size="3em"
        />
        
        <nav>
            <ul>
                <li>
                    <div class='ml-10'>
                        <span class='mr-5'>Color mode</span>
                        <select v-model='$colorMode.preference'>
                            <option value='system'>System</option>
                            <option value='light'>Light</option>
                            <option value='dark'>Dark</option>
                            <option value='sepia'>Sepia</option>
                        </select>
                    </div>
                </li>
                <li>
                    <NuxtLink to='/market'>Market</NuxtLink></li>
                <li>
                    <NuxtLink to='/defi'>Defi</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    // CoinsStore
    import { storeToRefs } from 'pinia';
    import { useCoinsStore } from '~/stores/CoinsStore';
    const CoinsStore = useCoinsStore();
    
    // State
    const { loading } = storeToRefs(CoinsStore);
</script>

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
            width: 500px;
            
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