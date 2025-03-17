import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import SettingItem from './SettingItem';
import {settingNavigatons} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';

interface SettingListProps {
  style?: StyleProp<ViewStyle>;
}

type Item = {
  label: string;
  path: keyof SettingStackParamList;
};

const itemList: Item[] = [
  {
    label: '프로필 수정',
    path: settingNavigatons.EDIT_PROFILE,
  },
  {
    label: '마커 카테고리 설정',
    path: settingNavigatons.EDIT_CATEGORY,
  },
  {
    label: '범례 표시',
    path: settingNavigatons.EDIT_PROFILE,
  },
  {
    label: '다크 모드',
    path: settingNavigatons.EDIT_PROFILE,
  },
];

type Navigation = StackNavigationProp<
  SettingStackParamList,
  keyof SettingStackParamList
>;
const SettingList = ({style = null}: SettingListProps) => {
  const navigation = useNavigation<Navigation>();
  return (
    <View style={style}>
      {itemList.map((item, index) => (
        <SettingItem
          key={item.label}
          label={item.label}
          isLast={itemList.length - 1 === index}
          onPress={() => {
            navigation.navigate(item.path);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingList;
