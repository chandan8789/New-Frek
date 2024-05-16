import {Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYou from './pages/ForYou';
import Trending from './pages/Trending';
import NearBy from './pages/NearBy';
import Favorites from './pages/Favorites';
import { heightPercentageToDP } from 'react-native-responsive-screen';

function TopBarNavigation() {
    const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="For You"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {fontSize: 13, fontWeight:"bold"},
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="for-you"
        component={ForYou}
        options={{tabBarLabel: 'FOR YOU'}}
      />

      <Tab.Screen
        name="Trending"
        component={Trending}
        options={{tabBarLabel: 'TRENDING'}}
      />

      <Tab.Screen
        name="Nearby"
        component={NearBy}
        options={{tabBarLabel: 'NEARBY'}}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{tabBarLabel: 'FAVORITES'}}
      />
    </Tab.Navigator>
  );
}

export default TopBarNavigation;
