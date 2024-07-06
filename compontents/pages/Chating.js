import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import mobile_siteConfig from '../service/mobile-site-config';
import socketServcies from '../userInfoMapperSocket';
import { getData, postDataWithToken } from '../service/mobileApi';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';

const { width } = Dimensions.get('window');

const Sender = ({ item, userDetails }) => {
  console.log('fdsafsfsafaffdasfasfa1', userDetails._id);
  console.log('fdsafsfsafaffdasfasfa2', item?._id)
  return (
    <View style={styles.container}>
      {userDetails._id !== item?.sender &&
        <Image
          source={require('../images/Ellipse.png')}
          style={styles.emojiImage}
        />}
      {/* <View style={[styles.messageContainer, isSender ? styles.senderMessage : styles.receiverMessage]}> */}

      {userDetails._id !== item?.sender ?
        <View style={styles.messageTimeContener}>
          <View style={[styles.messageContainer, styles.receiverMessage]}>
            <Text style={styles.message}>{item?.message}</Text>
            <Text style={styles.time}>{moment(item?.createdAt).fromNow()}</Text>
          </View>
        </View>

        :

        <View style={styles.chatContainer}>
          <View style={[styles.messageContainer, styles.senderMessage]}>
            <Text style={styles.message}>{item?.message}</Text>
            <Text style={styles.time}>{moment(item?.createdAt).fromNow()}</Text>
          </View>
        </View>
      }
    </View>
  );
};

