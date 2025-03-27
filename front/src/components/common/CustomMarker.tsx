import {colorHex, colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import {MarkerColor} from '@/types/domain';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: MarkerColor;
}

const CustomMarker = ({coordinate, color, ...props}: CustomMarkerProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, {backgroundColor: colorHex[color]}]}></View>
    </View>
  );
  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: 32,
      height: 35,
      alignItems: 'center',
    },
    marker: {
      width: 28,
      height: 28,
      borderRadius: 27,
      borderBottomRightRadius: 1,
      borderWidth: 1,
      borderColor: colors[theme].BLACK,
      transform: [{rotate: '45deg'}],
    },
  });

export default CustomMarker;
