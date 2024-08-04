import {colors} from '@/constants';
import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DateInputProps {
  date: Date;
  open: boolean;
  handleDate: (date: Date) => void;
  handleConfirm: () => void;
}

const DateInput = ({date, open, handleDate, handleConfirm}: DateInputProps) => {
  return (
    <Modal visible={open} transparent animationType="slide">
      <SafeAreaView style={styles.background}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
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
        </View>
        <View style={styles.optionContainer}>
          <Pressable style={styles.optionButton} onPress={handleConfirm}>
            <Text style={styles.optionButtonText}>선택완료</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  optionContainer: {
    backgroundColor: colors.GRAY_100,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  pickerContainer: {
    alignItems: 'center',
  },
  optionButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
});

export default DateInput;
