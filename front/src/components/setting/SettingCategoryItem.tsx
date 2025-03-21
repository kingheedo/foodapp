import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import InputField from '../common/InputField';
import {GetFormInputProps} from '@/hooks/useForm';

interface SettingCategoryItemProps extends GetFormInputProps<string> {
  placeholder?: string;
  markerStyle?: StyleProp<ViewStyle>;
  error: string;
  blured: boolean;
}

const SettingCategoryItem = ({
  placeholder,
  markerStyle = null,
  value,
  error,
  blured,
  ...props
}: SettingCategoryItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, markerStyle]} />
      <View style={{flex: 1}}>
        <InputField
          placeholder={`ex) ${placeholder}`}
          value={value.toString()}
          error={error}
          blured={blured}
          {...props}
        />
      </View>
    </View>
  );
};

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
