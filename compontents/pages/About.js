import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobile_siteConfig from '../service/mobile-site-config';

const {width} = Dimensions.get('window');

const SquareMember = () => {
  return (
    <View style={styles.squareMemberContainer}>
      <Image
        source={require('../images/Rectangle.png')}
        style={styles.squareMemberImage}
      />
    </View>
  );
};

const CommonContent = ({location}) => {
  return (
    <View style={styles.commonContentContainer}>
      <Text style={styles.locations}>{location}</Text>
    </View>
  );
};

const ExtraActivity = ({img, msg, rs, bp}) => {
  return (
    <View style={styles.extraactivity}>
      <View style={{flexDirection: 'row'}}>
        <Image source={img} style={styles.extraactivityImage} />
        <Text style={styles.extraactivityText}>{msg}</Text>
      </View>
      <View style={{}}>
        <Text style={styles.extraactivityValue}>{rs}</Text>
        <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
          {bp}
        </Text>
      </View>
    </View>
  );
};

const About = ({navigation}) => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const userDetails = async () => {
      let value = await AsyncStorage.getItem(mobile_siteConfig.USER_DETAIL);
      if (value != null) {
        setUserName(JSON.parse(value));
      }
    };
    userDetails();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Header')}>
            <Image
              source={require('../images/left-arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Image source={{uri: userName?.avatar}} style={styles.profileImage} />
          <View style={styles.profileText}>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.userName}>{userName?.name}</Text>
          </View>
          <Image
            source={require('../images/dots-vertical.png')}
            style={styles.icon}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.avatarImagesContainer}>
            {[...Array(20)].map((_, index) => (
              <SquareMember key={index} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.bioContainer}>
          <Text style={styles.bioTitle}>Bio</Text>
          <Text style={styles.bioText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonTitle}>Common</Text>
          <View style={styles.commonContent}>
            <CommonContent location={'Location'} />
            <CommonContent location={'New York'} />
          </View>
        </View>

        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '500',
            marginTop: 30,
          }}>
          Extra Activity
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {[...Array(10)].map((_, index) => (
              <ExtraActivity
                img={require('../images/red-heart.png')}
                msg={'Heart rate'}
                rs={'120'}
                bp={'BPM'}
                key={index}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    height: width * 0.07,
    width: width * 0.07,
  },
  profileImage: {
    borderRadius: (width * 0.2) / 2,
    height: 55,
    width: 55,
  },
  profileText: {
    marginRight: width * 0.1,
  },
  welcomeText: {
    fontWeight: '400',
    fontSize: width * 0.035,
    color: 'black',
  },
  userName: {
    fontWeight: '600',
    fontSize: width * 0.045,
    color: 'black',
  },
  avatarImagesContainer: {
    flexDirection: 'row',
    paddingVertical: width * 0.1,
  },
  squareMemberContainer: {
    marginRight: width * 0.03,
  },
  squareMemberImage: {
    height: 53,
    width: 53,
  },
  bioContainer: {
    marginTop: width * 0.02,
  },
  bioTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: 'black',
    marginBottom: width * 0.02,
  },
  bioText: {
    color: 'black',
    fontSize: width * 0.035,
  },
  commonContainer: {
    marginTop: width * 0.07,
  },
  commonTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: 'black',
    marginBottom: width * 0.05,
  },
  commonContent: {
    flexDirection: 'row',
  },
  commonContentContainer: {
    marginRight: width * 0.05,
  },
  locations: {
    height: width * 0.1,
    width: width * 0.3,
    color: 'black',
    borderRadius: 50,
    textAlignVertical: 'center',
    fontSize: 18,
    backgroundColor: '#00659D42',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  extraactivity: {
    // borderWidth: 0.5,
    height: width * 0.3,
    width: width * 0.4,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
    margin: 5,
    elevation: 3,
    backgroundColor: 'white',
  },
  extraactivityImage: {
    height: width * 0.06,
    width: width * 0.06,
    marginRight: 5,
  },
  extraactivityText: {
    fontSize: width * 0.04,
    fontWeight: '400',
    color: 'black',
  },
  extraactivityValue: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: 'black',
  },
});
