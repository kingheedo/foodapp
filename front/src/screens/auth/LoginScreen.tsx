import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';

interface LoginScreenProps {}

const LoginScreen = ({}: LoginScreenProps) => {
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
  });
  const [blured, setBlured] = useState({
    email: false,
    password: false,
  });

  const handleInput = (name: string, text: string) => {
    setInputVal({
      ...inputVal,
      [name]: text,
    });
  };

  const handleBlured = (name: string) => {
    setBlured({
      ...blured,
      [name]: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          inputMode="email"
          placeholder="이메일"
          error="이메일을 입력하세요"
          value={inputVal.email}
          onChangeText={text => handleInput('email', text)}
          blured={blured.email}
          onBlur={() => handleBlured('email')}
        />
        <InputField
          secureTextEntry
          placeholder="비밀번호"
          error="비밀번호를 입력하세요"
          value={inputVal.password}
          onChangeText={text => handleInput('password', text)}
          blured={blured.password}
          onBlur={() => handleBlured('password')}
        />
      </View>
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
  },
});

export default LoginScreen;
