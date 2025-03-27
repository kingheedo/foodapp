import {colors, mainNavigations} from '@/constants';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import FeedBottomTabNavigator, {
  FeedBottomTabParmList,
} from '../bottomTab/FeedBottomTabNavigator';
import DraweHeaderButton from '@/components/common/DraweHeaderButton';
import SettingStackNavigator, {
  SettingStackParamList,
} from '../stack/SettingStackNavigator';
import useThemeStore from '@/store/useThemeStore';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedBottomTabParmList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();
const MainDrawerNavigator = () => {
  const {theme} = useThemeStore();

  const DrawerIcon = (
    route: RouteProp<MainDrawerParamList>,
    focused: boolean,
  ) => {
    let iconName = '';
    switch (route.name) {
      case mainNavigations.HOME:
        iconName = 'map';
        break;
      case mainNavigations.FEED:
        iconName = 'feed';
        break;
      case mainNavigations.CALENDAR:
        iconName = 'calendar-month';
        break;
    }

    return iconName ? (
      <MaterialIcons
        name={iconName}
        size={20}
        color={focused ? colors[theme].BLACK : colors[theme].GRAY_500}
      />
    ) : null;
  };

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerType: 'front',
        drawerIcon: ({focused}) => DrawerIcon(route, focused),
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors[theme].WHITE,
        },
        drawerActiveBackgroundColor: '#cfe7e8',
        drawerActiveTintColor: colors[theme].BLACK,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        drawerItemStyle: {
          display: route.name !== mainNavigations.SETTING ? 'flex' : 'none',
        },
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedBottomTabNavigator}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={({navigation}) => ({
          title: '캘린더',
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeft: () => <DraweHeaderButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={({navigation}) => ({
          title: '',
        })}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
