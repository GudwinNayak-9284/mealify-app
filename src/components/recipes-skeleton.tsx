import { View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useTheme } from '../context/theme-context';

const RecipesSkeleton = () => {
    const { colors, theme } = useTheme();
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

    // Create 6 skeleton items (3 rows x 2 columns)
    const skeletonItems = Array.from({ length: 6 });

    return (
        <View className='mx-4 space-y-3'>
            {/* Title skeleton */}
            <Animated.View
                style={[animatedStyle, {
                    width: wp(30),
                    height: hp(3),
                    marginBottom: hp(2),
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 8
                }]}
            />

            {/* Recipe cards grid */}
            <View className='flex-row flex-wrap justify-between'>
                {skeletonItems.map((_, index) => {
                    const isEven = index % 2 === 0;
                    const cardHeight = isEven ? hp(25) : hp(30);

                    return (
                        <View
                            key={index}
                            style={{
                                width: '48%',
                                marginBottom: hp(2),
                            }}
                        >
                            <Animated.View
                                style={[
                                    animatedStyle,
                                    {
                                        width: '100%',
                                        height: cardHeight,
                                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                        borderRadius: 24,
                                    }
                                ]}
                            >
                                {/* Title placeholder at bottom */}
                                <View
                                    className='absolute bottom-0 left-0 right-0 p-3 rounded-b-3xl'
                                    style={{ backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.9)' }}
                                >
                                    <Animated.View
                                        style={[
                                            animatedStyle,
                                            {
                                                width: '80%',
                                                height: hp(1.8),
                                                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                                                borderRadius: 4,
                                                alignSelf: 'center'
                                            }
                                        ]}
                                    />
                                </View>
                            </Animated.View>
                        </View>
                    );
                })}
            </View>
        </View>
    )
}

export default RecipesSkeleton
