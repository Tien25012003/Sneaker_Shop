import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FONT_FAMILY} from '../assets/Data/Font';
import {styles} from '../Codes/ProductCard';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Redux/Store';
import {COLORS} from '../assets/Data/Colors';
import {ZoomIn, FadeInRight, ZoomOut} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {
  decreaseQuantity,
  deleteShoes,
  increaseQuantity,
} from '../Redux/ShoesSlice';
interface Shoes {
  color: string;
  image: string;
  description: string;
  price: number;
  name: string;
  id: number;
  quantity: number;
}
const {width, height} = Dimensions.get('screen');
const BuyCart = () => {
  const [total, setTotal] = useState(0);
  const shoesBuy = useSelector((state: RootState) => state.ShoesSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const tmp = shoesBuy.reduce((totalVal, curVal) => {
      return (totalVal = totalVal + curVal.price * curVal.quantity);
    }, 0);
    setTotal(tmp);
  }, [shoesBuy]);
  return (
    <View style={[styles.container, {marginBottom: 50}]}>
      <View style={{position: 'absolute'}}>
        <View style={styles.circle} />
      </View>
      <Image
        source={require('../assets/Images/nike.png')}
        style={{width: 50, height: 50, marginLeft: 20}}
        resizeMode={'contain'}
      />
      <View style={styles_cart.row}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.BOLD,
            fontSize: 18,
          }}>
          Your cart
        </Text>
        <Text
          style={{
            fontFamily: FONT_FAMILY.BOLD,
            fontSize: 18,
          }}>
          ${total.toFixed(2)}
        </Text>
      </View>
      {shoesBuy.length === 0 ? (
        <Text
          style={{
            fontFamily: FONT_FAMILY.REGULAR,
            marginTop: 20,
            marginHorizontal: 10,
          }}>
          Your cart is empty
        </Text>
      ) : (
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{height: '100%'}}>
          {shoesBuy.map((s, i) => {
            return (
              <Animated.View
                key={i}
                style={[styles_cart.row, {marginTop: 40}]}
                exiting={ZoomOut}>
                <Animated.View
                  entering={ZoomIn}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: s.color,
                  }}>
                  <View style={{position: 'absolute'}}>
                    <Image
                      source={{uri: s.image}}
                      style={{
                        width: 130,
                        height: 100,
                        transform: [{rotate: '-20deg'}, {translateY: -20}],
                      }}
                    />
                  </View>
                </Animated.View>
                <View style={{width: '50%'}}>
                  <Animated.Text
                    entering={FadeInRight.delay(500)}
                    style={{
                      fontFamily: FONT_FAMILY.MEDIUM,
                      fontSize: 11,
                      flexWrap: 'wrap',
                    }}>
                    {s.name}
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInRight.delay(700)}
                    style={{
                      fontFamily: FONT_FAMILY.BOLD,
                      fontSize: 18,
                      marginTop: 10,
                    }}>
                    ${s.price}
                  </Animated.Text>
                  <Animated.View
                    style={[styles_cart.row, {marginTop: 10}]}
                    entering={FadeInRight.delay(800)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '50%',
                      }}>
                      <Pressable
                        style={styles_cart.small_circle}
                        onPress={() => dispatch(decreaseQuantity(i))}>
                        <Image
                          source={require('../assets/Images/minus.png')}
                          style={{width: 10, height: 10}}
                        />
                      </Pressable>
                      <Text style={{marginHorizontal: 10}}>{s.quantity}</Text>
                      <Pressable
                        style={styles_cart.small_circle}
                        onPress={() => dispatch(increaseQuantity(i))}>
                        <Image
                          source={require('../assets/Images/plus.png')}
                          style={{width: 10, height: 10}}
                        />
                      </Pressable>
                    </View>
                    <Pressable
                      style={[
                        styles_cart.small_circle,
                        {backgroundColor: COLORS.YELLOW, opacity: 1},
                      ]}
                      onPress={() => dispatch(deleteShoes(s.id))}>
                      <Image
                        source={require('../assets/Images/trash.png')}
                        style={{width: 15, height: 15}}
                      />
                    </Pressable>
                  </Animated.View>
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
const styles_cart = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  small_circle: {
    width: 30,
    height: 30,
    backgroundColor: 'grey',
    opacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
export default BuyCart;
