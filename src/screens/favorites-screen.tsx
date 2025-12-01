import { View, Text, StatusBar, ScrollView, TouchableOpacity, Pressable, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '../context/theme-context';
import { useFavorites } from '../context/favorites-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { CachedImage } from '../components/cached-image';
import { Recipe } from '../api/meals.service';
import { Heart } from 'lucide-react-native';

const FavoritesScreen = () => {
    const { theme, colors } = useTheme();
    const { favorites, toggleFavorite } = useFavorites();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

            {/* Header */}
            <View className='mx-4' style={{ marginTop: hp(6), marginBottom: hp(3) }}>
                <Text style={{ fontSize: hp(3.5), fontWeight: '700', color: colors.textPrimary }}>
                    My Favorites
                </Text>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(3) }}
            >
                {favorites.length > 0 ? (
                    <View className='mx-4'>
                        <Text style={{ fontSize: hp(2), color: colors.textSecondary, marginBottom: hp(2) }}>
                            {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
                        </Text>
                        <View className='flex-row flex-wrap justify-between'>
                            {favorites.map((recipe, index) => (
                                <FavoriteCard
                                    key={recipe.idMeal}
                                    item={recipe}
                                    index={index}
                                    navigation={navigation}
                                    onRemove={() => toggleFavorite(recipe)}
                                />
                            ))}
                        </View>
                    </View>
                ) : (
                    <View className='flex-1 justify-center items-center' style={{ height: hp(60) }}>
                        <Heart size={hp(8)} color={colors.textSecondary} strokeWidth={1.5} />
                        <Text style={{ fontSize: hp(2.5), fontWeight: '600', color: colors.textPrimary, marginTop: hp(2) }}>
                            No Favorites Yet
                        </Text>
                        <Text style={{ fontSize: hp(1.8), color: colors.textSecondary, marginTop: hp(1), textAlign: 'center', paddingHorizontal: wp(10) }}>
                            Start adding recipes to your favorites by tapping the heart icon
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

interface FavoriteCardProps {
    item: Recipe;
    index: number;
    navigation: NativeStackNavigationProp<RootStackParamList>;
    onRemove: () => void;
}

const FavoriteCard = ({ item, index, navigation, onRemove }: FavoriteCardProps) => {
    const { colors, theme } = useTheme();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;
    const heartScale = useRef(new Animated.Value(1)).current;

    const isEven = index % 2 === 0;
    const cardHeight = isEven ? hp(25) : hp(30);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 500,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleValue, {
                toValue: 1,
                delay: index * 100,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
    }, [index]);

    const opacity = animatedValue;
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    const handlePress = () => {
        navigation.navigate('MealDetail', { mealId: item.idMeal });
    };

    const handleRemove = () => {
        Animated.sequence([
            Animated.timing(heartScale, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(heartScale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            })
        ]).start();

        onRemove();
    };

    return (
        <Animated.View
            style={{
                opacity,
                transform: [{ translateY }, { scale: scaleValue }],
                width: '48%',
                marginBottom: hp(2),
            }}
        >
            <Pressable
                onPress={handlePress}
                className='rounded-3xl overflow-hidden'
                style={({ pressed }) => [
                    {
                        backgroundColor: colors.cardBackground,
                        elevation: theme === 'dark' ? 8 : 4,
                        shadowColor: colors.cardShadow,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
                        shadowRadius: 8,
                        transform: [{ scale: pressed ? 0.95 : 1 }],
                    }
                ]}
            >
                <CachedImage
                    uri={item.strMealThumb}
                    style={{
                        width: '100%',
                        height: cardHeight,
                        borderRadius: 24,
                    }}
                    resizeMode='cover'
                />

                {/* Remove Heart Icon */}
                <TouchableOpacity
                    onPress={handleRemove}
                    className='absolute top-2 right-2 p-2 rounded-full'
                    style={{
                        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                        <Heart
                            size={hp(2.5)}
                            color='#EF4444'
                            fill='#EF4444'
                            strokeWidth={2}
                        />
                    </Animated.View>
                </TouchableOpacity>

                <View
                    className='absolute bottom-0 left-0 right-0 rounded-b-3xl'
                    style={{
                        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.98)' : 'rgba(255, 255, 255, 0.95)',
                        paddingVertical: hp(1.5),
                        paddingHorizontal: wp(3)
                    }}
                >
                    <Text
                        style={{
                            fontSize: hp(2),
                            fontWeight: '700',
                            color: colors.textPrimary,
                            textAlign: 'center',
                            lineHeight: hp(2.4)
                        }}
                        numberOfLines={2}
                    >
                        {item.strMeal}
                    </Text>
                </View>
            </Pressable>
        </Animated.View>
    )
}

export default FavoritesScreen
