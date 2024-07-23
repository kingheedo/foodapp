import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';

const SignupScreen = () => {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {inputValues, blured, errors, getFormInputProps} = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    console.log(inputValues);
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
