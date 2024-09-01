import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants';

const SignupScreen = () => {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {loginMutation, signupMutation} = useAuth();
  const {inputValues, blured, errors, getFormInputProps} = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = inputValues;
    signupMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () =>
          loginMutation.mutate({
            email,
            password,
          }),
        onError: error => Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
            visibilityTime: 2000
          })
        
      },
    );
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
          returnKeyType="next"
          blurOnSubmit={false}
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
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...getFormInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          secureTextEntry
          placeholder="비밀번호 확인"
          textContentType="oneTimeCode"
          error={errors.passwordConfirm}
          blured={blured.passwordConfirm}
          onSubmitEditing={handleSubmit}
          {...getFormInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
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

export default SignupScreen;
