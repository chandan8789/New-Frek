import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import Footer from './Footer';
import {useIsFocused} from '@react-navigation/native';
import {getData} from '../service/mobileApi';
import mobile_siteConfig from '../service/mobile-site-config';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.7;

function carouselCardItem({item, index}) {
  return (
    <View style={styles.cardCarousel} key={index}>
      <TouchableOpacity onPress={() => {}}>
        <Image style={styles.images} source={{uri: item?.avatar}} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.Adventures}>{item?.name}</Text>
        <Text style={styles.Adventures}>({item?.age})</Text>
      </View>
    </View>
  );
}

const CarouselComponent = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getData(mobile_siteConfig.carousel);
      console.log('Response:', res);
      if (res?.feed) {
        setData(res.feed);
      } else {
        console.error('Invalid response structure:', res);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={carouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardCarousel: {
    width: ITEM_WIDTH,
  },
  images: {
    height: '85%',
    borderRadius: 10,
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  Adventures: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});
