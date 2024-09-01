import {colors} from '@/constants';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const DayOfWeeks = () => {
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

const styles = StyleSheet.create({
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
    color: colors.BLACK,
  },
  staturdayText: {
    color: colors.BLUE_500,
  },
  sunddayText: {
    color: colors.RED_500,
  },
});

export default DayOfWeeks;
