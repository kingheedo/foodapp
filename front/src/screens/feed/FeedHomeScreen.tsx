import React from 'react';
import {SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import FeedList from '@/components/feed/FeedList';

const FeedHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
