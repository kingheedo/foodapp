import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FeedItem from './FeedItem';
import {ResponsePost, ResponseSinglePost} from '@/api';

interface FeedListProps {
  posts: ResponsePost[] | ResponseSinglePost[];
  emptyMessage: string;
  handleNextPage: () => void;
  handleRefetch: () => void;
}

const FeedList = ({
  posts,
  emptyMessage,
  handleNextPage,
  handleRefetch,
}: FeedListProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await handleRefetch();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleNextPage}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={() => handleRefresh}
      ListEmptyComponent={
        <View>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      }
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
  emptyText: {
    textAlign: 'center',
  },
});

export default FeedList;
