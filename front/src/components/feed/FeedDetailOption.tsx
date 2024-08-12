import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {OptionModal} from '../common/OptionModal';
import useMuatateDeletePost from '@/hooks/queries/useMutateDeletePost';
import useDetailPostStore from '@/store/useDetailPostStore';
import {useNavigation} from '@react-navigation/native';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {alerts, feedNavigations} from '@/constants';
import {LatLng} from 'react-native-maps';

type DetailOption = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

interface FeedDetailOptionProps {
  detailOption: DetailOption;
  location: LatLng;
}

/** 상세 옵션 모달 */
const FeedDetailOption = ({location, detailOption}: FeedDetailOptionProps) => {
  const deletePost = useMuatateDeletePost();
  const {detailPost} = useDetailPostStore();
  const navigation = useNavigation<StackNavigationProp<FeedStackParmList>>();

  /** 게시물 삭제 핸들러 */
  const handleDeletePost = () => {
    if (!detailPost) {
      return;
    }

    Alert.alert(alerts.DELETE_POST.title, alerts.DELETE_POST.description, [
      {
        text: '삭제',
        onPress: async () => {
          await deletePost.mutate(detailPost.id);
          detailOption.handleClose();
          navigation.goBack();
        },
        style: 'destructive',
      },
      {
        text: '취소',
        onPress: () => {
          detailOption.handleClose();
        },
      },
    ]);
  };

  /** 게시물 수정 핸들러*/
  const handleEditPost = () => {
    navigation.navigate(feedNavigations.POST_EDIT, {
      location,
    });
    detailOption.handleClose();
  };

  return (
    <OptionModal
      open={detailOption.open}
      btnLabel="취소"
      handleClose={detailOption.handleClose}>
      <OptionModal.Button
        label="삭제하기"
        onPress={handleDeletePost}
        isDanger={true}
      />
      <OptionModal.Divider />
      <OptionModal.Button label="수정하기" onPress={handleEditPost} />
    </OptionModal>
  );
};

const styles = StyleSheet.create({});

export default FeedDetailOption;
