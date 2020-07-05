import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Assist from './components/Assist';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }
          }
        />
        <Stack.Screen
          name="Assist"
          component={Assist}
          options={{ title: 'Store Assist' }}
        />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}
