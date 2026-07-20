<template>
    <div class='page'>
        <PageLoadingSpinner v-if='loading' />
        
        <template v-else>
            <div v-if='protocol'>
                <Title :tag='1' :level='3'>Protocol Page</Title>
            </div>
        </template>
    </div>
</template>

<script setup>
    import PageLoadingSpinner from '@/components/PageLoadingSpinner.vue';
    import Title from '~/components/Title.vue';
    
    // LoadingStore
    import { storeToRefs } from 'pinia';
    import { useLoadingStore } from '~/stores/LoadingStore.js';
    const LoadingStore = useLoadingStore();
    const { loading } = storeToRefs(LoadingStore);
    
    // DefiStore
    import { useDefiStore } from '~/stores/DefiStore.js';
    const DefiStore = useDefiStore();
    const { getDefillamaProtocol } = DefiStore;
    const { protocol } = storeToRefs(DefiStore);
    
    // Router
    const route = useRoute();
    const id = computed(() => route.params?.id);
    
    onMounted(async() => await getDefillamaProtocol(id.value));
</script>
