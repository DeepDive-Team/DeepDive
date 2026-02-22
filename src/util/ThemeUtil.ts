export function getPreferredTheme(): string {
    const darkModePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let preferredColorScheme: string;
    if (darkModePreferred) {
        preferredColorScheme = "dark";
    }
    else {
        preferredColorScheme = "light";
    }

    return preferredColorScheme;
}