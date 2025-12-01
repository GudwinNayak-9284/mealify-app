import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../api/meals.service';

const FAVORITES_STORAGE_KEY = '@mealify_favorites';

interface FavoritesContextType {
    favorites: Recipe[];
    addFavorite: (recipe: Recipe) => Promise<void>;
    removeFavorite: (mealId: string) => Promise<void>;
    isFavorite: (mealId: string) => boolean;
    toggleFavorite: (recipe: Recipe) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    // Load favorites from storage on mount
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    };

    const saveFavorites = async (newFavorites: Recipe[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    };

    const addFavorite = async (recipe: Recipe) => {
        const newFavorites = [...favorites, recipe];
        setFavorites(newFavorites);
        await saveFavorites(newFavorites);
    };

    const removeFavorite = async (mealId: string) => {
        const newFavorites = favorites.filter(fav => fav.idMeal !== mealId);
        setFavorites(newFavorites);
        await saveFavorites(newFavorites);
    };

    const isFavorite = (mealId: string): boolean => {
        return favorites.some(fav => fav.idMeal === mealId);
    };

    const toggleFavorite = async (recipe: Recipe) => {
        if (isFavorite(recipe.idMeal)) {
            await removeFavorite(recipe.idMeal);
        } else {
            await addFavorite(recipe);
        }
    };

    const value: FavoritesContextType = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
