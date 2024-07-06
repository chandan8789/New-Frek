import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import mobile_siteConfig from '../service/mobile-site-config';

const LogoComponent = () => {
  const navigation = useNavigation();
  const [rotation] = useState(new Animated.Value(0));
  const [zoom] = useState(new Animated.Value(1));

  const handleNavigation = async () => {
    var val = await AsyncStorage.getItem(
      mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
    );
    var isLogin = await AsyncStorage.getItem(mobile_siteConfig.IS_LOGIN);
    // navigation.navigate('Signup');
    console.log('pppppppppppppppp1::', isLogin, val);
    // console.log('val::::::', val, typeof val);
    if (val !== null && isLogin == 'TRUE') {
      navigation.navigate('Header');
    } else {
      navigation.navigate('Signup');
    }
  };

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: 360,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(zoom, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      });
    });
    handleNavigation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../images/gogo.png')}
        style={[
          styles.logo,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {
                scale: zoom,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default LogoComponent;
