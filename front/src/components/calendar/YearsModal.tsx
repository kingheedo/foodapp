import React, { useEffect, useState } from 'react';
import { colors } from '@/constants';
import {Dimensions, FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { numbers } from '@/constants/numbers';

interface YearsModalProps {
    open: boolean;
    currentYear: number;
    handleYear: (selectedYear: number) => void;
    handleClose: () => void;
}

const YearsModal = ({open, currentYear, handleYear, handleClose}: YearsModalProps) => {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
      setScrollY(Math.floor((currentYear-numbers.MIN_CALENDAR_YEAR)/4) * 50)
    }, [open, currentYear])
    

  return (
        open && <View style={styles.container}>
            <FlatList 
                data={Array.from({length: (numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR) + 1}, (_, index) => ({
                    id: index,
                    num: numbers.MIN_CALENDAR_YEAR + index
                }))} 
                initialNumToRender={currentYear-numbers.MIN_CALENDAR_YEAR}
                contentOffset={({x: 0, y: scrollY})}
                renderItem={({item}) => (<YearBox isCurrent={currentYear === item.num} handleYear={handleYear} item={item.num}/>)}
                numColumns={4}
                keyExtractor={item => String(item.num)}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                />
            <Pressable style={styles.closeButton} onPress={handleClose}>
                <Text style={styles.closeButtonText}>
                    닫기
                </Text>
                <MaterialIcons
                    name="keyboard-arrow-up"
                    size={20}
                    color={colors.GRAY_500}
                />
            </Pressable>
        </View>
  )
}

interface IYearBoxProps {
    isCurrent: boolean;
    item: number;
    handleYear: (selectedYear: number) => void;
}

const YearBox = ({isCurrent, item,handleYear} : IYearBoxProps) => {
    return (
        <Pressable onPress={() => handleYear(item)} style={[styles.yearButton, isCurrent && styles.currentButton]}>
            <Text style={[styles.yearText, isCurrent && styles.currentText]}>
                {item}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: '100%',
        maxHeight: 200,
        backgroundColor: colors.WHITE,
    },
    listContainer:{
        marginHorizontal: 10,
    },
    yearButton:{
        width: (Dimensions.get('window').width - (20*3)) / 4,
        height: 40,
        borderWidth: 1,
        borderColor: colors.BLACK,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5 
    },
    currentButton:{
        backgroundColor: colors.CYAN_700,
        borderColor: colors.CYAN_700
    },
    currentText:{
        color: colors.WHITE
    },
    yearText:{
        fontSize:16,
        fontWeight: '500',
        color: colors.GRAY_700
    },
    closeButton:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopWidth:1,
        borderBottomWidth: 1,
        borderColor: colors.GRAY_500
    },
    closeButtonText:{
        color: colors.BLACK,
        fontSize: 16,
        fontWeight: '600'
    }
});

export default YearsModal;