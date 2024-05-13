import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';

const LogoComponent = () => {
const navigation = useNavigation();
  const [rotation] = useState(new Animated.Value(0));
  const [zoom] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: 360,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(zoom, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('Signup'); 
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../images/gogo.png")}
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
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
  },
});

export default LogoComponent;