import { View, Image, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import styles from './style';
import { NavigationHelpersContext } from '@react-navigation/native';

export default function NavBarIcons({navigation}) {
  
  return (
    <View>
      <View>
      <FontAwesome 
        name="home"
        size={24}
        color="black"
      />
      <Text>Home</Text>
      </View>
      <View>  
      <FontAwesome name="bar-chart" size={24} color="black" />
      </View>
      <View>
      <FontAwesome name="user" size={24} color="black" />
      
      </View>
    </View>
  );
}

