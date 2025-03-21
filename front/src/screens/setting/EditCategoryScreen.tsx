import SettingCategoryList from '@/components/setting/SettingCategoryList';
import {colors, errorMessages} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {Category} from '@/types/domain';
import {validateEditCategory} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

interface EditCategoryScreenProps
  extends StackScreenProps<SettingStackParamList> {}

const EditCategoryScreen = ({navigation}: EditCategoryScreenProps) => {
  const {updateCategory} = useAuth();
  const {getProfileQuery} = useAuth();
  const {RED, YELLOW, GREEN, BLUE, PURPLE} = getProfileQuery.data ?? {};
  const editCategoryForm = useForm({
    initialValue: {
      red: RED || '',
      yellow: YELLOW || '',
      green: GREEN || '',
      blue: BLUE || '',
      purple: PURPLE || '',
    },
    validate: validateEditCategory,
  });

  console.log('getProfileQuery', getProfileQuery);

  const handleUpdateCategory = () => {
    updateCategory.mutate(
      {
        RED: editCategoryForm.inputValues.red,
        YELLOW: editCategoryForm.inputValues.yellow,
        GREEN: editCategoryForm.inputValues.green,
        BLUE: editCategoryForm.inputValues.blue,
        PURPLE: editCategoryForm.inputValues.purple,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '카테고리 수정을 완료하였습니다.',
            position: 'bottom',
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
          });
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightButton}>
          <Pressable onPress={handleUpdateCategory}>
            <Text>완료</Text>
          </Pressable>
        </View>
      ),
    });
  }, [editCategoryForm]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            마커 색상의 카테고리를 설정해보세요.{'\n'}
            마커 필터링, 범례 표시에 사용할 수 있어요.
          </Text>
        </View>
        <SettingCategoryList editCategoryForm={editCategoryForm} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRightButton: {
    width: 50,
    alignItems: 'center',
  },
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
