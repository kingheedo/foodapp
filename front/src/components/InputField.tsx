import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '../constants';

interface IInputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  blured?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = ({
  disabled = false,
  error,
  blured = false,
  ...props
}: IInputFieldProps) => {
  return (
    <View>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          blured && !!error && styles.inputError,
        ]}>
        <TextInput
          editable={!disabled}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
      </View>
      {blured && !!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  input: {
    backgroundColor: colors.WHITE,
    fontSize: 16,
    color: colors.BLACK,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
