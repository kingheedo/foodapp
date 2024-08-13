import React from 'react';
import ImageCarousel from '../common/ImageCarousel';
import useDetailPostStore from '@/store/useDetailPostStore';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

type IImageZoomScreenProps = StackScreenProps<
  FeedStackParmList,
  typeof feedNavigations.IMAGE_ZOOM
>;

const ImageZoomScreen = ({route}: IImageZoomScreenProps) => {
  const {index} = route.params;
  const {detailPost} = useDetailPostStore();
  return <ImageCarousel images={detailPost?.images ?? []} pressedIdx={index} />;
};

export default ImageZoomScreen;
