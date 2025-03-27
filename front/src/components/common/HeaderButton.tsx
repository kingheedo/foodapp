import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import React, {ReactNode} from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  label?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

const HeaderButton = ({label, icon, hasError, ...props}: HeaderButtonProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!label && icon}
      {!icon && label && (
        <Text style={[styles.text, hasError && styles.textError]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 15,
      fontWeight: '500',
      color: colors[theme].CYAN_700,
    },
    textError: {
      color: colors[theme].GRAY_200,
    },
  });

export default HeaderButton;
