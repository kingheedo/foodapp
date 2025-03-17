import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InputField from '@/components/common/InputField';
import {colors, mainNavigations, settingNavigatons} from '@/constants';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type EditProfileScreenProps = StackScreenProps<
  SettingStackParamList,
  typeof settingNavigatons.EDIT_PROFILE
>;

const EditProfileScreen = ({navigation}: EditProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={require('@/assets/user-default.png')} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera-outline" color={colors.WHITE} size={17} />
          </View>
        </View>

        <View style={styles.nameInputContainer}>
          <InputField placeholder="닉네임을 입력해주세요." />
        </View>
      </View>
      <View style={styles.deleteAccount}>
        <Pressable
          onPress={() => navigation.navigate(settingNavigatons.DELETE_ACCOUNT)}>
          <Text style={styles.deleteAccountText}>회원탈퇴</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    gap: 60,
  },
  profileImageContainer: {
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 26,
    height: 26,
    backgroundColor: colors.RED_500,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInputContainer: {
    width: '100%',
  },
  deleteAccount: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteAccountText: {
    color: colors.RED_500,
  },
});

export default EditProfileScreen;
