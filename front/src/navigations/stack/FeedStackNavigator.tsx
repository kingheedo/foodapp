import {ResponseSinglePost} from '@/api';
import HeaderButton from '@/components/HeaderButton';
import {colors, feedNavigations} from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type FeedStackParmList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {post: ResponseSinglePost};
};

const Stack = createStackNavigator<FeedStackParmList>();
const FeedStackNavigator = () => {
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
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerTitle: '피드',
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.openDrawer()}
              icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
            />
          ),
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default FeedStackNavigator;
