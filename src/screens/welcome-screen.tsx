import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { ChefHat, Sparkles, ArrowRight, Pizza, Coffee, Apple, Cake } from 'lucide-react-native';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>()
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);
  const imageScale = useSharedValue(0.8);
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);
  const sparkle3 = useSharedValue(0);
  const food1 = useSharedValue(0);
  const food2 = useSharedValue(0);
  const food3 = useSharedValue(0);
  const food4 = useSharedValue(0);

  useEffect(() => {
    // Ring animations
    ring1.value = 0
    ring2.value = 0
    setTimeout(() => ring1.value = withSpring(ring1.value + hp(5), { damping: 15 }), 100);
    setTimeout(() => ring2.value = withSpring(ring2.value + hp(6), { damping: 15 }), 200);

    // Image scale animation
    imageScale.value = withSpring(1, { damping: 12 });

    // Sparkle animations
    sparkle1.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    sparkle2.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    sparkle3.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Food icon animations
    food1.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    food2.value = withRepeat(
      withSequence(
        withTiming(-18, { duration: 3500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    food3.value = withRepeat(
      withSequence(
        withTiming(-22, { duration: 2800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    food4.value = withRepeat(
      withSequence(
        withTiming(-16, { duration: 3200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [])

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }]
    };
  });

  const sparkle1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sparkle1.value }]
    };
  });

  const sparkle2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sparkle2.value }]
    };
  });

  const sparkle3Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sparkle3.value }]
    };
  });

  const food1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: food1.value }]
    };
  });

  const food2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: food2.value }]
    };
  });

  const food3Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: food3.value }]
    };
  });

  const food4Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: food4.value }]
    };
  });

  const handleGetStarted = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View className='flex-1' style={{ backgroundColor: '#F59E0B' }}>
      <StatusBar barStyle={'light-content'} />

      {/* Decorative Circles Background */}
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <View style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: 'rgba(251, 191, 36, 0.3)'
        }} />
        <View style={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 250,
          height: 250,
          borderRadius: 125,
          backgroundColor: 'rgba(245, 158, 11, 0.4)'
        }} />
        <View style={{
          position: 'absolute',
          top: hp(30),
          left: -30,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }} />
      </View>

      <View className='flex-1 items-center justify-center px-8'>
        {/* Floating Sparkles */}
        <Animated.View style={[sparkle1Style, { position: 'absolute', top: hp(15), left: wp(15) }]}>
          <Sparkles size={24} color="rgba(255, 255, 255, 0.6)" />
        </Animated.View>
        <Animated.View style={[sparkle2Style, { position: 'absolute', top: hp(20), right: wp(20) }]}>
          <Sparkles size={20} color="rgba(255, 255, 255, 0.5)" />
        </Animated.View>
        <Animated.View style={[sparkle3Style, { position: 'absolute', top: hp(35), right: wp(15) }]}>
          <Sparkles size={26} color="rgba(255, 255, 255, 0.6)" />
        </Animated.View>

        {/* Floating Food Icons */}
        <Animated.View style={[food1Style, { position: 'absolute', top: hp(25), left: wp(10), opacity: 0.7 }]}>
          <Pizza size={32} color="rgba(255, 255, 255, 0.8)" />
        </Animated.View>
        <Animated.View style={[food2Style, { position: 'absolute', top: hp(40), right: wp(12), opacity: 0.6 }]}>
          <Coffee size={28} color="rgba(255, 255, 255, 0.7)" />
        </Animated.View>
        <Animated.View style={[food3Style, { position: 'absolute', bottom: hp(30), left: wp(8), opacity: 0.65 }]}>
          <Apple size={30} color="rgba(255, 255, 255, 0.75)" />
        </Animated.View>
        <Animated.View style={[food4Style, { position: 'absolute', bottom: hp(35), right: wp(10), opacity: 0.7 }]}>
          <Cake size={26} color="rgba(255, 255, 255, 0.8)" />
        </Animated.View>

        {/* Animated Logo with Rings */}
        <View className='items-center mb-12'>
          <Animated.View
            className='rounded-full items-center justify-center'
            style={{ padding: ring2, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            <Animated.View
              className='rounded-full items-center justify-center'
              style={{ padding: ring1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Animated.View
                className='bg-white rounded-full items-center justify-center'
                style={[imageAnimatedStyle, { width: hp(22), height: hp(22) }]}
              >
                <Image
                  source={require('../../assets/images/welcome.png')}
                  style={{ width: hp(18), height: hp(18) }}
                  resizeMode="contain"
                />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>

        {/* Title Section - Enhanced */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(800).springify()}
          className='items-center mb-4'
        >
          <View className='flex-row items-center mb-2'>
            <ChefHat size={hp(4)} color="white" strokeWidth={2.5} />
            <Text
              className='font-bold text-white ml-2'
              style={{
                fontSize: hp(7),
                letterSpacing: 3,
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4
              }}
            >
              Mealify
            </Text>
          </View>
          <Text
            className='text-white/90 font-semibold text-center'
            style={{
              fontSize: hp(2.2),
              letterSpacing: 1.5,
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2
            }}
          >
            Discover Delicious Recipes
          </Text>
        </Animated.View>

        {/* Description */}
        <Animated.Text
          entering={FadeInDown.delay(600).duration(800).springify()}
          className='text-white/80 text-center mb-8 px-4'
          style={{ fontSize: hp(1.8), lineHeight: hp(2.8) }}
        >
          Explore thousands of recipes from around the world. Find your next favorite meal today!
        </Animated.Text>

        {/* Get Started Button */}
        <Animated.View
          entering={FadeInUp.delay(800).duration(800).springify()}
          className='w-full'
        >
          <TouchableOpacity
            onPress={handleGetStarted}
            activeOpacity={0.8}
            className='bg-white rounded-full py-4 px-8 flex-row items-center justify-center'
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text
              className='font-bold mr-2'
              style={{ fontSize: hp(2.2), color: '#F59E0B', letterSpacing: 1 }}
            >
              Get Started
            </Text>
            <ArrowRight size={hp(2.5)} color="#F59E0B" strokeWidth={3} />
          </TouchableOpacity>
        </Animated.View>

        {/* Footer Text */}
        <Animated.Text
          entering={FadeInUp.delay(1000).duration(800).springify()}
          className='text-white/60 text-center mt-8'
          style={{ fontSize: hp(1.6) }}
        >
          Your culinary journey starts here
        </Animated.Text>
      </View>
    </View>
  )
}

export default WelcomeScreen