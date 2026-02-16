
export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore();
    
    if(AuthStore.isAuthenticated) {
        if(to.path === '/login' || to.path === '/register') {
            return navigateTo('/profile');
        }
    }
    
    if(to.path === '/profile' && !AuthStore.isAuthenticated) {
        return navigateTo('/');
    }
});