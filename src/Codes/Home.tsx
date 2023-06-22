import {View, Text, Dimensions, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../assets/Data/Colors';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import ProductCard from './ProductCard';
import BuyCart from './BuyCart';
const {width, height} = Dimensions.get('screen');
const Home = () => {
  const animatedValue = useSharedValue(1);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const path = useAnimatedProps(() => {
    return {
      d: `M 0 0 C 0 1 ${animatedValue.value} -1 2 0`,
    };
  });
  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(-1, {duration: 10000}),
      -1,
      true,
    );
  }, [animatedValue]);
  return (
    <View>
      <View style={{position: 'absolute'}}>
        <Svg height={height} width={width} viewBox="6 -0.7 1 1 ">
          {/* <Path d="M 0 0 C 0 1 2 -1 2 0" fill={COLORS.BLACK} /> */}
          <AnimatedPath animatedProps={path} fill={COLORS.YELLOW} scale={6} />
        </Svg>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <ProductCard />
        <BuyCart />
      </ScrollView>
    </View>
  );
};

export default Home;
