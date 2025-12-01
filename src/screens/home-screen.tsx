import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { getMealCategories } from '../api/meals.service';
import Categories from '../components/categories';
import CategoriesSkeleton from '../components/categories-skeleton';
import Recipes from '../components/recipes';
import { useTheme } from '../context/theme-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../navigation';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const { theme, colors } = useTheme();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const { data, isLoading } = useQuery({
    queryKey: ['meal-categories'],
    queryFn: getMealCategories
  })

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(3) }}
        className='pt-6'
      >
        {/* Header with avatar */}
        <View className='mx-4 flex-row justify-between items-center' style={{ marginBottom: hp(2) }}>
          <View className='flex-row items-center'>
            <View
              className='rounded-full items-center justify-center mr-3'
              style={{
                width: hp(5.5),
                height: hp(5.5),
                backgroundColor: colors.primary,
              }}
            >
              <Text style={{ fontSize: hp(2.5), fontWeight: '700', color: '#FFFFFF' }}>
                G
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: hp(1.7), fontWeight: 'bold', color: colors.textPrimary }}>
                Hello Gudwin,
              </Text>
              <Text style={{ fontSize: hp(1.5), color: colors.textSecondary }}>
                What's cooking today?
              </Text>
            </View>
          </View>
        </View>

        {/* Search bar - Navigate to Search screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          className='mx-4 flex-row items-center rounded-full p-[6px]'
          style={{ marginBottom: hp(3), backgroundColor: colors.searchBar }}
          activeOpacity={0.7}
        >
          <View className='pl-3 flex-1'>
            <Text style={{ fontSize: hp(2), color: colors.textSecondary }}>
              Search any recipe
            </Text>
          </View>
          <View className='rounded-full p-3' style={{ backgroundColor: colors.surface }}>
            <Search size={hp(2.5)} color={colors.textSecondary} strokeWidth={3} />
          </View>
        </TouchableOpacity>

        {/* Categories section */}
        <View className=''>
          {isLoading ? (
            <CategoriesSkeleton />
          ) : (
            data && data.length > 0 && <Categories
              categories={data}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>
        <View>
          <Recipes activeCategory={activeCategory} />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen