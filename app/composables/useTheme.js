
export const useTheme = () => {
    const darkThemes = ['dark', 'caffeine-dark','amethyst-dark'];
    const colorMode = useColorMode();

    const isDarkTheme = computed(() => {
        return darkThemes.includes(colorMode.value);
    });
    
    return { isDarkTheme };
};