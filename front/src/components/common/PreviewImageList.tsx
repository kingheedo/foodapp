import 'react-native-get-random-values';
import {ImageUri} from '@/types/domain';
import backUrl from '@/utils/backUrl';
import React, {memo} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '@/constants';
import {v4 as uuidv4} from 'uuid';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  showOption?: boolean;
  handleDelete?: (index: number) => void;
  handleMove?: (fromIdx: number, toIdx: number) => void;
  handleActiveIdx?: (idx: number) => void;
}

interface ImageItemProps {
  index: number;
  uri: string;
}

const PreviewImageList = ({
  imageUris,
  showOption = false,
  handleDelete,
  handleMove,
  handleActiveIdx,
}: PreviewImageListProps) => {
  const ImageItem = memo(({index, uri}: ImageItemProps) =>
    showOption ? (
      <>
        <Pressable
          onPress={() => handleDelete && handleDelete(index)}
          style={styles.closeBtnContainer}>
          <Ionicons name="close" size={16} color={colors.WHITE} />
        </Pressable>
        <Image
          style={styles.previewImage}
          resizeMode="cover"
          source={{uri: `${backUrl}/${uri}`}}
        />
        <Pressable
          style={styles.moveLeftBtn}
          onPress={() => handleMove && handleMove(index, index - 1)}>
          <Octicons name="arrow-left" size={16} color={colors.WHITE} />
        </Pressable>
        <Pressable
          onPress={() => handleMove && handleMove(index, index + 1)}
          style={styles.moveRightBtn}>
          <Octicons name="arrow-right" size={16} color={colors.WHITE} />
        </Pressable>
      </>
    ) : (
      <Image
        style={styles.previewImage}
        resizeMode="cover"
        source={{uri: `${backUrl}/${uri}`}}
      />
    ),
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        {imageUris.map(({uri}, index) =>
          handleActiveIdx ? (
            <Pressable key={uuidv4()} onPress={() => handleActiveIdx(index)}>
              <View style={styles.square}>
                <ImageItem index={index} uri={uri} />
              </View>
            </Pressable>
          ) : (
            <View key={uuidv4()} style={styles.square}>
              <ImageItem index={index} uri={uri} />
            </View>
          ),
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  square: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  closeBtnContainer: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
    top: 0,
    right: 0,
    width: 16,
    height: 16,
  },
  moveLeftBtn: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
    width: 16,
    height: 16,
    left: 0,
    bottom: 0,
  },
  moveRightBtn: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
    width: 16,
    height: 16,
    right: 0,
    bottom: 0,
  },
});

export default PreviewImageList;
