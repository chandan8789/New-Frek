import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import Footer from './Footer';
import { useIsFocused } from '@react-navigation/native';
import { getData, postDataWithToken } from '../service/mobileApi';
import mobile_siteConfig from '../service/mobile-site-config';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = SLIDER_WIDTH * 0.7;

function CarouselCardItem({ item, index, onDoublePress }) {
  const [lastPress, setLastPress] = useState(null);
  const DOUBLE_PRESS_DELAY = 300; // milliseconds
  const [isHeartVisible, setIsHeartVisible] = useState(false);
  const sizeAnimation = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    const time = new Date().getTime();

    if (lastPress && (time - lastPress) < DOUBLE_PRESS_DELAY) {
      // Double press detected
      console.log('Double Press Detected!');
      setIsHeartVisible(true);
      setTimeout(() => {
        setIsHeartVisible(false);
      }, 600);

      onDoublePress();
      Animated.sequence([
        Animated.timing(sizeAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(sizeAnimation, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),

      ]).start();

    } else {
      // Single press
      console.log('Single Press');
    }

    setLastPress(time);
  };

  return (
    <View
      style={[styles.cardCarousel, {
        backgroundColor: '#fff',
        paddingVertical: heightPercentageToDP(1.5),
        paddingHorizontal: widthPercentageToDP(3),
        borderRadius: heightPercentageToDP(3),
        overflow: 'hidden',
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
        shadowOpacity: 0.25, // iOS shadow opacity
        shadowRadius: 3.84, // iOS shadow radius
        elevation: 5, // Android shadow
      }]}
      key={index}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          borderRadius: heightPercentageToDP(2),
          overflow: 'hidden'
        }}
        onPress={() => { handlePress() }}>
        <Image
          resizeMode='cover'
          style={{
            width: '100%',
            height: heightPercentageToDP(50)
          }}
          source={item.avatar !== 'http://45.61.60.89:3000/public/images/1718965492683-default.png' ?
            { uri: item?.avatar }
            : require('../images/done.png')} />
      </TouchableOpacity>
      {isHeartVisible &&
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: sizeAnimation }],
          }}
        >

          <View style={{
            height: heightPercentageToDP(15),
            width: heightPercentageToDP(15),
          }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../images/heartfilled.png')} />
          </View>
        </Animated.View>
      }

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

  const getUserForMatches = async () => {
    try {
      const res = await getData(mobile_siteConfig.carousel);
      if (res?.feed) {
        setData(res.feed);
      } else {
        console.error('getUserForMatches Invalid response structure:', res);
      }
    } catch (error) {
      console.error('getUserForMatches Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUserForMatches();
  }, [isFocused]);

  const LikePerson = (item) => {
    console.log('item:::::', item)
    let req = {
      likedUserId: item.id
    }

    postDataWithToken(req, mobile_siteConfig.LIKE_USER)
      .then(r => {
        console.log('LikePerson ::', r);

      })
      .catch(error => {
        // Handle error
        console.error('LikePerson Error:', error);
      });
  }

  return (
    <Carousel
      data={data}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={widthPercentageToDP(80)}
      renderItem={({ item, index }) => (
        <CarouselCardItem
          item={item}
          index={index}
          onDoublePress={() => { LikePerson(item) }}
        />
      )}

    />
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardCarousel: {
    width: widthPercentageToDP(80),
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
    marginTop: heightPercentageToDP(2)
  },
  Adventures: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});
