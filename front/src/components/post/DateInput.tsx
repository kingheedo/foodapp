import React from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {OptionModal} from '../common/OptionModal';

interface DateInputProps {
  date: Date;
  open: boolean;
  handleDate: (date: Date) => void;
  handleConfirm: () => void;
}

const DateInput = ({date, open, handleDate, handleConfirm}: DateInputProps) => {
  return (
    <OptionModal open={open} btnLabel="선택완료" handleConfirm={handleConfirm}>
      <View style={styles.datePickerContainer}>
        <DatePicker
          mode="date"
          locale="ko"
          date={date}
          title={null}
          cancelText="취소"
          confirmText="선택완료"
          onDateChange={handleDate}
        />
      </View>
    </OptionModal>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    alignItems: 'center',
  },
});

export default DateInput;
