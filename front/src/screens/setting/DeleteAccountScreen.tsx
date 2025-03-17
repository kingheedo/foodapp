import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface DeleteAccountScreenProps {}

const DeleteAccountScreen = ({}: DeleteAccountScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            저장된 데이터를 모두 삭제해야 회원탈퇴가 가능해요.{'\n'}
            피드에 저장된 장소가 남아있다면 삭제해주세요.
          </Text>
        </View>
        <CustomButton label="회원탈퇴" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    marginHorizontal: 20,
    gap: 20,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: colors.RED_500,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  text: {
    color: colors.RED_500,
    textAlign: 'center',
  },
});

export default DeleteAccountScreen;
