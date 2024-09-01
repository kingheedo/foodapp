import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from './HeaderButton';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

interface DraweHeaderButtonProps {
  navigation: DrawerNavigationProp<MainDrawerParamList>;
}

const DraweHeaderButton = ({navigation}: DraweHeaderButtonProps) => {
  return (
    <HeaderButton
      style={{
        marginLeft: 20,
      }}
      onPress={() => navigation.openDrawer()}
      icon={<Ionicons name="menu" size={25} color={colors.BLACK} />}
    />
  );
};

const styles = StyleSheet.create({});

export default DraweHeaderButton;
