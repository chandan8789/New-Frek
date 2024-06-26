import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';
import mobile_siteConfig from '../service/mobile-site-config';
import { getDataWithToken } from '../service/mobileApi';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.88;

const AvatarImages = () => {
  return (
    <View style={styles.avatarContainer}>
      <Image
        source={require('../images/profileImage.png')}
        style={styles.avatar}
      />
      <View style={styles.nameContainer}>
        <Image
          source={require('../images/recording.png')}
          style={styles.recordingIcon}
        />
        <Text style={styles.name}>Henny</Text>
      </View>
    </View>
  );
};

const ChatsWithPerson = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chatContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../images/profileImage.png')}
            style={styles.avatar}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleNames}>Alina Saline</Text>
          <Text style={styles.message}>
            Hey, I am waiting for your response.
          </Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>12:40 pm</Text>
          <Text style={styles.notification}>2</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// main
const StreamChat = () => {
  const navigation = useNavigation();

  // loader
  const [isLoading, setIsLoading] = useState(false)
  // chat
  const [allConversatation, setAllConversatation] = useState([]);
  const [allConversatationSnap, setAllConversatationSnap] = useState([]);
  const [conversatation, setConversatation] = useState([]);
  const [userData, setUserData] = useState([]);



  const handleGoToChating = () => {
    navigation.navigate('Chating');
  };

  const backToHomePage = () => {
    navigation.navigate('Header');
  };


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

  // apis -- verified
  const getAllConversations = () => {
    getDataWithToken({}, mobile_siteConfig.getAllConversations)
      .then((r: any) => r.json())
      .then((r: any) => {
        if (r?.hasOwnProperty('conversations')) {
          setIsLoading(false);
          let abc = r?.conversations;
          abc.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
          });
          // all conversation
          console.log('all conversation::', abc)
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

  useEffect(() => {
    getAllConversations();
  }, [])

  // removing self id from all conversatation to show the user logo in chat home page
  useEffect(() => {
    var mod = allConversatation;
    if (mod) {
      mod?.forEach(conversation => {
        conversation.participants = conversation.participants?.filter(participant => Number(participant.user.id) !== Number(userData?.id));
      });
      setConversatation(mod)
    }
  }, [allConversatation])

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
    <View style={styles.container}>
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
      <Text style={styles.matches}>Matches</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.avatarImagesContainer}>
          {[...Array(30)].map((_, index) => (
            <AvatarImages key={index} onPress={handleGoToChating} />
          ))}
        </View>
      </ScrollView>

      <Text style={styles.chats}>Chats</Text>

      <ScrollView>
        <View>
          {[...Array(200)].map((_, index) => (
            <ChatsWithPerson
              key={index}
              onPress={handleGoToChating}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  },
  avatar: {
    height: 55,
    width: 55,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  recordingIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginBottom: 50,
  },
  name: {
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
    marginBottom: 50,
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
