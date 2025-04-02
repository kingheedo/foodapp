import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import FeedList from '@/components/feed/FeedList';
import {colors} from '@/constants';
import useGetFavoritePosts from '@/hooks/queries/useGetFavoritePosts';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import React, {Suspense} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const FeedFavoriteScreen = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetFavoritePosts();
  const {theme} = useThemeStore();
  const styles = styling(theme);

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
            emptyMessage="즐겨찾기한 피드가 존재하지 않습니다."
            handleNextPage={handleNextPage}
            handleRefetch={handleRefetch}
          />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default FeedFavoriteScreen;
