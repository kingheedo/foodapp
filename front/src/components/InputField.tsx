import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '@/constants';

interface IInputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  blured?: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {
      disabled = false,
      error,
      blured = false,
      icon = null,
      ...props
    }: IInputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    return (
      <View>
        <View
          style={[
            styles.container,
            Boolean(icon) && styles.innerContainer,
            props.multiline && styles.multiline,
            disabled && styles.disabled,
            blured && !!error && styles.inputError,
          ]}>
          {icon}
          <TextInput
            ref={ref}
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
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 5,
  },
  multiline: {
    paddingBottom: deviceHeight > 700 ? 45 : 30,
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
