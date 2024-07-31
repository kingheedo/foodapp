import {colors} from '@/constants';
import React, {ReactNode, useEffect} from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  label?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

const HeaderButton = ({label, icon, hasError, ...props}: HeaderButtonProps) => {
  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!label && icon}
      {!icon && label && (
        <Text style={[styles.text, hasError && styles.textError]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.CYAN_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});

export default HeaderButton;
