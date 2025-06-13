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
                    <CardTitle class='flex items-center my-4'>
                        <h1>{{ coin.name }}</h1>
                        
                        <div class='mt-3 flex items-center'>
                            <h4 class='mx-6'>&nbsp;{{ coin.symbol }}</h4>
                            <MazBadge
                                color='gray'
                                size='1rem'
                                rounded-size='md'
                                outline
                                class='ml-4'
                            >
                                #{{ coin.rank }}
                            </MazBadge>
                        </div>
                    </CardTitle>
                    
                    <CardDescription class='text-foreground my-4'>
                        <h2>{{ coin.rate }}</h2>
                    </CardDescription>
                    
                    <Separator class='my-4' />
                
                </CardHeader>
                
                <CardContent>
                    <p>Created {{ coin.age }} days ago</p>
                    <p>Market Cap: {{ coin.cap }}</p>
                    <p>ATH {{ coin.allTimeHighUSD }}</p>
                    <p>Circulating Supply: {{ coin.circulatingSupply }}</p>
                    <p>Total Supply: {{ coin.totalSupply }}</p>
                    <p>Max Supply: {{ coin.maxSupply }}</p>
                </CardContent>
                
                <CardContent>
                    <p>Volume: {{ coin.volume }}</p>
                    <p>Hour change {{ coin.delta?.hour }}</p>
                    <p>Day change {{ coin.delta?.day }}</p>
                    <p>Week change {{ coin.delta?.week }}</p>
                    <p>Month change {{ coin.delta?.month }}</p>
                    <p>Markets {{ coin.markets }}</p>
                    <p>Pairs {{ coin.pairs }}</p>
                </CardContent>
            </Card>
            
            <img :src='coin.png64' alt='logo'>
        </div>
    </div>
</template>

<script setup>
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
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
    
    onMounted(() => {
        setActiveCoin(route.params.coin);
    });
</script>

<style>
    .single-coin {
    
    }
</style>