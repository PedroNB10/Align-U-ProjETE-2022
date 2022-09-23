import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Incio"
        component={CollectData}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          headerShown: false,
        }}  
      /> 
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}  
      />  
    </Tab.Navigator>
  );
}