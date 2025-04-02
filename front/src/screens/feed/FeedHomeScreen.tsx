import React, {Suspense} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import FeedList from '@/components/feed/FeedList';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import {colors} from '@/constants';
import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

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
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedList
            posts={posts?.pages.flat() || []}
            emptyMessage="피드가 존재하지 않습니다."
            handleNextPage={handleNextPage}
            handleRefetch={handleRefetch}
          />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
