import {colors} from '@/constants';
import {ImageUri} from '@/types/domain';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PreviewImageList from '@/components/common/PreviewImageList';

interface IPostImageFieldProps {
  imageUris: ImageUri[];
  handleImageLibrary: () => Promise<void>;
  handleDelete: (index: number) => void;
  handleMove: (fromIdx: number, toIdx: number) => void;
}

const PostImageField = ({
  imageUris,
  handleImageLibrary,
  handleDelete,
  handleMove,
}: IPostImageFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.addImage]}>
        <Pressable
          style={({pressed}) => [
            styles.square,
            pressed && styles.addImagePressed,
          ]}
          onPress={handleImageLibrary}>
          <Ionicons name="camera" size={20} color={colors.GRAY_500} />
          <Text>사진 추가</Text>
        </Pressable>
      </View>
      <PreviewImageList
        imageUris={imageUris}
        showOption={true}
        handleDelete={handleDelete}
        handleMove={handleMove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
  },

  square: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addImage: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
  },

  addImagePressed: {
    opacity: 0.5,
  },
});

export default PostImageField;
