import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants';
import {MarkerColor} from '@/types/domain';
import CustomMarker from '@/components/common/CustomMarker';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

interface MarkerSelectorProps {
  markerColor: MarkerColor;
  handleSelectMarker: (color: MarkerColor) => void;
}

const markerList: MarkerColor[] = ['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'];

const MarkerSelector = ({
  markerColor,
  handleSelectMarker,
}: MarkerSelectorProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.markerLabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {markerList.map(color => (
            <Pressable
              key={color}
              style={[
                styles.markerBox,
                markerColor === color && styles.pressedMarker,
              ]}
              onPress={() => handleSelectMarker(color)}>
              <CustomMarker color={color} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: 15,
    },
    markerLabel: {
      marginBottom: 15,
      color: colors[theme].GRAY_700,
    },
    markerInputScroll: {
      flexDirection: 'row',
      gap: 20,
    },
    markerBox: {
      width: 50,
      height: 50,
      backgroundColor: colors[theme].GRAY_200,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },
    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].RED_500,
    },
  });

export default MarkerSelector;
