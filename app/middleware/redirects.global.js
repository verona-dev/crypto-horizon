
export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore();
    
    if(to.path === '/profile' && !AuthStore.isAuthenticated) {
        return navigateTo('/');
    }
});