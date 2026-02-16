
export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore();
    const ProfileStore = useProfileStore();
    
    if(AuthStore.isAuthenticated && !ProfileStore.profile) {
        await ProfileStore.getProfile();
    }
    
    if(AuthStore.isAuthenticated) {
        if(to.path === '/login' || to.path === '/register') {
            return navigateTo('/profile');
        }
    }
    
    if(to.path === '/profile' && !AuthStore.isAuthenticated) {
        return navigateTo('/');
    }
});