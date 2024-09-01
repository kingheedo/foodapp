import {colors} from '@/constants';
import { getDateFromHypenDate } from '@/utils/date';
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
        {hasSchedule && <View style={styles.dot}/>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 7,
    height: Dimensions.get('window').width / 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
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
    backgroundColor: colors.BLACK,
  },
  selectedTodayContainer: {
    backgroundColor: colors.CYAN_700,
  },
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
  selectedDateText: {
    color: colors.WHITE,
  },
  todayText: {
    color: colors.CYAN_700,
    fontWeight: 'bold',
  },
  selectedTodayText: {
    color: colors.WHITE,
  },
  dot:{
    position: 'absolute',
    bottom: -8,
    borderRadius: 6,
    width: 6,
    height: 6,
    backgroundColor: colors.GRAY_500
  }
});

export default DateBox;
