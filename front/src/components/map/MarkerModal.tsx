import {colors, feedNavigations, mainNavigations} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import backUrl from '@/utils/backUrl';
import {format} from 'date-fns';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomMarker from '@/components/common/CustomMarker';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';

interface MarkerModalProps {
  markerId: number | null;
  visible: boolean;
  handleClose: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  StackNavigationProp<FeedStackParmList>
>;

const MarkerModal = ({markerId, visible, handleClose}: MarkerModalProps) => {
  const {data: post} = useGetPost(markerId);
  const navigation = useNavigation<Navigation>();

  const handlePressModal = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedNavigations.FEED_DETAIL,
      params: {
        id: Number(post?.id),
      },
      initial: false,
    });
  };

  if (!post) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.optionBackground} onTouchEnd={handleClose}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.imageContainer}>
              {post.images[0] && post.images[0].uri && (
                <Image
                  style={styles.cardImage}
                  source={{uri: `${backUrl}/${post.images[0].uri}`}}
                  resizeMode="cover"
                />
              )}
              <View style={styles.emptyImageContainer}>
                {!post.images[0] && <CustomMarker color={post.color} />}
              </View>
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.addressContainer}>
                <Octicons name="location" color={colors.GRAY_500} size={10} />
                <Text
                  style={styles.addressText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {post?.address}
                </Text>
              </View>
              <Text style={styles.titleText}>{post?.title}</Text>
              <Text style={styles.dateText}>
                {post?.date && format(post?.date, 'yyyy.MM.dd')}
              </Text>
            </View>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={colors.BLACK}
            style={styles.arrowForward}
          />
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.GRAY_300,
  },
  arrowForward: {},
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 18,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.GRAY_500,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
  },
  cardInner: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyImageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  cardInfo: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addressText: {
    fontSize: 10,
    color: colors.GRAY_500,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.BLACK,
  },
  dateText: {
    fontSize: 12,
    color: colors.PINK_700,
  },
});

export default MarkerModal;
