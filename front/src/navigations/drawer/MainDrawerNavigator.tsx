import {mainNavigations} from '@/constants';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator();
const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={mainNavigations.MAP_HOME}
        component={MapHomeScreen}
      />
      <Drawer.Screen
        name={mainNavigations.FEED_HOME}
        component={FeedHomeScreen}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR_HOME}
        component={CalendarHomeScreen}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
