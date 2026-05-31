
export const checkTheme = () => {
    const darkThemes = ['dark', 'caffeine-dark', 'amethyst-dark'];
    const colorMode = useColorMode();

    const isDarkTheme = computed(() => darkThemes.includes(colorMode.value));
    
    return { isDarkTheme };
};