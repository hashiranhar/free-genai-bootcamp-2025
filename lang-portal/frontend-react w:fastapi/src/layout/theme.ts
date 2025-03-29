export const isDarkTheme = (): boolean => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const onThemeChange = (callback: (isDark: boolean) => void): void => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = (event: MediaQueryListEvent) => callback(event.matches);
  mediaQuery.addEventListener('change', listener);

  // Cleanup function
  return () => mediaQuery.removeEventListener('change', listener);
};
