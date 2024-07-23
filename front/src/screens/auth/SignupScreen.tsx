import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';

const SignupScreen = () => {
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
          inputMode="email"
          placeholder="이메일"
          error={errors.email}
          blured={blured.email}
          {...getFormInputProps('email')}
        />
        <InputField
          secureTextEntry
          placeholder="비밀번호"
          error={errors.password}
          blured={blured.password}
          {...getFormInputProps('password')}
        />
        <InputField
          secureTextEntry
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
          blured={blured.passwordConfirm}
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
