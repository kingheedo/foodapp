import React from 'react';
import {StyleSheet} from 'react-native';
import {colors, feedNavigations} from '@/constants';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import FeedSearchScreen from '@/screens/feed/FeedSearchScreen';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '@/components/common/HeaderButton';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../drawer/MainDrawerNavigator';

export type FeedBottomTabParmList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_SEARCH]: undefined;
  [feedNavigations.FEED_FAVORITE]: undefined;
};

type FeedBottomTabNavigatorProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<FeedBottomTabParmList>,
    DrawerNavigationProp<MainDrawerParamList>
  >;
};

const Tab = createBottomTabNavigator<FeedBottomTabParmList>();
const FeedBottomTabNavigator = ({navigation}: FeedBottomTabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <HeaderButton
            style={{
              marginLeft: 20,
            }}
            onPress={() => navigation.openDrawer()}
            icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
          />
        ),
      }}>
      <Tab.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={{
          headerTitle: '피드',
        }}
      />
      <Tab.Screen
        name={feedNavigations.FEED_SEARCH}
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
        name={feedNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Octicons
              name="star-fill"
              color={focused ? colors.CYAN_700 : colors.GRAY_300}
              size={26}
            />
          ),
          headerTitle: '즐겨찾기',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default FeedBottomTabNavigator;
