import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

interface ScoreInputProps {
  score: number;
  handleScore: (value: number) => void;
}

const ScoreInput = ({score, handleScore}: ScoreInputProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점 선택</Text>
        <Text style={styles.labelText}>{score}</Text>
      </View>
      <Slider
        value={score}
        onValueChange={handleScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors[theme].PINK_700}
        maximumTrackTintColor={colors[theme].GRAY_300}
        thumbImage={require('@/assets/score-thumb.png')}
      />
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
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    labelText: {
      color: colors[theme].GRAY_700,
    },
  });

export default ScoreInput;
