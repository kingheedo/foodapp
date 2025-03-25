import React, {forwardRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import InputField from '../common/InputField';

interface SettingCategoryItemProps extends TextInputProps {
  placeholder?: string;
  markerStyle?: StyleProp<ViewStyle>;
  error: string;
  blured: boolean;
  value: string;
}

const SettingCategoryItem = forwardRef<TextInput, SettingCategoryItemProps>(
  (
    {
      placeholder,
      markerStyle = null,
      value,
      error,
      blured,
      ...props
    }: SettingCategoryItemProps,
    ref,
  ) => {
    return (
      <View style={styles.container}>
        <View style={[styles.circle, markerStyle]} />
        <View style={{flex: 1}}>
          <InputField
            ref={ref}
            placeholder={`ex) ${placeholder}`}
            value={value}
            error={error}
            blured={blured}
            {...props}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
});

export default SettingCategoryItem;
