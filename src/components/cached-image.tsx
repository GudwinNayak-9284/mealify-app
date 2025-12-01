import React from 'react';
import { Image, ImageProps, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useImageCache } from '../hooks/useImageCache';

interface CachedImageProps extends Omit<ImageProps, 'source'> {
    uri: string;
    showLoader?: boolean;
}

export const CachedImage: React.FC<CachedImageProps> = ({
    uri,
    showLoader = false,
    style,
    ...props
}) => {
    const { cachedUri, isLoading } = useImageCache(uri);

    return (
        <View style={style}>
            <Image
                {...props}
                source={{ uri: cachedUri }}
                style={[StyleSheet.absoluteFill, style]}
            />
            {showLoader && isLoading && (
                <View style={[StyleSheet.absoluteFill, styles.loaderContainer]}>
                    <ActivityIndicator size="small" color="#F59E0B" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
});
