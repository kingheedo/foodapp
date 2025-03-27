import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
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
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={[styles.itemContainer, isLast && styles.lastItemContainer]}
      {...props}>
      {icon}
      <Text style={[textStyle, styles.itemStyle]}>{label}</Text>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      backgroundColor: colors[theme].WHITE,
      borderBlockColor: '#D6D6D6',
    },
    lastItemContainer: {
      borderBottomWidth: 1,
    },
    itemStyle: {
      color: colors[theme].BLACK,
    },
  });

export default SettingItem;
