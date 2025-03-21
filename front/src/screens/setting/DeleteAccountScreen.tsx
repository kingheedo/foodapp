import CustomButton from '@/components/common/CustomButton';
import {alerts, colors, errorMessages} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

interface DeleteAccountScreenProps {}

const DeleteAccountScreen = ({}: DeleteAccountScreenProps) => {
  const {deleteAccountMutation} = useAuth();

  const handleDeleteAccount = () => {
    Alert.alert(
      alerts.DELELTE_ACCOUNT.title,
      alerts.DELELTE_ACCOUNT.description,
      [
        {
          text: '탈퇴',
          onPress: () =>
            deleteAccountMutation.mutate(null, {
              onSuccess: () =>
                Toast.show({
                  type: 'success',
                  text1: '탈퇴가 완료되었습니다.',
                  position: 'bottom',
                }),
              onError: error =>
                Toast.show({
                  type: 'error',
                  text1:
                    error.response?.data.message ||
                    errorMessages.UNEXPECT_ERROR,
                  position: 'bottom',
                }),
            }),
          style: 'destructive',
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            저장된 데이터를 모두 삭제해야 회원탈퇴가 가능해요.{'\n'}
            피드에 저장된 장소가 남아있다면 삭제해주세요.
          </Text>
        </View>
        <CustomButton label="회원탈퇴" onPress={handleDeleteAccount} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    gap: 20,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: colors.PINK_700,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  text: {
    color: colors.PINK_700,
    textAlign: 'center',
  },
});

export default DeleteAccountScreen;
