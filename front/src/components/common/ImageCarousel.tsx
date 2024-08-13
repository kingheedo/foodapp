import React, {useState} from 'react';
import {colors} from '@/constants';
import {ImageUri} from '@/types/domain';
import backUrl from '@/utils/backUrl';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderButton from './HeaderButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FeedStackParmList} from '@/navigations/stack/FeedStackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIdx?: number;
}

const deviceWidth = Dimensions.get('window').width;

const ImageCarousel = ({images, pressedIdx = 0}: ImageCarouselProps) => {
  const navigation = useNavigation<NavigationProp<FeedStackParmList>>();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(pressedIdx);
  const [initialIndex, setInitialIndex] = useState(pressedIdx);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(event.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderButton
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}
        icon={
          <MaterialIcons name="arrow-back" size={30} color={colors.WHITE} />
        }
      />
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{uri: `${backUrl}/${item.uri}`}}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => setInitialIndex(0)}
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={[styles.pageDotContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currenPageDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colors.CYAN_700,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageDotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  pageDot: {
    width: 8,
    height: 8,
    backgroundColor: colors.GRAY_200,
    margin: 4,
    borderRadius: 4,
  },
  currenPageDot: {
    backgroundColor: colors.CYAN_700,
  },
});

export default ImageCarousel;
