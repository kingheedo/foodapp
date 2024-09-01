import Calendar from '@/components/calendar/Calendar';
import SelectedPostList from '@/components/calendar/SelectedPostList';
import HeaderButton from '@/components/common/HeaderButton';
import {colors} from '@/constants';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import {getMonthYearDetails, getNewMonthYear, getToday} from '@/utils/date';
import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';

const CalendarHomeScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState('');
  const {data: posts} = useGetCalendarPosts(
    monthYear.year,
    monthYear.month,
  );
  const navigation = useNavigation();

  /** 월 변경 핸들러
   *
   * 1. 변경한 월에 맞게 갱신
   */
  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  /** 현재 선택한 날짜
   * ex: 2024-01-01
   */
  const handlePressDate = (date: string) => {
    setSelectedDate(date);
  };

  /** 현재 날짜로 이동하는 함수 */
  const moveToToday = () => {
    setMonthYear(getMonthYearDetails(new Date()));
    setSelectedDate(getToday());
  }

  /**  
   * 오늘 버튼 클릭 시 현재 날짜로 이동하는 오른쪽 네비게이션 버튼 추가
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton onPress={moveToToday} label="오늘" />,
    })
  }, [])
  

  /** 특정 년도의 특정 달에 선택한 캘린더 게시물 */
  const selectedPosts = useMemo(() => {
    const splitedDate = selectedDate.split('-');
    const targetDay = Number(selectedDate.split('-')[2]);
    if (
      Number(splitedDate[0]) === monthYear.year &&
      Number(splitedDate[1]) === monthYear.month &&
      posts
    ) {
      return posts[targetDay] ?? [];
    }
    return [];
  }, [selectedDate, monthYear.year, monthYear.month, posts]);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        selectedDate={selectedDate}
        schedules={posts || []}
        handlePressDate={handlePressDate}
        onChangMonth={handleUpdateMonth}
      />
      {/* 선택한 날짜에 대한 post가 와야함 */}
      <SelectedPostList posts={selectedPosts}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
