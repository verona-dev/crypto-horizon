
export const checkTheme = () => {
    const themes = ['dark', 'caffeine-dark', 'amethyst-dark'];
    const colorMode = useColorMode();

    const darkThemes = computed(() => themes.includes(colorMode.value));
    
    return { darkThemes };
};