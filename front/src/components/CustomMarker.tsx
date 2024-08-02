import {colors} from '@/constants';
import {MarkerColor} from '@/types/domain';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker, MyMapMarkerProps} from 'react-native-maps';

interface CustomMarkerProps extends MyMapMarkerProps {
  coordinate?: LatLng;
  color: MarkerColor;
}

const colorHex = {
  RED: colors.PINK_400,
  YELLOW: colors.YELLOW_400,
  GREEN: colors.GREEN_400,
  BLUE: colors.BLUE_400,
  PURPLE: colors.PURPLE_400,
};

const CustomMarker = ({coordinate, color, ...props}: CustomMarkerProps) => {
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

const styles = StyleSheet.create({
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
    borderColor: colors.BLACK,
    transform: [{rotate: '45deg'}],
  },
});

export default CustomMarker;
