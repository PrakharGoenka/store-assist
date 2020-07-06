import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import Home from './components/Home';
import Assist from './components/Assist';
import Subsection from './components/Subsection';
import Cart from './components/Cart';
import BarCode from './components/BarCode';

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
          options={
            ({route, navigation}) => ({
              headerTitle: props => (
                <Header 
                  {...props} 
                  title={"Store Assist"} 
                  navigation={navigation}
                />
              )
            })
          }
        />
        <Stack.Screen
          name="Subsection"
          component={Subsection}
          options={
            ({route, navigation}) => ({
              headerTitle: props => (
                <Header 
                  {...props} 
                  title={route.params.subsection} 
                  navigation={navigation}
                />
              )
            })
          }
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'View Cart' }}
        />
        <Stack.Screen
          name="BarCode"
          component={BarCode}
          options={{ title: 'Welcome' }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}