const Chating = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState('');

  const [userData, setUserData] = useState([]); //logged in user data
  const [otherProfile, setOtherProfile] = useState([]);

  const [chatMetaData, setChatMetaData] = useState([]);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [routeDatax, setRouteDatax] = useState([]);
  const [allConversations, setAllConversations] = useState([]);
  const [conversatation, setConversatation] = useState([]);

  // modal
  const [loading, setLoading] = useState(false);
  const scrollEnd = useRef();
  const [sendMessage, setSendMessage] = useState('');
  const [newMessage, setNewMessage] = useState([]); //incoming message from socket
  // new chat
  const [newChatData, setNewChatData] = useState([]);


  // getting self data
  useEffect(() => {
    const getUserDetails = async () => {
      const value = await AsyncStorage.getItem(mobile_siteConfig.USER_DETAIL);
      if (value !== null) {
        console.log('value::::::::::', value);
        setUserDetails(JSON.parse(value));
      }
    };
    getUserDetails();
  }, []);

  // sokcet
  useEffect(() => {
    socketServcies.initializeSocket();
  }, [isFocused]);

  // chat socket
  useEffect(() => {
    socketServcies.on('newMessage', (msg: any) => {
      console.log('new chat Message', msg);
      setNewMessage(msg);
    });
  }, []);

  useEffect(() => {
    console.log('newMessage1212121212121212', newMessage, newMessage.length);
    console.log('chat metad data::', chatMetaData, isGroupChat);

    if (typeof newMessage === 'object' && Object.keys(newMessage).length !== 0) {

      if (chatMetaData?.id === undefined && isGroupChat === false) {
        setTimeout(() => {
          console.log('hello there first time::1', otherProfile?._id);
          if (otherProfile?._id !== undefined) {
            getAllChat(otherProfile?._id);
          }
        }, 500);
        return;
      }

      if (Number(newMessage?.message?.conversation_id) === Number(chatMetaData?.id)) {
        console.log('this personal message is for me', chatMetaData?.id);
        if (conversatation !== undefined && conversatation?.length > 0) {
          var newArray = [...conversatation, newMessage?.message]
          console.log('typeof', typeof (newArray))
          setConversatation(newArray);
        } else {
          console.log('else 2::', newMessage);
          if (typeof newMessage === 'object' && Object.keys(newMessage).length !== 0) {
            setConversatation(prevMessages => [...prevMessages, newMessage?.message]);
          }
        }
        return
      }

      if (Number(newMessage?.message?.conversation_id) === Number(routeDatax?.id) &&
        newMessage?.message?.conversation_id !== undefined) {
        console.log('this Group message is for me');
        if (conversatation !== undefined && conversatation?.length > 0) {
          var newArray = [...conversatation, newMessage?.message]
          console.log('typeof1234', typeof (newArray))
          setConversatation(newArray)
        } else {
          if (typeof newMessage === 'object' && Object.keys(newMessage).length !== 0) {
            setConversatation(prevMessages => [...prevMessages, newMessage?.message]);
          }
        }
        return

      }
    }
  }, [newMessage])

  // apis
  const sendChat = () => {
    let req = {
      message: sendMessage,
    };
    console.log('req:::', req)
    let url = `${mobile_siteConfig.sendMessage}${'6688d7eee45209ef14651ad5'}`;
    console.log('sending chat to ::', url);
    postDataWithToken(req, url)
      .then(r => {
        console.log('resp::', r);
        if (r?.message === 'Message sent') {
          setSendMessage('');
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };

  //get all chat by user id::::--
  const getAllChat = id => {
    console.log('id to get chats', id);
    getData(`message/conversation/${id}`)
      .then(r => {
        console.log(
          'getAllChat response::::', r,
        );
        if (r?.message === 'No conversation found') {
          setConversatation([]);
        } else {
          setConversatation(r?.conversation?.messages);
          setChatMetaData(r?.conversation);
        }
      })
      .catch(error => {
        console.log('getAllChat errrr', error);
      });
  };

  useEffect(() => {
    if (route?.params) {
      if (route?.params.data !== undefined) {
        console.log('route data', route?.params.data);
        var idToGetChat = route?.params.data?.participants[0]?._id
        console.log('idtogetchat', idToGetChat);
        getAllChat(idToGetChat);
        setOtherProfile(route?.params.data?.participants[0]);
      }
    }
  }, [route])


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Stream-Chat')}>
          <Image source={require('../images/left-arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userDetails?.name}</Text>
        {/* <TouchableOpacity>
          <Image source={require('../images/dots-vertical.png')} />
        </TouchableOpacity> */}
      </View>


      <FlatList
        ref={scrollEnd}
        data={conversatation}
        onContentSizeChange={() =>
          scrollEnd.current.scrollToEnd({ animated: true })
        }
        renderItem={({ item, index }) => {
          return (
            <Sender
              item={item}
              userDetails={userDetails}
              key={index}
            />
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />



      <View style={styles.typeChatContener}>
        <View style={styles.InputInnerSideCContener}>
          {/* <Image source={require('../images/attachment.png')} /> */}
          <TextInput
            placeholder="Type your message"
            style={{
              paddingLeft: widthPercentageToDP(2),
              color: 'black',
              paddingVertical: heightPercentageToDP(2),
              // flex: 1
              width: widthPercentageToDP(75)
            }}
            placeholderTextColor="gray"
            value={sendMessage}
            onChangeText={text => setSendMessage(text)}
          />
          {/* <Image
            source={require('../images/Vector123.png')}
            style={{ marginLeft: '40%' }}
          /> */}
        </View>

        <TouchableOpacity
          onPress={() => {
            sendChat();
          }}>
          <View style={{
            height: heightPercentageToDP(5),
            width: widthPercentageToDP(5),
          }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
              }}
              source={require('../images/Subtract.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftArrowContainer: {
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  emojiImage: {
    marginRight: 10,
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  messageContainer: {
    maxWidth: width * 0.7,
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  messageTimeContener: {
    maxWidth: width * 0.7,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    color: '#414141',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
    color: 'black',
  },
  time: {
    fontSize: 12,
    color: '#999',
    // marginTop: 1,
    alignSelf: 'flex-end',
    color: 'black',
  },
  typeChatContener: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingLeft: 10,
  },
  InputInnerSideCContener: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
  },
});

export default Chating;
