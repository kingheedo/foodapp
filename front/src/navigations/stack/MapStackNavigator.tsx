import HeaderButton from '@/components/HeaderButton';
import {mapNavigations} from '@/constants';
import AddPostScreen from '@/screens/map/AddPostScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {Pressable, Text, View} from 'react-native';
import {LatLng} from 'react-native-maps';

// 전달하고자 파라미터가 없을떄는 undefined
export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
};

const Stack = createStackNavigator<MapStackParamList>();
const MapStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
