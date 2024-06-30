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
} from 'react-native';
import mobile_siteConfig from '../service/mobile-site-config';
import socketServcies from '../userInfoMapperSocket';
import { postDataWithToken } from '../service/mobileApi';

const { width } = Dimensions.get('window');

const Sender = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/Ellipse.png')}
        style={styles.emojiImage}
      />
      <View style={styles.chatContainer}>
        {/* <View style={[styles.messageContainer, isSender ? styles.senderMessage : styles.receiverMessage]}> */}
        <View style={styles.messageTimeContener}>
          <View style={[styles.messageContainer, styles.receiverMessage]}>
            <Text style={styles.message}>Good Afternoon</Text>
            <Text style={styles.time}>12:30 PM</Text>
          </View>
        </View>
        <View style={[styles.messageContainer, styles.senderMessage]}>
          <Text style={styles.message}>Good Afternoon</Text>
          <Text style={styles.time}>12:30 PM</Text>
        </View>
      </View>
    </View>
  );
};

const Chating = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userDetails, setUserDetails] = useState('');


  const [userData, setUserData] = useState([]);//logged in user data
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
  const [newMessage, setNewMessage] = useState([]);//incoming message from socket
  // new chat
  const [newChatData, setNewChatData] = useState([]);

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
    socketServcies.initializeSocket()
  }, [isFocused])

  // chat
  // updating incoming stock data from socket
  useEffect(() => {
    socketServcies.on('newMessage', (msg: any) => {
      console.log('new chat Message', msg);
      setNewMessage(msg)
    });
  }, []);

  // apis
  const sendChat = () => {
    let req = {
      'message': sendMessage
    }
    // let url = `${mobile_siteConfig.sendMessage}${otherProfile?.id}`
    let url = `${mobile_siteConfig.sendMessage}${'66795a3531c9d29edf3d08fe'}`
    console.log('sending chat to ::', url)
    postDataWithToken(req, url)
      .then((r) => {
        console.log('resp::', r)
        if (r?.message === "Message sent") {
          setSendMessage('');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
      });
  }

  //get all chat by user id::::--
  const getAllChat = (id) => {
    console.log('id to get chats', id)
    postDataWithToken({}, `message/conversation/${id}`)
      .then((r) => {
        console.log(' getAllChatby id ==============================resp::', r)
        if (r?.message === 'No conversation found') {
          setConversatation([]);
        } else {
          setConversatation(r?.conversation?.messages);
          setChatMetaData(r?.conversation);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllChat('66795a3531c9d29edf3d08fe');
  }, [isFocused])


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

      <ScrollView>
        <View>
          {[...Array(4)].map((_, index) => (
            <Sender key={index} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.typeChatContener}>

        <View style={styles.InputInnerSideCContener}>
          <Image source={require('../images/attachment.png')} />
          <TextInput
            style={{ color: 'black' }}
            placeholder="Type your message"
            placeholderTextColor="gray"
          />
          <Image
            source={require('../images/Vector123.png')}
            style={{ marginLeft: '40%' }}
          />
        </View>

        <TouchableOpacity onPress={() => { sendChat() }}>
          <Image source={require('../images/Subtract.png')} />
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
