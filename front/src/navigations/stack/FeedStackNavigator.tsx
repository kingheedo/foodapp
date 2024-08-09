import {colors, feedNavigations} from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import FeedBottomTabNavigator from '../bottomTab/FeedBottomTabNavigator';

export type FeedStackParmList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
};

const Stack = createStackNavigator<FeedStackParmList>();
const FeedStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: colors.WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedBottomTabNavigator}
        options={({route, navigation}) => ({
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerShown: false,
          // headerLeft: () => (
          //   <HeaderButton
          //     onPress={() => navigation.openDrawer()}
          //     icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
          //   />
          // ),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerTitle: '',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default FeedStackNavigator;
