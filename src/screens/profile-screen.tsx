import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { User, Moon, Sun, Heart, ChefHat, Info } from 'lucide-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '../context/theme-context';
import { useFavorites } from '../context/favorites-context';

const ProfileScreen = () => {
    const { theme, colors, toggleTheme } = useTheme();
    const { favorites } = useFavorites();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(3) }}
            >
                {/* Header */}
                <View className='mx-4' style={{ marginTop: hp(6), marginBottom: hp(3) }}>
                    <Text style={{ fontSize: hp(3.5), fontWeight: '700', color: colors.textPrimary }}>
                        Profile
                    </Text>
                </View>

                {/* User Info Card */}
                <View className='mx-4 rounded-3xl p-6' style={{ backgroundColor: colors.surface, marginBottom: hp(3) }}>
                    <View className='items-center'>
                        {/* Avatar */}
                        <View
                            className='rounded-full items-center justify-center'
                            style={{
                                width: hp(12),
                                height: hp(12),
                                backgroundColor: colors.primary,
                                marginBottom: hp(2)
                            }}
                        >
                            <Text style={{ fontSize: hp(5), fontWeight: '700', color: '#FFFFFF' }}>
                                G
                            </Text>
                        </View>

                        <Text style={{ fontSize: hp(2.5), fontWeight: '700', color: colors.textPrimary }}>
                            Gudwin Nayak
                        </Text>
                        <Text style={{ fontSize: hp(1.8), color: colors.textSecondary, marginTop: hp(0.5) }}>
                            Food Enthusiast
                        </Text>
                    </View>
                </View>

                {/* Statistics */}
                <View className='mx-4' style={{ marginBottom: hp(3) }}>
                    <Text style={{ fontSize: hp(2.2), fontWeight: '600', color: colors.textPrimary, marginBottom: hp(2) }}>
                        Statistics
                    </Text>

                    <View className='flex-row justify-between'>
                        {/* Favorites Count */}
                        <View
                            className='rounded-2xl p-4 items-center'
                            style={{ backgroundColor: colors.surface, width: '48%' }}
                        >
                            <View
                                className='rounded-full p-3 mb-2'
                                style={{ backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)' }}
                            >
                                <Heart size={hp(3)} color='#EF4444' fill='#EF4444' />
                            </View>
                            <Text style={{ fontSize: hp(3), fontWeight: '700', color: colors.textPrimary }}>
                                {favorites.length}
                            </Text>
                            <Text style={{ fontSize: hp(1.6), color: colors.textSecondary, marginTop: hp(0.5) }}>
                                Favorites
                            </Text>
                        </View>

                        {/* Recipes Explored */}
                        <View
                            className='rounded-2xl p-4 items-center'
                            style={{ backgroundColor: colors.surface, width: '48%' }}
                        >
                            <View
                                className='rounded-full p-3 mb-2'
                                style={{ backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)' }}
                            >
                                <ChefHat size={hp(3)} color={colors.primary} />
                            </View>
                            <Text style={{ fontSize: hp(3), fontWeight: '700', color: colors.textPrimary }}>
                                12
                            </Text>
                            <Text style={{ fontSize: hp(1.6), color: colors.textSecondary, marginTop: hp(0.5) }}>
                                Explored
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Settings */}
                <View className='mx-4' style={{ marginBottom: hp(3) }}>
                    <Text style={{ fontSize: hp(2.2), fontWeight: '600', color: colors.textPrimary, marginBottom: hp(2) }}>
                        Settings
                    </Text>

                    {/* Theme Toggle */}
                    <TouchableOpacity
                        onPress={toggleTheme}
                        className='flex-row items-center justify-between rounded-2xl p-4'
                        style={{ backgroundColor: colors.surface, marginBottom: hp(2) }}
                    >
                        <View className='flex-row items-center'>
                            <View
                                className='rounded-full p-2 mr-3'
                                style={{ backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)' }}
                            >
                                {theme === 'dark' ? (
                                    <Sun size={hp(2.5)} color={colors.primary} />
                                ) : (
                                    <Moon size={hp(2.5)} color={colors.textSecondary} />
                                )}
                            </View>
                            <View>
                                <Text style={{ fontSize: hp(2), fontWeight: '600', color: colors.textPrimary }}>
                                    Appearance
                                </Text>
                                <Text style={{ fontSize: hp(1.6), color: colors.textSecondary, marginTop: hp(0.3) }}>
                                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                </Text>
                            </View>
                        </View>
                        <View
                            className='rounded-full px-3 py-1'
                            style={{ backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)' }}
                        >
                            <Text style={{ fontSize: hp(1.6), fontWeight: '600', color: colors.primary }}>
                                {theme === 'dark' ? 'Dark' : 'Light'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* About */}
                <View className='mx-4'>
                    <Text style={{ fontSize: hp(2.2), fontWeight: '600', color: colors.textPrimary, marginBottom: hp(2) }}>
                        About
                    </Text>

                    <View
                        className='rounded-2xl p-4'
                        style={{ backgroundColor: colors.surface }}
                    >
                        <View className='flex-row items-center mb-2'>
                            <Info size={hp(2.5)} color={colors.primary} />
                            <Text style={{ fontSize: hp(2), fontWeight: '600', color: colors.textPrimary, marginLeft: wp(3) }}>
                                Mealify
                            </Text>
                        </View>
                        <Text style={{ fontSize: hp(1.6), color: colors.textSecondary, lineHeight: hp(2.2) }}>
                            Discover and save your favorite recipes from around the world. Built with React Native.
                        </Text>
                        <Text style={{ fontSize: hp(1.4), color: colors.textSecondary, marginTop: hp(2) }}>
                            Version 1.0.0
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen
