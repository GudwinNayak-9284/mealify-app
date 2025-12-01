import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation'
import { useQuery } from '@tanstack/react-query'
import { getMealById } from '../api/meals.service'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ArrowLeft, Clock, MapPin } from 'lucide-react-native'
import { useTheme } from '../context/theme-context'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetail'>

const MealDetailScreen = ({ route, navigation }: Props) => {
    const { mealId } = route.params
    const { colors, theme } = useTheme()

    const { data: meal, isLoading, error } = useQuery({
        queryKey: ['meal', mealId],
        queryFn: () => getMealById(mealId)
    })

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        )
    }

    if (error || !meal) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: hp(2), color: colors.textSecondary }}>Failed to load meal details</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <Animated.View entering={FadeIn.duration(500)} style={{ position: 'relative' }}>
                    <Image
                        source={{ uri: meal.strMealThumb }}
                        style={{
                            width: wp(100),
                            height: hp(40),
                        }}
                        resizeMode='cover'
                    />
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            position: 'absolute',
                            top: hp(6),
                            left: wp(4),
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 20,
                            padding: 10,
                        }}
                    >
                        <ArrowLeft size={hp(3)} color='#000' />
                    </TouchableOpacity>
                </Animated.View>

                {/* Content */}
                <View style={{ paddingHorizontal: wp(4), marginTop: -hp(3), backgroundColor: colors.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    {/* Title and Info */}
                    <Animated.View entering={FadeInDown.duration(500).delay(200)} style={{ paddingTop: hp(3) }}>
                        <Text style={{ fontSize: hp(3.5), fontWeight: 'bold', color: colors.textPrimary, marginBottom: hp(1) }}>
                            {meal.strMeal}
                        </Text>

                        <View style={{ flexDirection: 'row', gap: wp(4), marginBottom: hp(3) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <MapPin size={hp(2)} color={colors.primary} />
                                <Text style={{ fontSize: hp(1.8), color: colors.textSecondary }}>
                                    {meal.strArea}
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: wp(3),
                                    paddingVertical: hp(0.5),
                                    backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)',
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={{ fontSize: hp(1.6), color: colors.primary, fontWeight: '600' }}>
                                    {meal.strCategory}
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Ingredients */}
                    <Animated.View entering={FadeInDown.duration(500).delay(400)}>
                        <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', color: colors.textPrimary, marginBottom: hp(2) }}>
                            Ingredients
                        </Text>
                        <View
                            style={{
                                backgroundColor: colors.surface,
                                borderRadius: 20,
                                padding: wp(4),
                                marginBottom: hp(3),
                            }}
                        >
                            {meal.ingredients.map((ingredient, index) => (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingVertical: hp(1),
                                        borderBottomWidth: index < meal.ingredients.length - 1 ? 1 : 0,
                                        borderBottomColor: colors.border,
                                    }}
                                >
                                    <Text style={{ fontSize: hp(1.8), color: colors.textPrimary, flex: 1 }}>
                                        • {ingredient.name}
                                    </Text>
                                    <Text style={{ fontSize: hp(1.8), color: colors.textSecondary, fontWeight: '600' }}>
                                        {ingredient.measure}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Instructions */}
                    <Animated.View entering={FadeInDown.duration(500).delay(600)} style={{ marginBottom: hp(4) }}>
                        <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', color: colors.textPrimary, marginBottom: hp(2) }}>
                            Instructions
                        </Text>
                        <Text style={{ fontSize: hp(1.9), color: colors.textSecondary, lineHeight: hp(3), textAlign: 'justify' }}>
                            {meal.strInstructions}
                        </Text>
                    </Animated.View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MealDetailScreen
