import {feedNavigations} from '@/constants';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type FeedDetailScreenProps = StackScreenProps<
  FeedStackParmList,
  typeof feedNavigations.FEED_DETAIL
>;

const FeedDetailScreen = ({route}: FeedDetailScreenProps) => {
  const {post} = route.params;

  console.log('post', post);

  return (
    <View>
      <Text>피드 상세 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedDetailScreen;
