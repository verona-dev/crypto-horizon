
export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore();
    const ProfileStore = useProfileStore();
    
    if(AuthStore.isAuthenticated && !ProfileStore.profile) {
        await ProfileStore.getProfile();
    }
});