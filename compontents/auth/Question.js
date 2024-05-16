import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const NameUser = () => {
  return (
    <>
      <View>
        <Text style={{fontSize: 16, color: 'white'}}>Hey, John Smith</Text>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          You have answer following
        </Text>
        <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
          question for better experience.
        </Text>
      </View>
    </>
  );
};

const UserQuestion = ({des, yes, no}) => {
  return (
    <>
      <View style={styles.userQuestion}>
        <View>
          <Text style={{fontSize: 14, color: 'black'}}>{des?.question}</Text>
        </View>

        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity onPress={yes}>
            <Text
              style={{
                fontSize: 15,
                color:
                  des?.answer === null
                    ? 'grey'
                    : des?.answer === true
                    ? 'blue'
                    : 'grey',
              }}>
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={no}>
            <Text
              style={{
                fontSize: 15,
                color:
                  des?.answer === null
                    ? 'grey'
                    : des?.answer === false
                    ? 'blue'
                    : 'grey',
              }}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Question = () => {
  const [question, setQuestion] = useState([
    {
      id: 1,
      question: 'Do you like to have sex?',
      answer: null,
    },
    {
      id: 2,
      question: 'Do you want to have kids?',
      answer: null,
    },
    {
      id: 3,
      question: 'Do you like to read erotic books?',
      answer: null,
    },
    {
      id: 4,
      question: 'Do you like to cuddel after sex?',
      answer: null,
    },
    {
      id: 5,
      question: 'If you could go anywhere, where would we go?',
      answer: null,
    },
    {
      id: 6,
      question: 'Have you ever got caught watching porn?',
      answer: null,
    },
    {
      id: 7,
      question: 'Any pet about living with others?',
      answer: null,
    },
    {
      id: 8,
      question: 'Do you like dirty talking phone/texts?',
      answer: null,
    },
    {
      id: 9,
      question: 'Have you ever been to sex shop?',
      answer: null,
    },
  ]);
  
  const navigation = useNavigation();

  const updateAnswer = (index, val) => {
    setQuestion(prevData => {
      const newData = [...prevData];
      newData[index].answer = val;
      return newData;
    });
  };

  return (
    <ImageBackground
      source={require('../images/background.jpg')}
      style={styles.backgroundImage}>
      <ScrollView style={{backgroundColor: '#000000aa'}}>
        <View style={styles.container}>
          <NameUser />

          <View>
            <FlatList
              data={question}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <View key={index}>
                  <UserQuestion
                    des={item}
                    yes={() => {
                      console.log('Yes');
                      updateAnswer(index, true);
                    }}
                    no={() => {
                      console.log('no');
                      updateAnswer(index, false);
                    }}
                  />
                </View>
              )}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate('Login')}>
                Submit
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
                gap: 5,
              }}>
              <Text
                style={{color: 'white', fontSize: 15}}
                onPress={() => navigation.navigate('Login')}>
                Skip:
              </Text>
              <Text style={{color: 'blue', fontSize: 15}}>Home</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: heightPercentageToDP('1.5%'),
  },
  userQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: heightPercentageToDP('2%'),
    borderRadius: 10,
    backgroundColor: 'white',
  },
  nameField: {
    marginTop: heightPercentageToDP('2%'),
    borderRadius: heightPercentageToDP('1%'),
    fontSize: heightPercentageToDP(1.9),
    color: 'black',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: heightPercentageToDP('6%'),
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  backgroundImage: {
    height: heightPercentageToDP('100%'),
  },
});
