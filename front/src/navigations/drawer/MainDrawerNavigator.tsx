import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {mainNavigations} from '../../constants';
import MapHomeScreen from '../../screens/map/MapHomeScreen';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '../../screens/calendar/CalendarHomeScreen';

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
