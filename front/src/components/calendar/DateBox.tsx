import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import {getDateFromHypenDate} from '@/utils/date';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface DateBoxProps {
  date: string;
  isToday: boolean;
  selectedDate: string;
  hasSchedule: boolean;
  handlePressDate: (date: string) => void;
}

const DateBox = ({
  date,
  isToday,
  selectedDate,
  hasSchedule,
  handlePressDate,
}: DateBoxProps) => {
  const extractDate = getDateFromHypenDate(date);
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.container} onPress={() => handlePressDate(date)}>
      <View
        style={[
          styles.dateCotainer,
          selectedDate === date && styles.selectedContainer,
          selectedDate === date && isToday && styles.selectedTodayContainer,
        ]}>
        <Text
          style={[
            styles.dateText,
            selectedDate === date && styles.selectedDateText,
            isToday && styles.todayText,
            selectedDate === date && isToday && styles.selectedTodayText,
          ]}>
          {extractDate}
        </Text>
        {hasSchedule && <View style={styles.dot} />}
      </View>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width / 7,
      height: Dimensions.get('window').width / 7,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateCotainer: {
      position: 'relative',
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedContainer: {
      borderRadius: 28,
      backgroundColor: colors[theme].BLACK,
    },
    selectedTodayContainer: {
      backgroundColor: colors[theme].CYAN_700,
    },
    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    selectedDateText: {
      color: colors[theme].WHITE,
    },
    todayText: {
      color: colors[theme].CYAN_700,
      fontWeight: 'bold',
    },
    selectedTodayText: {
      color: colors[theme].WHITE,
    },
    dot: {
      position: 'absolute',
      bottom: -8,
      borderRadius: 6,
      width: 6,
      height: 6,
      backgroundColor: colors[theme].GRAY_500,
    },
  });

export default DateBox;
