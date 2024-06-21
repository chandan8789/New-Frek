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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import mobile_siteConfig from '../service/mobile-site-config';
import {postData} from '../service/mobileApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const Signup = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !dob ||
      !selectedValue ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    let request = {
      name: name,
      email: email,
      // dob: moment(dob).format('DD/MM/YYYY'),
      dob: dob,
      gender: selectedValue,
      password: password,
    };

    try {
      const res = await postData(request, mobile_siteConfig.signup);

      console.log('handleSubmit response:', res);

      if (res?.message === 'User created successfully') {
        await AsyncStorage.setItem(
          mobile_siteConfig.MOB_ACCESS_TOKEN_KEY,
          res?.token,
        );
        Alert.alert('Success', 'Signup successfully');
        navigation.navigate('Question');
        await AsyncStorage.setItem(mobile_siteConfig.IS_LOGIN, 'TRUE');
      } else if (res?.message === 'User already exists') {
        Alert.alert('Error', 'User already exists');
      } else {
        Alert.alert('Error', 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('handleSubmit error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleConfirm = selectedDate => {
    const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
    setOpen(false);
    setDate(selectedDate);
    setDob(formattedDate);
  };

  return (
    <ImageBackground
      source={require('../images/background.jpg')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.header}>
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

            <View style={styles.nameField}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.dobText}>
                  {dob.length === 0 ? 'Enter your DOB' : dob}
                </Text>
              </TouchableOpacity>
            </View>

            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => setOpen(false)}
            />

            <Text style={styles.titleName}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={itemValue => setSelectedValue(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Select Gender" value="" />
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
              onPress={handleSubmit}>
              <Text style={styles.signupButtonText}>Signup</Text>
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

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: widthPercentageToDP('5%'),
    backgroundColor: '#000000aa',
    height: heightPercentageToDP('100%'),
  },
  avatar: {
    marginTop: heightPercentageToDP('2%'),
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('15%'),
  },
  header: {
    marginTop: '5%',
    marginBottom: heightPercentageToDP('2%'),
  },
  welcome: {
    color: 'white',
    fontSize: heightPercentageToDP(2.5),
  },
  titles: {
    color: 'white',
    fontSize: heightPercentageToDP(2.7),
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
  dobText: {
    color: 'white',
    fontSize: heightPercentageToDP(1.9),
    paddingVertical: heightPercentageToDP(1.7),
  },
  pickerContainer: {
    borderColor: 'white',
    borderWidth: heightPercentageToDP('0.1%'),
    borderRadius: heightPercentageToDP('1%'),
    marginTop: heightPercentageToDP('1%'),
  },
  picker: {
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

export default Signup;
