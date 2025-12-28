
export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser();
    
    if(to.path === '/profile' && !user.value) {
        return navigateTo('/');
    }
});