import React, {useState} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, View} from 'react-native';
import {ResponsePost, ResponseSinglePost} from '@/api';
import FeedItem from '@/components/feed/FeedItem';

interface FeedSearchListProps {
  posts: ResponsePost[] | ResponseSinglePost[];
  emptyMessage: string;
  headerComponent: React.ReactElement;
  handleNextPage: () => void;
  handleRefetch: () => void;
}

const FeedSearchList = ({
  posts,
  emptyMessage,
  headerComponent,
  handleNextPage,
  handleRefetch,
}: FeedSearchListProps) => {
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
      ListHeaderComponent={headerComponent}
      stickyHeaderIndices={[0]}
      onScrollBeginDrag={() => Keyboard.dismiss()}
      ListEmptyComponent={
        <View>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      }
      scrollIndicatorInsets={{right: 1}}
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

export default FeedSearchList;
