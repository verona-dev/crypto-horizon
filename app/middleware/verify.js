
export default defineNuxtRouteMiddleware(async(to, from) => {
    const route = useRoute();
    const code = route.query.code;
    
    if(!code) {
        return navigateTo('/');
    }
});