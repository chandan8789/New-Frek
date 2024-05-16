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
          <Text style={{fontSize: 14, color: 'black'}}>{des}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity onPress={yes}>
            <Text style={{fontSize: 14, color: 'blue'}}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={no}>
            <Text style={{fontSize: 14, color: 'black'}}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Question = () => {
  const [question, setQuestion] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('question::::::::::', question);
  }, [question]);

  return (
    <ImageBackground
      source={require('../images/background.jpg')}
      style={styles.backgroundImage}>
      <ScrollView style={{backgroundColor: '#000000aa'}}>
        <View style={styles.container}>
          <NameUser />
          <View>
            <UserQuestion
              des="Do you like to have sex?"
              yes={() => {
                console.log('Yes');
                setQuestion([
                  ...question,
                  {
                    question: 'Do you like to have sex?',
                    answer: 'yes',
                  },
                ]);
              }}
              no={() => {
                console.log('no');
                setQuestion([
                  ...question,
                  {
                    question: 'Do you like to have sex?',
                    answer: 'no',
                  },
                ]);
              }}
            />

            <UserQuestion des="Do you want to have kids?" yes="Yes" no="No" />
            <UserQuestion
              des="Do you like to read an erotic book?"
              yes="Yes"
              no="No"
            />
            <UserQuestion
              des="Do you like to cuddle after sex?"
              yes="Yes"
              no="No"
            />
            <UserQuestion
              des="If you could go anywhere, where would we go?"
              yes="Yes"
              no="No"
            />
            <UserQuestion
              des="Have you ever got caught watching porn?"
              yes="Yes"
              no="No"
            />
          </View>

          {/* <View>
              <UserChoose />
            </View> */}

          <View>
            <UserQuestion
              des="Any pet about living with others?"
              yes="Yes"
              no="No"
            />
          </View>
          {/*   
            <View>
              <TournOn />
            </View> */}

          <View>
            <UserQuestion
              des="Do you like dirty talking phone/texts?"
              yes="Yes"
              no="No"
            />
          </View>

          <View>
            <UserQuestion
              des="Have you ever been to sex shop?"
              yes="Yes"
              no="No"
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
