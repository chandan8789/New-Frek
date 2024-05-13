import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Signup = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        'https://frek-dating-2.onrender.com/auth/signup',
        {
          name: name,
          email: email,
          dob: dob,
          gender: selectedValue,
          password: password,
          confirmPassword: confirmPassword,
        },

        navigation.navigate('Question'),
      );
      // console.log(response.data);

      if (response.data && response.data === 'User created Successfully') {
        Alert.alert('Success', 'User successfully signed up');
        navigation.navigate('Login');
        setName('');
        setEmail('');
        setDob('');
        setGender('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  return (
    <ImageBackground
      source={require('../images/background.jpg')}
      style={styles.backgroundImage}>
      <ScrollView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '2%',
            }}>
            <View>
              <Text style={styles.welcome}>Welcome,</Text>
              <Text style={styles.titles}>Enter Your Details to</Text>
              <Text style={styles.titles}>Create Account</Text>
            </View>
            <View>
              <Image
                source={require('../images/figma.png')}
                style={styles.avatar}
              />
            </View>
          </View>

          <View style={styles.inputFields}>
            <Text style={styles.titleName}>Full Name</Text>
            <TextInput
              style={styles.nameField}
              placeholder="Enter your Name"
              placeholderTextColor="white"
              value={name}
              onChangeText={text => setName(text)}
            />
            <Text style={styles.titleName}>Email</Text>
            <TextInput
              style={styles.nameField}
              placeholder="Enter your Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
            <Text style={styles.titleName}>Date of Birth</Text>
            <TextInput
              style={styles.nameField}
              placeholder="Enter your DOB"
              placeholderTextColor="white"
              value={dob}
              onChangeText={text => setDob(text)}
            />
            <Text style={styles.titleName}>Gender</Text>
            <View style={styles.nameField}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
                style={{color: 'white'}}>
                <Picker.Item label="Gender" value="Select an Option" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <Text style={styles.titleName}>Password</Text>
            <TextInput
              style={styles.nameField}
              placeholder="Enter your password"
              placeholderTextColor="white"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
            <Text style={styles.titleName}>Confirm Password</Text>
            <TextInput
              style={styles.nameField}
              placeholder="Confirm your password"
              placeholderTextColor="white"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP('5%'),

    backgroundColor: '#000000aa',
  },
  welcome: {
    color: 'white',
    fontSize: heightPercentageToDP(2.58),
  },
  titles: {
    color: 'white',
    fontSize: heightPercentageToDP(2.98),
  },
  avatar: {
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('15%'),
  },
  inputFields: {
    marginTop: heightPercentageToDP('1%'),
  },
  titleName: {
    fontSize: heightPercentageToDP(2),
    color: 'white',
    marginTop: heightPercentageToDP('2%'),
  },
  nameField: {
    borderColor: 'white',
    marginTop: heightPercentageToDP('1%'),
    borderRadius: heightPercentageToDP('1%'),
    paddingLeft: heightPercentageToDP('2%'),
    borderWidth: heightPercentageToDP('0.1%'),
    fontSize: heightPercentageToDP(1.9),
    color: 'white',
  },
  signupButton: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    borderRadius: heightPercentageToDP('1%'),
    paddingVertical: heightPercentageToDP('2%'),
    paddingHorizontal: widthPercentageToDP('2%'),
    marginTop: heightPercentageToDP('2%'),
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: heightPercentageToDP(1.7),
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: heightPercentageToDP('1%'),
  },
  loginText: {
    color: 'white',
  },
  loginLink: {
    color: 'rgba(0, 122, 255, 1)',
    fontWeight: 'bold',
  },
});
