import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postData} from '../service/mobileApi'; // Ensure this is correctly imported
import mobile_siteConfig from '../service/mobile-site-config';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Fill the required fields');
      return;
    }

    let request = {
      email: email,
      password: password,
    };

    try {
      console.log('handleLogin request:', request);
      const res = await postData(request, mobile_siteConfig.login);

      console.log('handleLogin response:', res);

      if (res?.message === 'Logged in successfully') {
        await AsyncStorage.setItem(
          mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
          res?.token,
        );
        var userDetail = JSON.stringify(res?.user);
        await AsyncStorage.setItem(mobile_siteConfig.USER_DETAIL, userDetail);
        await AsyncStorage.setItem(mobile_siteConfig.IS_LOGIN, 'TRUE');

        Alert.alert('Success', 'Logged in Successfully');
        navigation.navigate('Header');

        return;
      } else {
        Alert.alert('Error', res?.message || 'Login failed');
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <ImageBackground
      source={require('../images/background.jpg')}
      style={styles.backgroundImage}>
      <KeyboardAwareScrollView
        style={{backgroundColor: '#000000aa'}}
        keyboardShouldPersistTaps={'always'}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.welcomeBack}>Welcome Back,</Text>
              <Text style={styles.titlelgoin}>You have been Missed</Text>
              <Text style={styles.titlelgoin}>Login to Your Account</Text>
            </View>
            <View>
              <Image
                source={require('../images/figma.png')}
                style={styles.avatar}
              />
            </View>
          </View>

          <View style={{marginTop: 50}}>
            <Text style={styles.titleName}>Email</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder="Enter your Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.titleName}>Password</Text>
            <TextInput
              style={styles.inputEmail}
              placeholder="Enter your password"
              placeholderTextColor="white"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
              <Text style={styles.signupButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: 'white'}}>Don't have an account? </Text>
            <Text
              style={{color: 'rgba(0, 122, 255, 1)'}}
              onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: heightPercentageToDP('5%'),
    paddingHorizontal: widthPercentageToDP('5%'),
  },
  welcomeBack: {
    color: 'white',
    fontWeight: '400',
    marginTop: heightPercentageToDP('10%'),
    fontSize: heightPercentageToDP(2.4),
  },
  titlelgoin: {
    fontSize: heightPercentageToDP(2.5),
    fontWeight: '500',
    color: 'white',
  },
  avatar: {
    marginTop: heightPercentageToDP('10%'),
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('15%'),
  },
  titleName: {
    fontSize: heightPercentageToDP(2),
    color: 'white',
    marginTop: heightPercentageToDP('2%'),
  },
  inputEmail: {
    borderColor: 'white',
    marginTop: heightPercentageToDP('1%'),
    borderRadius: heightPercentageToDP('1%'),
    paddingLeft: heightPercentageToDP('2%'),
    borderWidth: heightPercentageToDP('0.1%'),
    fontSize: heightPercentageToDP(1.9),
    color: 'white', // Added color to make text visible
  },
  signupButton: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    borderRadius: heightPercentageToDP('1%'),
    paddingVertical: heightPercentageToDP('1.5%'),
    paddingHorizontal: widthPercentageToDP('1%'),
    marginTop: heightPercentageToDP('3%'),
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: heightPercentageToDP(1.9),
  },
  backgroundImage: {
    height: heightPercentageToDP('100%'),
  },
});
