import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import mobile_siteConfig from '../service/mobile-site-config';
import { getDataWithToken } from '../service/mobileApi';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.88;

const AvatarImages = ({ item, index, onPress }) => {
  return (
    <View
      key={index}
      style={styles.avatarContainer}>
      <View style={{
        height: heightPercentageToDP(5),
        width: heightPercentageToDP(5),
        borderRadius: heightPercentageToDP(2.5),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
      }}>
        <Image
          resizeMode='cover'
          source={require('../images/profileImage.png')}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View style={[{
        width: heightPercentageToDP(10),
        // height: heightPercentageToDP(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
      }]}>
        <View style={{
          height: heightPercentageToDP(2),
          width: heightPercentageToDP(2),
          borderRadius: heightPercentageToDP(1),
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'yellow'
        }}>
          <Image
            source={require('../images/recording.png')}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={[styles.name, {
            // height: heightPercentageToDP(2),
            width: heightPercentageToDP(8),
            fontWeight: '400',
            fontSize: 16,
            color: 'black',
            paddingLeft: widthPercentageToDP(1)
          }]}>{item?.name}</Text>
      </View>
    </View>
  );
};

const ChatsWithPerson = ({ item, onPress }) => {
  console.log('conversation item', item);


  function dateToFromNowDaily(myDate) {
    // console.log('fjahsfjafjaf', myDate)
    var fromNow = moment(myDate).format('ll');
    return moment(myDate).calendar(null, {
      lastWeek: 'ddd,',
      lastDay: '[Yesterday,]',
      sameDay: '[Today,]',

      // when the date is further away, use from-now functionality             
      sameElse: function () {
        return "[" + fromNow + "]";
      }
    });
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chatContainer}>
        <View style={styles.avatarContainerx}>
          <Image
            source={require('../images/profileImage.png')}
            style={styles.avatar}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleNames}>{item?.participants && item?.participants[0]?.name}</Text>
          <Text style={styles.message}>{item?.messages && item?.messages[item?.messages.length - 1].message}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>{dateToFromNowDaily(item.updated_at).substring(0, dateToFromNowDaily(item.updated_at).indexOf(','))}</Text>
          {/* <Text style={styles.notification}>2</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// main
const StreamChat = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation();

  // loader
  const [isLoading, setIsLoading] = useState(false);

  // chat
  const [allConversatation, setAllConversatation] = useState([]);
  const [allConversatationSnap, setAllConversatationSnap] = useState([]);
  const [conversatation, setConversatation] = useState([]);
  const [userData, setUserData] = useState([]);
  // MATCHES
  const [allMatches, setAllMatches] = useState([]);


  // setUserData
  useEffect(() => {
    console.log('hellooooooooooooooooooo1')
    const getUserDetails = async () => {
      console.log('hellooooooooooooooooooo2')
      const value = await AsyncStorage.getItem(mobile_siteConfig.USER_DETAIL);
      console.log('hellooooooooooooooooooo3')
      console.log('logged in user value::::::::::', value);
      // setUserData(JSON.parse(value));
      if (value !== null) {
        console.log('logged in user value::::::::::', value);
        setUserData(JSON.parse(value));
      }
    };
    getUserDetails();
  }, [isFocused]);


  const handleGoToChating = (item) => {
    navigation.navigate('Chating', { data: item });
    console.log('item:::', item)
  };

  const backToHomePage = () => {
    navigation.navigate('Header');
  };


  // search 
  const filterConversations = (text) => {
    // if (allConversatationSnap) {
    //     const filtered = allConversatationSnap?.conversations?.filter(conversation =>
    //         conversation?.participants.some(participant =>
    //             participant?.user?.username.toLowerCase().includes(text.toLowerCase())
    //         )
    //     );
    //     // setAllConversatation(filtered);
    //     console.log('filtered::', filtered)
    // }
  };

  // useEffect(() => {
  //   filterConversations(searchVal)
  // }, [searchVal])



  // apis
  const getAllConversations = () => {
    getDataWithToken({}, mobile_siteConfig.getAllConversations)
      .then((r: any) => r.json())
      .then((r: any) => {
        console.log('all conversation::', r)
        if (r?.hasOwnProperty('conversations')) {
          setIsLoading(false);
          let abc = r?.conversations;
          abc.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
          });
          // all conversation
          console.log('all sorted conversation::', abc)
          setAllConversatation(abc);
          setAllConversatationSnap(abc)
        } else {
          console.log("The key 'conversations' does not exist.");
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("getAllConversations Error: " + err.message);
          setIsLoading(false);
        }
      });
  }

  const getAllMatches = () => {
    getDataWithToken({}, mobile_siteConfig.GET_ALL_MATCHES)
      .then((r: any) => r.json())
      .then((r: any) => {
        console.log('getAllMatches:::::', r);
        setAllMatches(r?.feed)
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("getAllMatches Error: " + err);
          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    getAllConversations();
    getAllMatches();
  }, [isFocused])

  // removing self id from all conversatation to show the user logo in chat home page
  useEffect(() => {
    var mod = allConversatation;
    // console.log('removeSelf', mod)
    if (mod) {
      mod?.forEach(conversation => {
        console.log('removeSelf', conversation)
        conversation.participants = conversation.participants?.filter(participant => participant._id !== userData?._id);
      });
      setConversatation(mod)
    }
  }, [allConversatation])



  console.log('allConversatation:::length', allConversatation.length)

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', paddingVertical: 30 }}>
        <TouchableOpacity onPress={backToHomePage}>
          <Image source={require('../images/left-arrow.png')} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            fontSize: 20,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textAlignVertical: 'center',
            flex: 1,
          }}>
          Stream Chat
        </Text>
      </View>



      <View style={{ flex: 1, }}>

        {allMatches.length > 0 &&
          <View style={styles.inputContainer}>
            <Image
              source={require('../images/search-lg.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search...."
              placeholderTextColor="gray"
            />
          </View>
        }

        {allMatches.length > 0 &&
          <View>
            <Text style={styles.matches}>Matches</Text>
            <FlatList
              data={allMatches}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => { handleGoToChating(item) }}>

                  <AvatarImages
                    item={item}
                    key={index}
                    onPress={() => { }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        }

        {allConversatation.length === 0 ?
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'black'
            }}>No conversatation Found</Text>
          </View>
          :
          <>
            <Text style={styles.chats}>Chats</Text>
            <View style={{
              marginTop: heightPercentageToDP(2)
            }}>
              <FlatList
                data={allConversatation}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <ChatsWithPerson
                    item={item}
                    key={index}
                    onPress={() => { handleGoToChating(item) }}
                  />
                )}
              />
            </View>
          </>
        }
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(4),
    paddingTop: heightPercentageToDP(6),
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 55,
    marginLeft: 5,
    color: 'black',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  matches: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 15,
    width: heightPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  avatarContainerx: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  avatar: {
    height: 55,
    width: 55,
  },
  nameContainer: {

  },
  recordingIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginBottom: 50,
  },
  name: {
  },

  titleNames: {
    color: 'black',
    fontSize: 19,
  },
  avatarImagesContainer: {
    flexDirection: 'row',
  },
  chats: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 25,
  },
  notification: {
    textAlign: 'center',
    borderRadius: 50,
    height: 23,
    width: 23,
    marginTop: 7,
    marginLeft: 35,
    backgroundColor: 'blue',
    color: 'white',
  },
  chatContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: itemWidth,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    color: 'gray',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 15,
    color: 'black',
  },
});

export default StreamChat;
