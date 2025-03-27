import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const DayOfWeeks = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토', '일'].map((dayOfWeek, i) => {
        return (
          <View key={i} style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === '토' && styles.staturdayText,
                dayOfWeek === '일' && styles.sunddayText,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    item: {
      width: Dimensions.get('window').width / 7,
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
      color: colors[theme].BLACK,
    },
    staturdayText: {
      color: colors[theme].BLUE_500,
    },
    sunddayText: {
      color: colors[theme].RED_500,
    },
  });

export default DayOfWeeks;
