import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'
import { Category } from '../api/meals.service';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/theme-context';
import { CachedImage } from './cached-image';

type categoryProps = {
  categories: Category[],
  activeCategory: string,
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

const Categories = ({ categories, activeCategory, setActiveCategory }: categoryProps) => {
  const { colors, theme } = useTheme();

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(4) }}>
        {categories.map((category, index) => {
          let isActive = category.strCategory == activeCategory
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.strCategory)}
              className='flex items-center space-y-1'
              style={{ marginRight: wp(4), width: hp(8) }}>
              <View
                className='rounded-full p-[6px]'
                style={{ backgroundColor: isActive ? colors.primary : (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)') }}
              >
                <CachedImage
                  uri={category.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6), borderRadius: hp(3) }}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.6), color: colors.textSecondary, textAlign: 'center' }}
                numberOfLines={2}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}

export default Categories