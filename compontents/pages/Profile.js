import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import mobile_siteConfig from '../service/mobile-site-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const {width} = Dimensions.get('window');

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [userData, setUserData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getUserDetails = async () => {
      let value = await AsyncStorage.getItem(mobile_siteConfig.USER_DETAIL);

      if (value !== null) {
        setUserData(JSON.parse(value));
      }
    };
    getUserDetails();
  }, []);

  const navigation = useNavigation();

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const toggleNotification = () => {
    setNotification(previousState => !previousState);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(mobile_siteConfig.MOB_ACCESS_TOKEN_KEY);
    await AsyncStorage.setItem(mobile_siteConfig.IS_LOGIN, 'FALSE');
    navigation.replace('Login');
  };

  const ProfileComponent = ({img1, dis, name, img2, onToggle}) => {
    return (
      <View style={styles.profileNameContener}>
        <View style={styles.themeItem}>
          <Image source={img1} />
          <Text style={{marginLeft: 14, color: 'black', fontWeight: '500'}}>
            {dis}
          </Text>
        </View>
        <View style={styles.toggleContainer}>
          <Text style={{color: 'rgba(0, 122, 255, 1)', marginRight: 10}}>
            {name}
          </Text>
          <Image source={img2} />
          {onToggle && (
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={onToggle() ? 'f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={onToggle}
              value={onToggle()}
            />
          )}
        </View>
      </View>
    );
  };

  const handleOpenModal = (field, value) => {
    setActiveField(field);
    setInputValue(value);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    console.log(`Updated ${activeField}:`, inputValue);
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Header')}>
            <Image source={require('../images/left-arrow.png')} />
          </TouchableOpacity>
          <Image source={{uri: userData?.avatar}} style={styles.profileImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.upperTextView}>Welcome Back</Text>
            <Text style={styles.profileNameTextView}>{userData?.name}</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.themeContainer}>
            <View style={styles.themeItem}>
              <Image source={require('../images/sunBright.png')} />
              <Text style={{marginLeft: 14, color: 'black', fontWeight: '500'}}>
                Light Theme
              </Text>
            </View>
            <View style={styles.toggleContainer}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isDarkMode ? 'f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDarkMode}
                value={isDarkMode}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleOpenModal('Name', userData?.name)}>
            <ProfileComponent
              img1={require('../images/profileName.png')}
              dis={'Name'}
              name={userData?.name}
              img2={require('../images/rightarrow.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOpenModal('Email', userData?.email)}>
            <ProfileComponent
              img1={require('../images/messageProfile.png')}
              dis={'Email'}
              name={userData?.email}
              img2={require('../images/rightarrow.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOpenModal('Mobile', '09302372837')}>
            <ProfileComponent
              img1={require('../images/phone.png')}
              dis={'Mobile'}
              name={'09302372837'}
              img2={require('../images/rightarrow.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOpenModal('Password')}>
            <ProfileComponent
              img1={require('../images/keys.png')}
              dis={'Password'}
              name={'Change Password'}
              img2={require('../images/rightarrow.png')}
            />
          </TouchableOpacity>

          <ProfileComponent
            img1={require('../images/locations.png')}
            dis={'Preference'}
            name={'55 St, New York'}
            img2={require('../images/rightarrow.png')}
          />

          <View style={styles.themeContainer}>
            <View style={styles.themeItem}>
              <Image source={require('../images/slient.png')} />
              <Text style={{marginLeft: 14, color: 'black', fontWeight: '500'}}>
                Email Notification
              </Text>
            </View>
            <View style={styles.toggleContainer}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isNotification ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNotification}
                value={isNotification}
              />
            </View>
          </View>

          <ProfileComponent
            img1={require('../images/question.png')}
            dis={'Online Help'}
          />
          <ProfileComponent
            img1={require('../images/delete.png')}
            dis={'Delete Account'}
          />
          <TouchableOpacity onPress={handleLogout}>
            <ProfileComponent
              img1={require('../images/logout.png')}
              dis={'LogOut'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 16, color: 'black'}}>
              Enter Your {activeField}:
            </Text>
            <TextInput
              placeholder={`Update your ${activeField.toLowerCase()}`}
              placeholderTextColor="gray"
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.input}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleUpdate}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 150,
    paddingHorizontal: 30,
  },
  bodyContainer: {
    paddingBottom: windowHeight * 0.0,
    marginBottom: windowHeight * 0.1,
  },
  profileImage: {
    borderRadius: (width * 0.2) / 2,
    height: 55,
    width: 55,
    marginLeft: '10%',
  },
  headerTextContainer: {
    marginLeft: '5%',
  },
  upperTextView: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  profileNameTextView: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 15,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: '5%',
    marginBottom: 0,
    borderRadius: 10,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileNameContener: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: '5%',
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  text: {
    marginLeft: 14,
    color: 'black',
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    padding: width * 0.025,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  texts: {
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: heightPercentageToDP(3),

    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
    marginTop: 15,
  },
});
