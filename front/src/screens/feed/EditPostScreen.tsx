import React from 'react';
import {feedNavigations} from '@/constants';
import {StackScreenProps} from '@react-navigation/stack';
import PostForm from '@/components/post/PostForm';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';

type EditPostScreenProps = StackScreenProps<
  FeedStackParmList,
  typeof feedNavigations.POST_EDIT
>;

const EditPostScreen = ({route}: EditPostScreenProps) => {
  const {location} = route.params;
  return <PostForm location={location} isEdit />;
};

export default EditPostScreen;
