import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {Item} from './constants/option';
import SettingItem from './SettingItem';

interface SettingListProps {
  list: Item[];
  style?: StyleProp<ViewStyle>;
}

type Navigation = StackNavigationProp<
  SettingStackParamList,
  keyof SettingStackParamList
>;
const SettingList = ({list, style = null}: SettingListProps) => {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={style}>
      {list.map((item, index) => (
        <SettingItem
          key={item.label}
          label={item.label}
          isLast={list.length - 1 === index}
          onPress={() => {
            typeof item.callback === 'function'
              ? item.callback()
              : item.path && navigation.navigate(item.path);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingList;
