import SettingCategoryList from '@/components/setting/SettingCategoryList';
import {colors} from '@/constants';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface EditCategoryScreenProps {}

const EditCategoryScreen = ({}: EditCategoryScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            마커 색상의 카테고리를 설정해보세요.{'\n'}
            마커 필터링, 범례 표시에 사용할 수 있어요.
          </Text>
        </View>
        <SettingCategoryList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    marginHorizontal: 20,
    gap: 20,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: colors.RED_500,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  text: {
    color: colors.RED_500,
    textAlign: 'center',
  },
});

export default EditCategoryScreen;
