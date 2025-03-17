import {colorHex, colors} from '@/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import SettingCategoryItem from './SettingCategoryItem';

interface SettingCategoryListProps {}

const markerList = [
  {
    color: colorHex.RED,
    content: '식당',
  },
  {
    color: colorHex.YELLOW,
    content: '카페',
  },
  {
    color: colorHex.GREEN,
    content: '병원',
  },
  {
    color: colorHex.BLUE,
    content: '도서관',
  },
  {
    color: colorHex.PURPLE,
    content: '여행지',
  },
];

const SettingCategoryList = ({}: SettingCategoryListProps) => {
  return (
    <View style={styles.container}>
      {markerList.map(marker => (
        <SettingCategoryItem
          key={marker.content}
          content={marker.content}
          markerStyle={{
            backgroundColor: marker.color,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default SettingCategoryList;
