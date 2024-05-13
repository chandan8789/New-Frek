import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Footer from '../../pages/Footer';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const Highlights = () => {
  return (
    <View style={styles.highlightsContainer}>
      <Image
        source={require('../../images/secondavtar.png')}
        style={styles.avatar}
      />
    </View>
  );
};

const GoLive = ({img}) => {
  const navigation = useNavigation();

  const goToLive = () => {
    navigation.navigate('Live-Streaming');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -30,
      }}>
      <View style={styles.mailImage}>
        <Image source={require('../../images/mail-02.png')} />
      </View>
      <View style={styles.GoLives}>
        <TouchableOpacity onPress={goToLive}>
          <Text style={{fontSize: 20, fontWeight: 600, color: 'black'}}>
            Go Live
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mailImage}>
        <Image source={require('../../images/mailIcons.png')} />
      </View>
    </View>
  );
};

const CardsMember = ({img}) => {
  return (
    <>
      <View>
        <Image source={img} />
      </View>
    </>
  );
};

const ForYou = () => {
  const data = [
    {
      imageUrl:
        'https://media.istockphoto.com/id/1288271580/photo/social-media-and-digital-online-concept-woman-using-smartphone.webp?b=1&s=170667a&w=0&k=20&c=iknpSLP2cHCMTvk_y77JBSunErsEzD-ZMUMKHwkFBNY=',
    },
    {
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1665159098106-6abd78ad483c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0aW5nfGVufDB8fDB8fHww',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/id/1301058088/photo/online-dating-mobile-apps-concept.webp?b=1&s=170667a&w=0&k=20&c=b2XQ_mP5Ng6V_P4QXePupEf5rpuIKRe5b80dfdhqZeQ=',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/id/1295105194/photo/close-up-of-a-sad-young-caucasian-woman-reading-bad-news.webp?b=1&s=170667a&w=0&k=20&c=wR6p2ZIJ6UERObDlNFXj8xTZNuPSGP1wffyL0tdTw0k=',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/id/1049719266/photo/man-using-dating-app-on-mobile-phone.webp?b=1&s=170667a&w=0&k=20&c=lILz1fIBGxu-gryUoZiCUOIz0rZRrKI32jJ2i8DsJk8=',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/id/1034417688/photo/heart-love-on-a-mobile-phone.webp?b=1&s=170667a&w=0&k=20&c=OVKP-04zLb0FjkHxXWgLoavsf6Xe8lG8FO1jigAFVLg=',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/id/1276542981/photo/woman-using-dating-app-on-mobile-phone.webp?b=1&s=170667a&w=0&k=20&c=SR8myzhDwKuxOXWWnDaPw3AVhFVqy7bdo2JF956shaY=',
    },
    {
      imageUrl:
        'https://media.istockphoto.com/id/2058458560/photo/woman-using-a-smart-phone-text-messaging-online-messaging.jpg?s=612x612&w=0&k=20&c=S475eowQLj7XeFrRdVvhkrEQSYaTDRbxSwcdCqT4joI=',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1571771826307-98d0d0999028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0aW5nfGVufDB8fDB8fHww',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1542338332-76971ae8c292?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGF0aW5nfGVufDB8fDB8fHww',
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1604700403855-dc64a1320324?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.carouselItem}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          loop
          autoplay
          autoplayInterval={2000}
        />
      </View>

      {/* This is Highlights Components */}
      <View style={{padding: 20}}>
        <Text
          style={{fontSize: 18, fontWeight: 600, color: 'black', marginTop: 5}}>
          Highlights
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.highlightsMembers}>
            {[...Array(30)].map((_, index) => (
              <Highlights />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* This is CardsMember Components */}
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'black',
            paddingLeft: 20,
          }}>
          Highlights
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
         
            justifyContent: 'space-around',
          }}>
          <CardsMember img={require('../../images/hightmen.png')} />
          <CardsMember img={require('../../images/highgirls.png')} />
        </View>
      </View>

      <GoLive />

      {/* This is the footer */}
      <View style={{}}>
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  avatar: {
    height: heightPercentageToDP('7%'),
    width: widthPercentageToDP('14%'),
    marginTop:heightPercentageToDP("1%")
  },
  highlightsMembers: {
    flexDirection: 'row',
    gap: 15,
  },
  mailImage: {
    height: 50,
    width: 55,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
  },
  GoLives: {
    height: 50,
    width: 150,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 3,
    backgroundColor: 'white',
  },
});

export default ForYou;
