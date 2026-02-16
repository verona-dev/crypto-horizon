
export default defineNuxtRouteMiddleware(async(to, from) => {
    const route = useRoute();
    const token = route.query.token;
    
    if(!token) {
        return navigateTo('/');
    }
});