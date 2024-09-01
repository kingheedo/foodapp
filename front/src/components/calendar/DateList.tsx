import {colors} from '@/constants';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DateBox from './DateBox';
import {getDateFromHypenDate, getToday} from '@/utils/date';

interface DateListProps <T>{
  dates: string[];
  selectedDate: string;
  schedules: Record<number,T>;
  handlePressDate: (date: string) => void;
}

const DateList = <T,>({dates, selectedDate,schedules, handlePressDate}: DateListProps<T>) => {
  const today = getToday();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        numColumns={7}
        keyExtractor={item => String(item)}
        renderItem={({item: date}) => {
          const extractDate = getDateFromHypenDate(date);
          return(
            <DateBox
              date={date}
              isToday={date === today}
              hasSchedule={schedules ? (!!schedules[Number(extractDate)]) : false}
              selectedDate={selectedDate}
              handlePressDate={handlePressDate}
          />
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
});

export default DateList;
