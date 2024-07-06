import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';


const FreeLikes = () => {
  return (
    <View>
      <View style={styles.likesbtn}>
        <Text style={{ color: "black" }}>70 Likes</Text>
        <Text style={{ color: "black" }}>$3.00</Text>
      </View>
    </View>
  )
}

const BottomLayerPopup = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        activeOpacity={1} // Prevents touch-through
        onPress={onClose}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          {/* <Text>This is the bottom layer popup!</Text> */}
          <FreeLikes />
          <FreeLikes />
          <View style={{ marginTop: heightPercentageToDP("2%") }}><Button title="Buy Now" onPress={onClose} /></View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const Footer = () => {
  const navigation = useNavigation();

  const handleImageClick = () => {
    navigation.navigate('topBar-Navigation');
  };

  const goTotheBioSection = () => {
    navigation.navigate('About');
  };

  const [isBottomLayerVisible, setBottomLayerVisible] = useState(false);

  const toggleBottomLayer = () => {
    setBottomLayerVisible(!isBottomLayerVisible);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.footerIcons}>
          <TouchableOpacity onPress={goTotheBioSection}>
            <Image
              source={require('../images/BioIcon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* <Button title="Open Bottom Layer Popup" onPress={toggleBottomLayer} /> */}
            <TouchableOpacity onPress={toggleBottomLayer}>
              <Image
                source={require('../images/flamepic.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <BottomLayerPopup
              visible={isBottomLayerVisible}
              onClose={() => setBottomLayerVisible(false)}
            />
          </View>

          <TouchableOpacity onPress={handleImageClick}>
            <Image
              source={require('../images/figma.png')}
              style={[styles.icon, styles.profileImage]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    // overflow: 'hidden',
    // padding: 20
    // flex:1
    margin: heightPercentageToDP(2),
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 4, borderRadius: heightPercentageToDP(2.5) }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow radius
    elevation: 5, // Android shadow
    // marginBottom: heightPercentageToDP(1)
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: heightPercentageToDP('2%'),
    borderRadius: heightPercentageToDP('50%'),
    paddingLeft: heightPercentageToDP('2%'),
    fontSize: heightPercentageToDP(1.9),
    paddingHorizontal: heightPercentageToDP('2%'),

  },
  icon: {
    height: heightPercentageToDP('5%'),
    width: widthPercentageToDP('10%'),
  },

  likesbtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: heightPercentageToDP("0.1%"),
    borderRadius: widthPercentageToDP("10%"),
    fontSize: heightPercentageToDP("10%"),
    padding: heightPercentageToDP("2%"),
    color: "black",
    margin: 10
  }
});
