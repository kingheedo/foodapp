import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import InputField from '../common/InputField';

interface SettingCategoryItemProps {
  content?: string;
  markerStyle?: StyleProp<ViewStyle>;
}

const SettingCategoryItem = ({
  content,
  markerStyle = null,
}: SettingCategoryItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, markerStyle]} />
      <View style={{flex: 1}}>
        <InputField placeholder={`ex) ${content}`} />
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
