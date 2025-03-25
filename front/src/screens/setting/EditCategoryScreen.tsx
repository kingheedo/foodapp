import SettingCategoryList from '@/components/setting/SettingCategoryList';
import {colors, errorMessages} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {validateEditCategory} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

interface EditCategoryScreenProps
  extends StackScreenProps<SettingStackParamList> {}

const EditCategoryScreen = ({navigation}: EditCategoryScreenProps) => {
  const {updateCategory} = useAuth();
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data ?? {};

  const editCategoryForm = useForm({
    initialValue: {
      red: categories?.RED || '',
      yellow: categories?.YELLOW || '',
      green: categories?.GREEN || '',
      blue: categories?.BLUE || '',
      purple: categories?.PURPLE || '',
    },
    validate: validateEditCategory,
  });

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
            text1: '저장되었습니다.',
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
            <Text>저장</Text>
          </Pressable>
        </View>
      ),
    });
  }, [editCategoryForm]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        scrollIndicatorInsets={{right: 1}}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            마커 색상의 카테고리를 설정해보세요.{'\n'}
            마커 필터링, 범례 표시에 사용할 수 있어요.
          </Text>
        </View>
        <SettingCategoryList editCategoryForm={editCategoryForm} />
      </ScrollView>
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
  scrollContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  textContainer: {
    borderWidth: 1,
    borderColor: colors.RED_500,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  text: {
    color: colors.RED_500,
    textAlign: 'center',
  },
});

export default EditCategoryScreen;
