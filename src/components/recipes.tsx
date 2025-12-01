import { StyleSheet, Text, View, Animated, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { getMealsByCategory, Recipe } from '../api/meals.service';
import MasonryList from '@react-native-seoul/masonry-list';
import { useTheme } from '../context/theme-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { CachedImage } from './cached-image';
import RecipesSkeleton from './recipes-skeleton';
import { Heart } from 'lucide-react-native';
import { useFavorites } from '../context/favorites-context';

interface RecipesProps {
  activeCategory: string;
}

const Recipes = ({ activeCategory }: RecipesProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['meals', activeCategory],
    queryFn: () => getMealsByCategory(activeCategory)
  });

  return (
    <>
      {isLoading ? (
        <RecipesSkeleton />
      ) : (
        <View className='mx-4 space-y-3'>
          <Text style={{ fontSize: hp(3), fontWeight: '600', color: colors.textPrimary, marginBottom: hp(2) }}>
            Recipes
          </Text>
          {recipes && recipes.length > 0 ? (
            <MasonryList
              data={recipes}
              keyExtractor={(item: Recipe): string => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, i }: { item: any; i: number }) => (
                <RecipeCard item={item as Recipe} index={i} navigation={navigation} />
              )}
              onEndReachedThreshold={0.1}
            />
          ) : (
            <View className='flex-1 justify-center items-center' style={{ height: hp(40) }}>
              <Text style={{ fontSize: hp(2), color: colors.textSecondary }}>No recipes found</Text>
            </View>
          )}
        </View>
      )}
    </>
  )
}

interface RecipeCardProps {
  item: Recipe;
  index: number;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RecipeCard = ({ item, index, navigation }: RecipeCardProps) => {
  const { colors, theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const heartScale = useRef(new Animated.Value(1)).current;
  const [favorited, setFavorited] = useState(isFavorite(item.idMeal));

  // Determine card height based on index for masonry effect
  const isEven = index % 2 === 0;
  const cardHeight = isEven ? hp(25) : hp(30);

  useEffect(() => {
    // Staggered animation based on index
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        delay: index * 100, // Stagger by 100ms per item
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

  // Update favorited state when favorites change
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
    // Animate heart
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
        paddingRight: isEven ? wp(4) : wp(0),
      }}
    >
      <Pressable
        onPress={handlePress}
        className='mb-4 rounded-3xl overflow-hidden'
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

export default Recipes

const styles = StyleSheet.create({})