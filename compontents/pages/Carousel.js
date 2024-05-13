import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import Footer from './Footer';
import {useNavigation} from '@react-navigation/native';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.70;

const sliderImage = [
  {
    imgUrl:
      'https://images.unsplash.com/photo-1668469739030-007d6b74d82e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1576940769468-696956ae420f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1646411907458-36113d333a82?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1661508769773-20d55ab42b9c?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1668469739030-007d6b74d82e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1576940769468-696956ae420f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1646411907458-36113d333a82?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1661508769773-20d55ab42b9c?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1668469739030-007d6b74d82e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1576940769468-696956ae420f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1646411907458-36113d333a82?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1661508769773-20d55ab42b9c?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1668469739030-007d6b74d82e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1576940769468-696956ae420f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1646411907458-36113d333a82?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1661508769773-20d55ab42b9c?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1668469739030-007d6b74d82e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1576940769468-696956ae420f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVlbHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1646411907458-36113d333a82?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1661508769773-20d55ab42b9c?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export function carouselCardItem({item, index}) {
  //   const navigation = useNavigation();
  //   const backToHomePage = () => {
  //     navigation.navigate('Live-Streaming');
  //   };
  return (
    <View style={styles.cardCarousel} key={index}>
      <TouchableOpacity onPress={() => {}}>
        <Image style={styles.images} source={{uri: item.imgUrl}} />
      </TouchableOpacity>
      <Text style={styles.Adventures}>(Adventures...)</Text>
    </View>
  );
}

const CarouselComponent = () => {
  // const navigation = useNavigation();
  // const backToHomePage = () => {
  //   navigation.navigate('Live-Streaming');
  // };
  return (
    <>
      <View style={styles.container}>
        {/* <TapGestureHandler
          onHandlerStateChange={event => {
            if (event.nativeEvent.state === State.ACTIVE) {
              backToHomePage();
            }
          }}> */}
          <Carousel
            data={sliderImage}
            renderItem={carouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        {/* </TapGestureHandler> */}
      </View>
      <Footer />
    </>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"white"
  },
  cardCarousel: {
    width: ITEM_WIDTH,
  },
  images: {
    height: 400,
    borderRadius: 10,
    marginTop: 20,
  },
  Adventures: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    color: 'black',
  },
});
