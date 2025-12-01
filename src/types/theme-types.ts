export type ThemeMode = 'light' | 'dark';

export interface ColorScheme {
    background: string;
    surface: string;
    primary: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    searchBar: string;
    cardBackground: string;
    cardShadow: string;
}

export interface ThemeContextType {
    theme: ThemeMode;
    colors: ColorScheme;
    toggleTheme: () => void;
}
