import { View, Text, StatusBar, TextInput, ScrollView, Pressable, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '../context/theme-context';
import { useQuery } from '@tanstack/react-query';
import { searchMealsByName, Recipe } from '../api/meals.service';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { CachedImage } from '../components/cached-image';
import { useFavorites } from '../context/favorites-context';
import { Heart } from 'lucide-react-native';

const SearchScreen = () => {
    const { theme, colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: searchResults, isLoading } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => searchMealsByName(debouncedQuery),
        enabled: debouncedQuery.length > 0,
    });

    const clearSearch = () => {
        setSearchQuery('');
        setDebouncedQuery('');
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

            {/* Header with Search Bar */}
            <View className='mx-4' style={{ marginTop: hp(6), marginBottom: hp(2) }}>
                <Text style={{ fontSize: hp(3.5), fontWeight: '700', color: colors.textPrimary, marginBottom: hp(2) }}>
                    Search Recipes
                </Text>

                {/* Search Input */}
                <View
                    className='flex-row items-center rounded-2xl px-4 py-3'
                    style={{ backgroundColor: colors.surface }}
                >
                    <Search size={hp(2.5)} color={colors.textSecondary} strokeWidth={2.5} />
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder='Search for any recipe...'
                        placeholderTextColor={colors.textSecondary}
                        style={{
                            flex: 1,
                            fontSize: hp(2),
                            color: colors.textPrimary,
                            marginLeft: wp(3),
                            marginRight: wp(2)
                        }}
                        autoFocus
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={clearSearch}>
                            <X size={hp(2.5)} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Results */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(3) }}
            >
                {debouncedQuery.length === 0 ? (
                    <View className='flex-1 justify-center items-center' style={{ marginTop: hp(15) }}>
                        <Search size={hp(8)} color={colors.textSecondary} strokeWidth={1.5} />
                        <Text style={{ fontSize: hp(2.5), fontWeight: '600', color: colors.textPrimary, marginTop: hp(2) }}>
                            Search for Recipes
                        </Text>
                        <Text style={{ fontSize: hp(1.8), color: colors.textSecondary, marginTop: hp(1), textAlign: 'center', paddingHorizontal: wp(10) }}>
                            Type recipe name to find delicious meals
                        </Text>
                    </View>
                ) : isLoading ? (
                    <View className='mx-4'>
                        <Text style={{ fontSize: hp(2), color: colors.textSecondary, marginBottom: hp(2) }}>
                            Searching...
                        </Text>
                    </View>
                ) : searchResults && searchResults.length > 0 ? (
                    <View className='mx-4'>
                        <Text style={{ fontSize: hp(2), color: colors.textSecondary, marginBottom: hp(2) }}>
                            Found {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'}
                        </Text>
                        <View className='flex-row flex-wrap justify-between'>
                            {searchResults.map((recipe, index) => (
                                <SearchResultCard
                                    key={recipe.idMeal}
                                    item={recipe}
                                    index={index}
                                    navigation={navigation}
                                />
                            ))}
                        </View>
                    </View>
                ) : (
                    <View className='flex-1 justify-center items-center' style={{ marginTop: hp(10) }}>
                        <Text style={{ fontSize: hp(2.5), fontWeight: '600', color: colors.textPrimary }}>
                            No Results Found
                        </Text>
                        <Text style={{ fontSize: hp(1.8), color: colors.textSecondary, marginTop: hp(1), textAlign: 'center', paddingHorizontal: wp(10) }}>
                            Try searching for something else
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

interface SearchResultCardProps {
    item: Recipe;
    index: number;
    navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SearchResultCard = ({ item, index, navigation }: SearchResultCardProps) => {
    const { colors, theme } = useTheme();
    const { isFavorite, toggleFavorite } = useFavorites();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;
    const heartScale = useRef(new Animated.Value(1)).current;
    const [favorited, setFavorited] = useState(isFavorite(item.idMeal));

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

    useEffect(() => {
        setFavorited(isFavorite(item.idMeal));
    }, [isFavorite, item.idMeal]);

    const opacity = animatedValue;
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    const handlePress = () => {
        navigation.navigate('MealDetail', { mealId: item.idMeal });
    };

    const handleFavoritePress = () => {
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

        toggleFavorite(item);
        setFavorited(!favorited);
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

                {/* Favorite Heart Icon */}
                <TouchableOpacity
                    onPress={handleFavoritePress}
                    className='absolute top-2 right-2 p-2 rounded-full'
                    style={{
                        backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                        <Heart
                            size={hp(2.5)}
                            color={favorited ? '#EF4444' : colors.textSecondary}
                            fill={favorited ? '#EF4444' : 'transparent'}
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

export default SearchScreen
