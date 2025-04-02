import {colors} from '@/constants';
import React from 'react';
import {ActivityIndicator, StyleSheet, View, ViewProps} from 'react-native';

interface LoaderProps extends ViewProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loader = ({
  children,
  size = 'small',
  color = colors.light.GRAY_500,
  ...props
}: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={color}
        style={styles.indicator}
        {...props}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginBottom: 20,
  },
});

export default Loader;
