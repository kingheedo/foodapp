import React from 'react';
import {colors} from '@/constants';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DayOfWeeks from './DayOfWeeks';
import {MonthYear} from '@/utils/date';
import useModal from '@/hooks/useModal';
import DateList from './DateList';
import { ResponseCalendarPost } from '@/api';
import YearsModal from './YearsModal';
interface CalendarProps {
  monthYear: MonthYear;
  selectedDate: string;
  schedules: ResponseCalendarPost;
  onChangMonth: (increment: number) => void;
  handlePressDate: (date: string) => void;
}

const Calendar = ({
  monthYear,
  selectedDate,
  schedules,
  onChangMonth,
  handlePressDate,
}: CalendarProps) => {
  const {month, year, wholeDates} = monthYear;
  const monthYearModal = useModal();

  /** 연도 선택시 해당 년도로 변경 */
  const handleYear = (selectedYear: number) => {
    onChangMonth((selectedYear - year) * 12);
    monthYearModal.handleClose();
  };

  /** 월,년도 토글 버튼 클릭 시 */
  const handleMonthYearToggle = () => {
    monthYearModal.handleOpen();
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangMonth(-1)}
          style={styles.monthButtonContainer}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={25}
            color={colors.BLACK}
          />
        </Pressable>
        <Pressable
          onPress={handleMonthYearToggle}
          style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable
          onPress={() => onChangMonth(1)}
          style={styles.monthButtonContainer}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={25}
            color={colors.BLACK}
          />
        </Pressable>
      </View>
      <DayOfWeeks />
      <DateList
        dates={wholeDates}
        schedules={schedules}
        selectedDate={selectedDate}
        handlePressDate={handlePressDate}
      />
      <YearsModal 
        open={monthYearModal.open} 
        handleClose={monthYearModal.handleClose}
        currentYear={monthYear.year}
        handleYear={handleYear}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthButtonContainer: {
    padding: 10,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export default Calendar;
