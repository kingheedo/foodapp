import {colors, feedNavigations} from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import {LatLng} from 'react-native-maps';
import ImageZoomScreen from '@/components/feed/ImageZoomScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import HeaderButton from '@/components/common/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type FeedStackParmList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.POST_EDIT]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
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
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
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
      <Stack.Screen
        name={feedNavigations.POST_EDIT}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default FeedStackNavigator;
