import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils';
import {TextInput} from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants';

const LoginScreen = () => {
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();
  const {inputValues, blured, errors, getFormInputProps} = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  /** 폼 제춣 핸들러 */
  const handleSubmit = () => {
    loginMutation.mutate(inputValues, {
      onError: (error) => Toast.show({
        type: 'error',
        text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
        position: 'bottom',
        visibilityTime: 2000
      })
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          inputMode="email"
          placeholder="이메일"
          error={errors.email}
          blured={blured.email}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...getFormInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          secureTextEntry
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={errors.password}
          blured={blured.password}
          blurOnSubmit={false}
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...getFormInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        size="large"
        variant="filled"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
