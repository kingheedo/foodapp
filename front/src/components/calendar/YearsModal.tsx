import React, {useEffect, useState} from 'react';
import {colors} from '@/constants';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {numbers} from '@/constants/numbers';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

interface YearsModalProps {
  open: boolean;
  currentYear: number;
  handleYear: (selectedYear: number) => void;
  handleClose: () => void;
}

const YearsModal = ({
  open,
  currentYear,
  handleYear,
  handleClose,
}: YearsModalProps) => {
  const [scrollY, setScrollY] = useState(0);
  const {theme} = useThemeStore();
  const styles = styling(theme);

  useEffect(() => {
    setScrollY(Math.floor((currentYear - numbers.MIN_CALENDAR_YEAR) / 4) * 50);
  }, [open, currentYear]);

  return (
    open && (
      <View style={styles.container}>
        <FlatList
          data={Array.from(
            {length: numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1},
            (_, index) => ({
              id: index,
              num: numbers.MIN_CALENDAR_YEAR + index,
            }),
          )}
          initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
          contentOffset={{x: 0, y: scrollY}}
          renderItem={({item}) => (
            <YearBox
              isCurrent={currentYear === item.num}
              handleYear={handleYear}
              item={item.num}
            />
          )}
          numColumns={4}
          keyExtractor={item => String(item.num)}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>닫기</Text>
          <MaterialIcons
            name="keyboard-arrow-up"
            size={20}
            color={colors[theme].GRAY_500}
          />
        </Pressable>
      </View>
    )
  );
};

interface IYearBoxProps {
  isCurrent: boolean;
  item: number;
  handleYear: (selectedYear: number) => void;
}

const YearBox = ({isCurrent, item, handleYear}: IYearBoxProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      onPress={() => handleYear(item)}
      style={[styles.yearButton, isCurrent && styles.currentButton]}>
      <Text style={[styles.yearText, isCurrent && styles.currentText]}>
        {item}
      </Text>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      maxHeight: 200,
      backgroundColor: colors[theme].WHITE,
    },
    listContainer: {
      marginHorizontal: 10,
    },
    yearButton: {
      width: (Dimensions.get('window').width - 20 * 3) / 4,
      height: 40,
      borderWidth: 1,
      borderColor: colors[theme].BLACK,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },
    currentButton: {
      backgroundColor: colors[theme].CYAN_700,
      borderColor: colors[theme].CYAN_700,
    },
    currentText: {
      color: colors[theme].WHITE,
    },
    yearText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].GRAY_700,
    },
    closeButton: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors[theme].GRAY_500,
    },
    closeButtonText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default YearsModal;
