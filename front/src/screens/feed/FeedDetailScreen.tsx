import PreviewImageList from '@/components/common/PreviewImageList';
import {
  colorHex,
  colors,
  feedNavigations,
  mainNavigations,
  mapNavigations,
} from '@/constants';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import backUrl from '@/utils/backUrl';
import {StackScreenProps} from '@react-navigation/stack';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButton from '@/components/common/HeaderButton';
import useModal from '@/hooks/useModal';
import useGetPost from '@/hooks/queries/useGetPost';
import CustomButton from '@/components/common/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useLocationStore from '@/store/useLocationStore';
import useDetailPostStore from '@/store/useDetailPostStore';
import FeedDetailOption from '@/components/feed/FeedDetailOption';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParmList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;
const FeedDetailScreen = ({navigation, route}: FeedDetailScreenProps) => {
  const {id} = route.params;
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const detailOptionModal = useModal();
  const {data: post} = useGetPost(id);
  const insets = useSafeAreaInsets();
  const {setMoveLocation} = useLocationStore();
  const {setDetailPost} = useDetailPostStore();

  /** image 활성 인덱스
   *
   * preview image list에서 선택한 이미지의 인덱스 설정 함수
   */
  const handleActiveImageIdx = (idx: number) => {
    setActiveImageIdx(idx);
  };

  /** 게시물 수정 핸들러 */
  const handleModifyPost = () => {
    console.log('handleModifyPost');
  };

  /** 게시물 즐겨찾기 핸들러 */
  const handleFavorite = () => {
    console.log('handleFavorite');
  };
  const handleShowLocation = () => {
    if (!post) {
      return;
    }
    const {latitude, longitude} = post;

    setMoveLocation({latitude, longitude});
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };

  useEffect(() => {
    if (post) setDetailPost(post);
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <>
      <ScrollView
        style={[
          {
            marginBottom: insets.bottom
              ? insets.bottom + 50
              : insets.bottom + 65,
          },
        ]}
        scrollIndicatorInsets={{
          right: 1,
        }}>
        <View style={styles.container}>
          <SafeAreaView style={styles.headerContainer}>
            <HeaderButton
              style={{
                alignItems: 'baseline',
              }}
              onPress={() => navigation.goBack()}
              icon={
                <MaterialIcons
                  name="arrow-back-ios"
                  size={30}
                  color={colors.WHITE}
                />
              }
            />
            <HeaderButton
              style={{
                alignItems: 'baseline',
              }}
              onPress={detailOptionModal.handleOpen}
              icon={
                <Ionicons
                  name="ellipsis-vertical"
                  size={30}
                  color={colors.WHITE}
                />
              }
            />
          </SafeAreaView>

          <View style={styles.cardContainer}>
            <View style={styles.cardMediaContainer}>
              {post.images.length > 0 && (
                <Image
                  style={styles.mainImage}
                  resizeMode="cover"
                  source={{
                    uri: `${backUrl}/${post.images[activeImageIdx].uri}`,
                  }}
                />
              )}
              {post.images.length === 0 && (
                <View>
                  <Text>No Image</Text>
                </View>
              )}
            </View>
            <View style={styles.cardContentContainer}>
              <View style={styles.cardSubTitleContainer}>
                <Octicons name="location" color={colors.GRAY_500} size={10} />
                <Text style={styles.cardSubTitleText} ellipsizeMode="tail">
                  {post.address}
                </Text>
              </View>
              <View style={styles.cardTitle}>
                <Text style={styles.cardTitleText}>{post.title}</Text>
              </View>
              <View style={styles.cardSubInfoContainer}>
                <View style={styles.cardSubInfoRow}>
                  <Text style={styles.cardSubInfoRowLeft}>방문날짜</Text>
                  <Text style={styles.cardSubInfoRowRight}>
                    {post.date && format(post.date, 'yyyy년 MM월 dd일')}
                  </Text>
                </View>
                <View style={styles.cardSubInfoRow}>
                  <Text style={styles.cardSubInfoRowLeft}>평점</Text>
                  <Text style={styles.cardSubInfoRowRight}>{post.score}점</Text>
                </View>
                <View style={styles.cardSubInfoRow}>
                  <Text style={styles.cardSubInfoRowLeft}>마커색상</Text>
                  <Text
                    style={[
                      styles.cardSubInfoRowRight,
                      styles.marker,
                      {backgroundColor: colorHex[post.color]},
                    ]}
                  />
                </View>
                <View style={styles.cardSubInfoRow}>
                  <Text style={styles.cardSubInfoRowLeft}>카테고리</Text>
                  <Text style={styles.cardSubInfoRowRight}>
                    2020년 2월 20일
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {post.description || ''}
                </Text>
              </View>
            </View>
          </View>
          {post.images.length > 0 && (
            <View style={styles.imageListContainer}>
              <PreviewImageList
                imageUris={post.images}
                handleActiveIdx={handleActiveImageIdx}
              />
            </View>
          )}
        </View>

        <FeedDetailOption
          detailOption={detailOptionModal}
          location={{latitude: post.latitude, longitude: post.longitude}}
        />
      </ScrollView>

      <View
        style={[
          styles.utilityContainer,
          {paddingBottom: insets.bottom !== 0 ? insets.bottom : 10},
        ]}>
        <Pressable
          style={({pressed}) => pressed && styles.utilityIconContainerPressed}
          onPress={handleFavorite}>
          <View style={[styles.utilityItem, styles.utilityIconContainer]}>
            <Octicons name="star-fill" color={colors.WHITE} size={30} />
          </View>
        </Pressable>
        <CustomButton
          label="위치보기"
          size="medium"
          variant="filled"
          onPress={handleShowLocation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 20,
    top: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
  },
  cardMediaContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
    backgroundColor: colors.GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  cardContentContainer: {
    padding: 20,
  },
  cardSubTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  cardSubTitleText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  cardSubTitle: {},
  cardTitle: {},
  cardTitleText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.BLACK,
  },
  cardSubInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  cardSubInfoRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'nowrap',
    flexBasis: '48%',
    alignItems: 'center',
  },
  cardSubInfoRowLeft: {
    color: colors.BLACK,
    fontWeight: '500',
  },
  cardSubInfoRowRight: {
    color: colors.PINK_500,
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  imageListContainer: {
    marginVertical: 10,
    backgroundColor: colors.WHITE,
    padding: 12,
  },
  utilityContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.WHITE,
    gap: 8,
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
  },
  utilityContainerNoInsets: {
    paddingBottom: 10,
  },
  utilityItem: {
    borderRadius: 3,
    backgroundColor: colors.CYAN_700,
    justifyContent: 'center',
    alignItems: 'center',
  },
  utilityLocationItem: {
    width: Dimensions.get('screen').width / 2,
  },
  utilityIconContainer: {
    height: '100%',
    paddingHorizontal: 5,
  },
  utilityIconContainerPressed: {
    opacity: 0.5,
  },
  utilityText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FeedDetailScreen;
