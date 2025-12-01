import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode, ColorScheme, ThemeContextType } from '../types/theme-types';

const THEME_STORAGE_KEY = '@mealify_theme';

// Light mode colors
const lightColors: ColorScheme = {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    primary: '#F59E0B',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    searchBar: 'rgba(0, 0, 0, 0.05)',
    cardBackground: '#FFFFFF',
    cardShadow: '#000000',
};

// Dark mode colors
const darkColors: ColorScheme = {
    background: '#111827',
    surface: '#1F2937',
    primary: '#F59E0B',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
    searchBar: 'rgba(255, 255, 255, 0.1)',
    cardBackground: '#1F2937',
    cardShadow: '#000000',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeMode>('light');

    // Load theme from storage on mount
    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setTheme(savedTheme);
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
        }
    };

    const toggleTheme = async () => {
        const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    const colors = theme === 'light' ? lightColors : darkColors;

    const value: ThemeContextType = {
        theme,
        colors,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
