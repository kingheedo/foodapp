import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import FeedItem from './FeedItem';
import {Text} from 'react-native';
import {colors} from '@/constants';
import {useFocusEffect} from '@react-navigation/native';

interface FeedListProps {}

const FeedList = ({}: FeedListProps) => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  const [refreshing, setRefreshing] = useState(false);
  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  console.log('posts', posts);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleNextPage}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={() => handleRefresh}
      scrollIndicatorInsets={{right: 1}}
      // ListFooterComponent={
      //   isFetchingNextPage ? (
      //     <ActivityIndicator size={'large'} color={colors.CYAN_700} />
      //   ) : null
      // }
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});

export default FeedList;
