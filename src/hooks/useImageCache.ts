import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IMAGE_CACHE_PREFIX = '@image_cache_';
const CACHE_EXPIRY_DAYS = 7; // Cache images for 7 days

interface CachedImage {
    uri: string;
    timestamp: number;
}

// In-memory cache for faster access
const memoryCache = new Map<string, string>();

export const useImageCache = (imageUrl: string) => {
    const [cachedUri, setCachedUri] = useState<string>(imageUrl);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadCachedImage();
    }, [imageUrl]);

    const loadCachedImage = async () => {
        if (!imageUrl) return;

        // Check memory cache first
        if (memoryCache.has(imageUrl)) {
            setCachedUri(memoryCache.get(imageUrl)!);
            return;
        }

        try {
            setIsLoading(true);
            const cacheKey = IMAGE_CACHE_PREFIX + imageUrl;

            // Check AsyncStorage cache
            const cachedData = await AsyncStorage.getItem(cacheKey);

            if (cachedData) {
                const parsed: CachedImage = JSON.parse(cachedData);
                const now = Date.now();
                const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

                // Check if cache is still valid
                if (now - parsed.timestamp < expiryTime) {
                    memoryCache.set(imageUrl, parsed.uri);
                    setCachedUri(parsed.uri);
                    setIsLoading(false);
                    return;
                } else {
                    // Cache expired, remove it
                    await AsyncStorage.removeItem(cacheKey);
                }
            }

            // If no valid cache, use original URL and cache it
            const imageData: CachedImage = {
                uri: imageUrl,
                timestamp: Date.now(),
            };

            await AsyncStorage.setItem(cacheKey, JSON.stringify(imageData));
            memoryCache.set(imageUrl, imageUrl);
            setCachedUri(imageUrl);
        } catch (error) {
            console.error('Image cache error:', error);
            setCachedUri(imageUrl); // Fallback to original URL
        } finally {
            setIsLoading(false);
        }
    };

    return { cachedUri, isLoading };
};

// Helper to clear old cache entries
export const clearExpiredImageCache = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const imageKeys = keys.filter(key => key.startsWith(IMAGE_CACHE_PREFIX));
        const now = Date.now();
        const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        for (const key of imageKeys) {
            const cachedData = await AsyncStorage.getItem(key);
            if (cachedData) {
                const parsed: CachedImage = JSON.parse(cachedData);
                if (now - parsed.timestamp >= expiryTime) {
                    await AsyncStorage.removeItem(key);
                }
            }
        }
    } catch (error) {
        console.error('Error clearing expired cache:', error);
    }
};

// Helper to clear all image cache
export const clearAllImageCache = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const imageKeys = keys.filter(key => key.startsWith(IMAGE_CACHE_PREFIX));
        await AsyncStorage.multiRemove(imageKeys);
        memoryCache.clear();
    } catch (error) {
        console.error('Error clearing all cache:', error);
    }
};
