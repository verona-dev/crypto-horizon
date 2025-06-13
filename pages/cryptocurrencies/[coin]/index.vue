<template>
    <div class='single-coin custom-flex'>
        <div
            v-if='loading'
            class='flex items-center'
        >
            <MazSpinner
                color='secondary'
                size='4em'
            />
            <h3 class='ml-4'>Loading...</h3>
        </div>
        
        <div v-else>
            <Card
                v-if='coin?.name'
                class='w-4xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm'
            >
                <CardHeader>
                    <div class='flex flex-col'>
                        <div class='flex my-5'>
                            <NuxtImg
                                :src='coin.webp64'
                                alt='symbol'
                                width='64'
                                height='64'
                                class='mr-6'
                            />
                            <h1>{{ coin.name }}</h1>
                        </div>
                        
                        <div class='flex items-center ml-4 my-5'>
                            <span class=''>{{ activeSymbol }}</span>
                            
                            <MazBadge
                                color='gray'
                                size='1rem'
                                rounded-size='md'
                                outline
                                class='ml-2'
                            >
                                #{{ coin.rank }}
                            </MazBadge>
                        </div>
                    </div>
                    
                    <CardDescription class='text-foreground my-4'>
                        <h2>{{ coin.rate }}</h2>
                    </CardDescription>
                    
                    <Separator class='my-4' />
                
                </CardHeader>
                
                <CardContent>
                    <p>Created {{ coin.age }} days ago</p>
                    <p>Market Cap: {{ coin.cap }}</p>
                    <p>ATH {{ coin.allTimeHighUSD }}</p>
                    <p>Circulating Supply: {{ coin.circulatingSupply }} {{ activeSymbol }}</p>
                    <p>Total Supply: {{ coin.totalSupply }}</p>
                    <p>Max Supply: {{ coin.maxSupply }}</p>
                </CardContent>
                
                <CardContent>
                    <p>Volume: {{ coin.volume }}</p>
                    <p>Hour change {{ coin.delta?.hour }}</p>
                    <p>Day change {{ coin.delta?.day }}</p>
                    <p>Week change {{ coin.delta?.week }}</p>
                    <p>Month change {{ coin.delta?.month }}</p>
                </CardContent>
                
                <CardContent>
                    <p>Markets {{ coin.markets }}</p>
                    <p>Pairs {{ coin.pairs }}</p>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    
    // Router
    import {useRoute} from 'vue-router';
    const route = useRoute();
    // CryptocurrenciesStore
    import {storeToRefs} from 'pinia';
    import {useCryptocurrenciesStore} from '~/stores/CryptocurrenciesStore';
    const CryptocurrenciesStore = useCryptocurrenciesStore();
    
    // State
    const { coin, loading } = storeToRefs(CryptocurrenciesStore);
    // Methods
    const { setActiveCoin } = CryptocurrenciesStore;
    
    const activeSymbol = computed(() => route.params.coin);
    
    onMounted(() => {
        setActiveCoin(route.params.coin);
    });
</script>

<style>
    .single-coin {
        span {
            color: rgb(156 163 175 / var(--maz-tw-text-opacity, 1));
        }
    }
</style>