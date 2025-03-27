import React, {useEffect} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InputField from '@/components/common/InputField';
import {
  colors,
  errorMessages,
  mainNavigations,
  settingNavigatons,
} from '@/constants';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateEditProfile} from '@/utils';
import useDeviceImage from '@/hooks/useDeviceImage';
import backUrl from '@/utils/backUrl';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

const EditProfileScreen = ({navigation}: EditProfileScreenProps) => {
  const {getProfileQuery, updateProfileMutation} = useAuth();
  const {nickname, imageUri, kakaoImageUri} = getProfileQuery.data ?? {};
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const editProfile = useForm({
    initialValue: {
      nickname: nickname ?? '',
    },
    validate: validateEditProfile,
  });

  const imagePicker = useDeviceImage({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
  });

  const handleProfileImage = () => {
    imagePicker.handleImageLibrary();
    Keyboard.dismiss();
  };

  const handleUpdateProfile = () => {
    updateProfileMutation.mutate(
      {
        ...editProfile.inputValues,
        imageUri: imagePicker.imageUris[0]?.uri,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '프로필이 변경되었습니다.',
            position: 'bottom',
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
          });
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightButtonContainer}>
          <Pressable onPress={handleUpdateProfile}>
            <Text>완료</Text>
          </Pressable>
        </View>
      ),
    });
  }, [nickname, imagePicker.imageUris]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Pressable onPress={handleProfileImage}>
            {imagePicker?.imageUris?.length > 0 ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: `${backUrl}/${imagePicker.imageUris[0]?.uri}`,
                }}
                resizeMode="cover"
              />
            ) : kakaoImageUri ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: `${backUrl}/${kakaoImageUri}`,
                }}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.blankProfileImage, styles.profileImage]}>
                <Ionicons
                  name="camera-outline"
                  color={colors[theme].GRAY_500}
                  size={24}
                />
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.nameInputContainer}>
          <InputField
            placeholder="닉네임을 입력해주세요."
            {...editProfile.getFormInputProps('nickname')}
            error={editProfile.errors.nickname}
            blured={editProfile.blured.nickname}
          />
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerRightButtonContainer: {
      width: 50,
      alignItems: 'center',
    },
    profileContainer: {
      marginTop: 30,
      flex: 1,
      alignItems: 'center',
      gap: 60,
    },
    profileImageContainer: {
      width: 100,
      height: 100,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
    blankProfileImage: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
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
      color: colors[theme].RED_500,
    },
  });

export default EditProfileScreen;
