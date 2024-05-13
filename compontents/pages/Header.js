import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../pages/Carousel';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const Header = () => {

  const navigation = useNavigation();

  const handleImageClick = () => {
    navigation.navigate('Stream-Chat');
  };

  const handleAboutClick = () => {
    navigation.navigate('Profile');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={handleAboutClick}>
              <Image
                source={require('../images/profileImage.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.welcomHeader}>Welcome Back,</Text>
              <Text style={styles.nameHeader}>Chandan Sharma</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleImageClick}>
              <Image
                source={require('../images/msgicon.png')}
                style={styles.msgIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Carousel />
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
