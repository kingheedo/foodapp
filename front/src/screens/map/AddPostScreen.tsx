import CustomButton from '@/components/CustomButton';
import HeaderButton from '@/components/HeaderButton';
import InputField from '@/components/InputField';
import {colors, mapNavigations, queryKeys} from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MarkerColor} from '@/types/domain';
import {validateAddPost} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

const AddPostScreen = ({navigation, route}: AddPostScreenProps) => {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const addPostForm = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const [address, setAddress] = useState('');
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const createPost = useMutateCreatePost();
  const queryClient = useQueryClient();

  const handleSubmtit = () => {
    const body = {
      title: addPostForm.inputValues.title,
      description: addPostForm.inputValues.description,
      address,
      date: new Date(),
      imageUris: [],
      color: markerColor,
      score,
      ...location,
    };

    createPost.mutate(body, {
      onSuccess: () => {
        navigation.goBack();
      },
      onError: () => {
        Alert.alert('장소 추가에 실패하였습니다.');
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          style={{marginRight: 18}}
          label="등록"
          onPress={handleSubmtit}
        />
      ),
    });
  }, [addPostForm.inputValues, markerColor, location]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" color={colors.GRAY_500} size={16} />
            }
          />
          <CustomButton label="날짜 선택" variant="outlined" size="large" />

          <InputField
            placeholder="제목을 입력해주세요"
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            error={addPostForm.errors.title}
            {...addPostForm.getFormInputProps('title')}
            blured={addPostForm.blured.title}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요 (선택)"
            returnKeyType="next"
            error={addPostForm.errors.description}
            blured={addPostForm.blured.description}
            multiline
            {...addPostForm.getFormInputProps('description')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default AddPostScreen;
