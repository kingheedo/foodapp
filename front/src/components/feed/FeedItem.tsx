import {ResponsePost, ResponseSinglePost} from '@/api';
import {colors, feedNavigations} from '@/constants';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import backUrl from '@/utils/backUrl';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface FeedItemProps {
  post: ResponsePost | ResponseSinglePost;
}

const FeedItem = ({post}: FeedItemProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParmList>>();

  const handleDetailScreen = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, {
      id: post.id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleDetailScreen}>
      <View style={styles.imageContainer}>
        {post.images.length > 0 ? (
          <Image
            style={styles.image}
            source={{
              uri: `${backUrl}/${post.images[0].uri}`,
            }}
            resizeMode="cover"
          />
        ) : (
          !post.images[0] && (
            <View style={[styles.image, styles.emptyImageContainer]}>
              <Text>No image</Text>
            </View>
          )
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.dateText}>
          {post.date && format(post.date, 'yyyy/MM/dd')}
        </Text>
        <Text style={styles.titleText}>{post.title}</Text>
        {post.description && (
          <Text style={styles.description} numberOfLines={1}>
            {post.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    marginVertical: 12,
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2 - 25,
    height: Dimensions.get('screen').width / 2 - 25,
  },
  emptyImageContainer: {
    borderRadius: 5,
    borderColor: colors.GRAY_300,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  infoContainer: {
    marginTop: 7,
    gap: 5,
  },
  dateText: {
    color: colors.PINK_700,
    fontWeight: '600',
    fontSize: 12,
  },
  titleText: {
    color: colors.BLACK,
    fontWeight: '500',
  },
  description: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
});

export default FeedItem;
