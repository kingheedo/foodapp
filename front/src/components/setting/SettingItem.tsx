import {colors} from '@/constants';
import React, {ReactNode} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface SettingItemProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  label: string;
  isLast?: boolean;
}

const SettingItem = ({
  textStyle = null,
  icon = null,
  label,
  isLast = false,
  ...props
}: SettingItemProps) => {
  return (
    <Pressable
      style={[styles.itemContainer, isLast && styles.lastItemContainer]}
      {...props}>
      {icon}
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    backgroundColor: colors.WHITE,
    borderBlockColor: '#D6D6D6',
    color: colors.BLACK,
  },
  lastItemContainer: {
    borderBottomWidth: 1,
  },
});

export default SettingItem;
