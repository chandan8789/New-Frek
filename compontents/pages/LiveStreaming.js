import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const image = {
  uri: 'https://images.unsplash.com/photo-1528916451049-e5d097b61db2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlZWxzJTIwZ2lybHN8ZW58MHx8MHx8fDA%3D',
};

const MessSend = () => {
  return (
    <View style={styles.messageSend}>
      <View style={styles.startBorder}>
        <Image
          style={styles.startIcon}
          source={require('../images/star.png')}
        />
      </View>
      <View style={styles.sendingBorder}>
        <TextInput
          style={styles.input}
          placeholder='Type Message'
          placeholderTextColor="gray"
        />
        <Image
          style={styles.sendingIcon}
          source={require("../images/sendingmsg.png")}
        />
      </View>
    </View>
  );
};

const LiveStreaming = () => {
  const navigation = useNavigation();

  const backToHomePage = () => {
    navigation.navigate('Header');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.mainContainerLive}>
          <TouchableOpacity onPress={backToHomePage}>
            <Image source={require('../images/left-arrow.png')} />
          </TouchableOpacity>
          <Text style={styles.liveText}>Live Streaming</Text>
          <Image source={require('../images/video-recorder.png')} />
        </View>

        <MessSend />
      </ImageBackground>
    </View>
  );
};

export default LiveStreaming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainContainerLive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.05,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
    alignItems: 'center',
  },
  liveText: {
    fontSize: width * 0.06,
    fontWeight: '400',
    color: 'black',
  },
  messageSend: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height * 0.01,
    left: 0,
    right: 0,
    paddingHorizontal: width * 0.05,
  },
  startBorder: {
    height: height * 0.05,
    width: width * 0.11,
    justifyContent: 'center',
    borderRadius: width * 0.03,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  startIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  sendingBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.03,
    backgroundColor: 'white',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.03,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: 'black',
  },
  sendingIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginLeft: width * 0.02,
  },
});
