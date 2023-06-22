import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/Data/Colors';
import {FONT_FAMILY} from '../assets/Data/Font';
import SHOES from '../assets/DataShoes/shoes.json';
import Card from './Card';

const {width, height} = Dimensions.get('screen');
const ProductCard = () => {
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute'}}>
        <View style={styles.circle} />
      </View>

      <Image
        source={require('../assets/Images/nike.png')}
        style={{width: 50, height: 50, marginLeft: 20}}
        resizeMode={'contain'}
      />
      <Text
        style={{
          fontFamily: FONT_FAMILY.BOLD,
          fontSize: 18,
          marginBottom: 20,
          marginLeft: 20,
        }}>
        Our Products
      </Text>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {SHOES.shoes.map((s, i) => {
          return (
            <Card
              key={i}
              width={width * 0.8}
              height={height * 0.7}
              ShoesProp={s}
              index={i}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: height * 0.7,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    overflow: 'hidden',
  },
  circle: {
    width: 220,
    height: 200,
    backgroundColor: COLORS.YELLOW,
    borderRadius: 200,
    transform: [{translateX: -120}, {translateY: -70}],
  },
});
export default ProductCard;
