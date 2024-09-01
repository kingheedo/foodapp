import useDeviceImage from '@/hooks/useDeviceImage';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useModal from '@/hooks/useModal';
import usePermission, {PermissionType} from '@/hooks/usePermission';
import {MarkerColor} from '@/types/domain';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import HeaderButton from '../common/HeaderButton';
import InputField from '../common/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../common/CustomButton';
import {colors} from '@/constants';
import {format} from 'date-fns';
import DateInput from './DateInput';
import MarkerSelector from './MarkerSelector';
import ScoreInput from './ScoreInput';
import PostImageField from './PostImageField';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import {validateAddPost} from '@/utils';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useDetailPostStore from '@/store/useDetailPostStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';

interface IPostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

const PostForm = ({isEdit = false, location}: IPostFormProps) => {
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;

  const descriptionRef = useRef<TextInput | null>(null);
  const addPostForm = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const address = useGetAddress(location);
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const [date, setDate] = useState<Date>(
    isEditMode ? new Date(detailPost.date) : new Date(),
  );
  const [isPickedDate, setIsPickedDate] = useState(false);
  const {imageUris, handleImageLibrary, handleDelete, handleMove} =
    useDeviceImage({initialImages: isEditMode ? detailPost.images : []});

  usePermission(PermissionType.PHOTO);
  const navigation = useNavigation<StackNavigationProp<FeedStackParmList>>();
  const datePickerModal = useModal();

  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();

  /** 폼 제출시
   *
   * Edit 모드일때는 post수정 아닐때는 post생성
   */
  const handleSubmit = () => {
    const body = {
      title: addPostForm.inputValues.title,
      description: addPostForm.inputValues.description,
      date,
      imageUris,
      color: markerColor,
      score,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => {
            navigation.goBack();
          },
        },
      );

      return;
    }

    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  const handleDate = (date: Date) => {
    setDate(date);
  };

  const handleConfirmDate = () => {
    setIsPickedDate(true);
    datePickerModal.handleClose();
  };

  const handleSelectMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  const handleScore = (value: number) => {
    setScore(value);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          style={{marginRight: 18}}
          label={isEditMode ? '수정' : '등록'}
          onPress={handleSubmit}
        />
      ),
    });
  }, [addPostForm.inputValues, markerColor, location]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" color={colors.GRAY_500} size={16} />
            }
          />
          <CustomButton
            label={
              isPickedDate && !!date
                ? format(date, 'yyyy. MM. dd')
                : '날짜 선택'
            }
            variant="outlined"
            size="large"
            onPress={datePickerModal.handleOpen}
          />
          <DateInput
            date={date}
            open={datePickerModal.open}
            handleDate={handleDate}
            handleConfirm={handleConfirmDate}
          />

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
          <MarkerSelector
            markerColor={markerColor}
            handleSelectMarker={handleSelectMarker}
          />
          <ScoreInput score={score} handleScore={handleScore} />
          <PostImageField
            imageUris={imageUris}
            handleImageLibrary={handleImageLibrary}
            handleDelete={handleDelete}
            handleMove={handleMove}
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

export default PostForm;
