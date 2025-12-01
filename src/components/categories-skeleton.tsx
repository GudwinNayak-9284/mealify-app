import { View, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const CategoriesSkeleton = () => {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 800 }),
                withTiming(0.3, { duration: 800 })
            ),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    // Create 6 skeleton items
    const skeletonItems = Array.from({ length: 6 });

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: wp(4) }}>
                {skeletonItems.map((_, index) => (
                    <View
                        key={index}
                        className='flex items-center space-y-1'
                        style={{ marginRight: wp(4), width: hp(8) }}>
                        <Animated.View
                            style={[animatedStyle]}
                            className='rounded-full bg-gray-300'
                        >
                            <View style={{ width: hp(7.2), height: hp(7.2) }} className='rounded-full' />
                        </Animated.View>
                        <Animated.View
                            style={[animatedStyle, { width: hp(6), height: hp(1.6), marginTop: hp(0.5) }]}
                            className='bg-gray-300 rounded'
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default CategoriesSkeleton
