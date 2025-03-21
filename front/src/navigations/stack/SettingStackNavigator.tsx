import {colors, settingNavigatons} from '@/constants';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import DraweHeaderButton from '@/components/common/DraweHeaderButton';
import useAuth from '@/hooks/queries/useAuth';

export type SettingStackParamList = {
  [settingNavigatons.SETTING_HOME]: undefined;
  [settingNavigatons.EDIT_PROFILE]: undefined;
  [settingNavigatons.EDIT_CATEGORY]: undefined;
  [settingNavigatons.DELETE_ACCOUNT]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.GRAY_100,
        },
        headerStyle: {
          shadowColor: 'gray',
          backgroundColor: colors.WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
      }}>
      <Stack.Screen
        name={settingNavigatons.SETTING_HOME}
        component={SettingHomeScreen}
        options={({navigation}) => ({
          title: '설정',
          headerTitleAlign: 'center',
          headerLeft: () => <DraweHeaderButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={settingNavigatons.EDIT_PROFILE}
        component={EditProfileScreen}
        options={({navigation}) => ({
          headerTitle: '프로필 수정',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={settingNavigatons.EDIT_CATEGORY}
        component={EditCategoryScreen}
        options={({navigation}) => ({
          headerTitle: '카테고리 설정',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={styles.headerRightButton}>
              <Pressable>
                <Text>완료</Text>
              </Pressable>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={settingNavigatons.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={({navigation}) => ({
          headerTitle: '회원탈퇴',
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightButton: {
    width: 50,
    alignItems: 'center',
  },
});

export default SettingStackNavigator;
