import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CoinsScreen from './src/screens/Coins'
import NewsScreen from './src/screens/News'

export default function App() {

  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer theme={{colors:{background:"white"}}}>
      <Tab.Navigator >
        <Tab.Screen name="NewsScreen" component={NewsScreen} options={{title: 'News',tabBarIcon:"newspaper"}}/>
        <Tab.Screen name="CoinsScreen" component={CoinsScreen} options={{title: 'Coins',tabBarIcon:"bitcoin"}}/>
      </Tab.Navigator>
      
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
