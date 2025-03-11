import {mapNavigations} from '@/constants';
import AddPostScreen from '@/screens/map/AddPostScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

// 전달하고자 파라미터가 없을떄는 undefined
export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
  [mapNavigations.SEARCH_LOCATION]: undefined;
};
const options: StackNavigationOptions = {
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
};

const Stack = createStackNavigator<MapStackParamList>();
const MapStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options}>
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
      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          presentation: 'modal',
          headerTitle: '장소 검색',
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
