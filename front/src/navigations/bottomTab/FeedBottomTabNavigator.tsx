import React from 'react';
import {StyleSheet} from 'react-native';
import {colors, feedBottomTabNavigations, feedNavigations} from '@/constants';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedSearchScreen from '@/screens/feed/FeedSearchScreen';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '@/components/common/HeaderButton';
import {
  CompositeNavigationProp,
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../drawer/MainDrawerNavigator';
import FeedStackNavigator from '../stack/FeedStackNavigator';

export type FeedBottomTabParmList = {
  [feedBottomTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL;
    params: {id: number};
    initial: boolean;
  };
  [feedBottomTabNavigations.FEED_SEARCH]: undefined;
  [feedBottomTabNavigations.FEED_FAVORITE]: undefined;
};

type FeedBottomTabNavigatorProps = CompositeNavigationProp<
  BottomTabNavigationProp<FeedBottomTabParmList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const getScreenOptions = ({
  route,
  navigation,
}: {
  route: RouteProp<FeedBottomTabParmList>;
  navigation: FeedBottomTabNavigatorProps;
}): BottomTabNavigationOptions => ({
  tabBarShowLabel: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.GRAY_200,
  },
  headerTitleStyle: {
    fontSize: 15,
  },
  headerTintColor: colors.BLACK,
  tabBarActiveTintColor: colors.CYAN_700,
  tabBarStyle: {
    backgroundColor: colors.WHITE,
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabBarIcon: ({focused}) => {
    let iconName = '';
    switch (route.name) {
      case feedBottomTabNavigations.FEED_HOME:
        iconName = 'browser';
        break;
      case feedBottomTabNavigations.FEED_SEARCH:
        iconName = 'search';
        break;

      case feedBottomTabNavigations.FEED_FAVORITE:
        iconName = 'star-fill';
        break;
    }
    return (
      <Octicons
        name={iconName}
        size={25}
        color={focused ? colors.CYAN_700 : colors.GRAY_300}
      />
    );
  },
});

const Tab = createBottomTabNavigator<FeedBottomTabParmList>();
const FeedBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) =>
        getScreenOptions({route, navigation})
      }>
      <Tab.Screen
        name={feedBottomTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({route, navigation}) => ({
          headerTitle: '',
          headerShown: false,
          headerLeft: () => (
            <HeaderButton
              style={{
                marginLeft: 20,
              }}
              onPress={() => navigation.openDrawer()}
              icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
            />
          ),
          tabBarStyle: (tabRoute => {
            const routeName = getFocusedRouteNameFromRoute(tabRoute);
            if (
              routeName === feedNavigations.FEED_DETAIL ||
              routeName === feedNavigations.IMAGE_ZOOM ||
              routeName === feedNavigations.POST_EDIT
            ) {
              return {display: 'none'};
            }
            return {
              backgroundColor: colors.WHITE,
              borderTopColor: colors.GRAY_200,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedBottomTabNavigations.FEED_SEARCH}
        component={FeedSearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Octicons
              name="search"
              size={25}
              color={focused ? colors.CYAN_700 : colors.GRAY_300}
            />
          ),
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={feedBottomTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          tabBarIcon: ({focused}) => (
            <Octicons
              name="star-fill"
              color={focused ? colors.CYAN_700 : colors.GRAY_300}
              size={26}
            />
          ),
          headerTitle: '즐겨찾기',
          headerLeft: () => (
            <HeaderButton
              style={{
                marginLeft: 20,
              }}
              onPress={() => navigation.openDrawer()}
              icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default FeedBottomTabNavigator;
