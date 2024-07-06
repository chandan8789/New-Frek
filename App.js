import React, { useState } from 'react';
import Signup from './compontents/auth/Signup';
import Login from './compontents/auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './compontents/pages/Header';
import StreamChat from './compontents/pages/StreamChat';
import About from './compontents/pages/About';
import Chating from './compontents/pages/Chating';
import LiveStreaming from './compontents/pages/LiveStreaming';
import Profile from './compontents/pages/Profile';
import LiveHeader from './compontents/pages/LiveHeader';
import TopBarNavigator from './compontents/Navigator/TopBarNavigation';
import Question from './compontents/auth/Question';
import LogoComponent from './compontents/pages/LogoComponent';
import AudiencePage from './compontents/stream/screen/AudiancePage';
import HomePage from './compontents/stream/screen/HomePage';
import HostPage from './compontents/stream/screen/HostPage';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogoComponent" component={LogoComponent} />

        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Header" component={Header} />

        <Stack.Screen name="Stream-Chat" component={StreamChat} />

        <Stack.Screen name="Chating" component={Chating} />

        <Stack.Screen name="About" component={About} />

        <Stack.Screen name="Live-Streaming" component={LiveStreaming} />

        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen name="live-header" component={LiveHeader} />

        <Stack.Screen name="topBar-Navigation" component={TopBarNavigator} />

        <Stack.Screen name="Audiance" component={AudiencePage} />
        <Stack.Screen name="Home-Page" component={HomePage} />
        <Stack.Screen name="Host" component={HostPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
