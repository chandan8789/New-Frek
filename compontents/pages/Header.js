import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../pages/Carousel';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import mobile_siteConfig from '../service/mobile-site-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';
const {width, height} = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // console.log(mobile_siteConfig.MOB_ACCESS_TOKEN_KEY);

    const getUserDetails = async () => {
      let value = await AsyncStorage.getItem(mobile_siteConfig.USER_DETAIL);
      let value1 = await AsyncStorage.getItem(mobile_siteConfig.IS_LOGIN);
      let value2 = await AsyncStorage.getItem(
        mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
      );
      console.log('ppppppppppppppppppppp', value1, value2);

      if (value !== null) {
        console.log('value::::::::::', value);
        setUserData(JSON.parse(value));
      }
    };
    getUserDetails();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={{uri: userData?.avatar}} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.welcomHeader}>Welcome Back,</Text>
              <Text style={styles.nameHeader}>{userData?.name}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Stream-Chat')}>
              <Image
                source={require('../images/msgicon.png')}
                style={styles.msgIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Carousel />

      <Footer />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: height * 0.03, // 3% of screen height
    paddingHorizontal: width * 0.05, // 5% of screen width
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: heightPercentageToDP('7%'),
    width: widthPercentageToDP('14%'),
    borderRadius: heightPercentageToDP(50),
  },
  textContainer: {
    marginLeft: width * 0.04,
  },
  welcomHeader: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: 'black',
  },
  nameHeader: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: 'black',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgIcon: {
    width: width * 0.08, // 8% of screen width
    height: width * 0.08, // 8% of screen width
  },
});
