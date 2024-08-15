import React from 'react';
import {SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import FeedList from '@/components/feed/FeedList';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';

const FeedHomeScreen = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FeedList
        posts={posts?.pages.flat() || []}
        emptyMessage="피드가 존재하지 않습니다."
        handleNextPage={handleNextPage}
        handleRefetch={handleRefetch}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
