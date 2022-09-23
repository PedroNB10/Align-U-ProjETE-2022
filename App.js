import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/pages/Login/Index';
import CreateUser from './src/pages/CreateUser/index';
import CollectData from './src/pages/CollectData/Index';
import History from './src/pages/History/index';
import Profile from './src/pages/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Tabs() {
  return(
    <Tab.Navigator initialRouteName="collectData">
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarLabel: "Histórico",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
            name="data-usage"
            color={ color }
            size={26}
          />
          )
        }}  
      />
      <Tab.Screen
        name="collectData"
        component={CollectData}
        options={{
          tabBarLabel: "Tela Inicial",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              name="roofing"
              color={ color }
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              name="person-pin"
              color={ color }
              size={26}
            />
          )
        }}  
      />  
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
          tabShown: false,
        }}
      />
    
      <Stack.Screen
        name="createUser"
        component={CreateUser}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="history"
        component={History}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
