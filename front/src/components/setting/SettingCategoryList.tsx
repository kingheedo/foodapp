import {colorHex} from '@/constants';
import {StyleSheet, TextInput, View} from 'react-native';
import SettingCategoryItem from './SettingCategoryItem';
import useForm from '@/hooks/useForm';
import {LowerCaseCategory} from '@/types/domain';
import {useRef} from 'react';

interface SettingCategoryListProps {
  editCategoryForm: ReturnType<typeof useForm<LowerCaseCategory>>;
}

const markerList = [
  {
    name: 'red',
    color: colorHex.RED,
    placeholder: '식당',
  },
  {
    name: 'yellow',
    color: colorHex.YELLOW,
    placeholder: '카페',
  },
  {
    name: 'green',
    color: colorHex.GREEN,
    placeholder: '병원',
  },
  {
    name: 'blue',
    color: colorHex.BLUE,
    placeholder: '도서관',
  },
  {
    name: 'purple',
    color: colorHex.PURPLE,
    placeholder: '여행지',
  },
] as const;

const SettingCategoryList = ({editCategoryForm}: SettingCategoryListProps) => {
  const refArray = useRef<(TextInput | null)[]>([]);

  return (
    <View style={styles.container}>
      {markerList.map((marker, index) => (
        <SettingCategoryItem
          ref={el => (refArray.current[index] = el)}
          key={marker.placeholder}
          maxLength={10}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => {
            refArray.current[index + 1]?.focus();
          }}
          autoFocus={marker.name === 'red'}
          placeholder={marker.placeholder}
          error={editCategoryForm.errors[marker.name]}
          blured={editCategoryForm.blured[marker.name]}
          {...editCategoryForm.getFormInputProps(marker.name)}
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
