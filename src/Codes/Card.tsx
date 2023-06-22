import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../assets/Data/Font';
import {COLORS} from '../assets/Data/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Redux/Store';
import {addShoes} from '../Redux/ShoesSlice';
interface Shoes {
  color: string;
  image: string;
  description: string;
  price: number;
  name: string;
  id: number;
}
interface Props {
  width: number;
  height: number;
  ShoesProp: Shoes;
  index: number;
}
const Card = ({width, height, ShoesProp, index}: Props) => {
  const shoesBuy = useSelector((state: RootState) => state.ShoesSlice);
  const dispatch = useDispatch();
  const {color, name, description, image, price} = ShoesProp;
  return (
    <View
      style={{marginHorizontal: 20, marginVertical: 10, width: width * 0.8}}>
      <View
        style={[
          {
            width: '100%',
            height: 300,
            backgroundColor: color,
          },
          styles.imageContainer,
        ]}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 200,
            height: 200,
            transform: [{rotate: '-20deg'}, {translateX: -10}],
          }}
          resizeMode={'contain'}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            width: 170,
            height: 30,
            opacity: 0.3,
            borderRadius: 10,
            backgroundColor: color,
            elevation: 5,
            transform: [
              {rotate: '-20deg'},
              {translateY: 50},
              {translateX: -10},
            ],
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.BOLD,
          marginTop: 20,
          fontSize: 15,
        }}>
        {name}
      </Text>
      <Text
        style={{
          fontFamily: FONT_FAMILY.REGULAR,
          marginTop: 20,
          color: 'grey',
          opacity: 0.5,
        }}>
        {description}
      </Text>
      <View style={styles.price_view}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.BOLD,
            fontSize: 15,
          }}>
          ${price}
        </Text>

        {shoesBuy[index]?.quantity === undefined ? (
          <Pressable
            style={styles.pressable}
            onPress={() => dispatch(addShoes({...ShoesProp, quantity: 1}))}>
            <Text style={{fontFamily: FONT_FAMILY.MEDIUM, fontSize: 12}}>
              ADD TO CART
            </Text>
          </Pressable>
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: COLORS.YELLOW,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/Images/check.png')}
              resizeMode={'contain'}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  pressable: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
export default Card;
