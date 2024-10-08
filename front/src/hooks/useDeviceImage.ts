import {ImageUri} from '@/types/domain';
import {useState} from 'react';
import {Alert} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import useMutateUploadImages from './queries/useMutateUploadImages';
import getImageFormData from '@/utils/getImageFormData';
import {alerts} from '@/constants/messages';
import Toast from 'react-native-toast-message';

const cameraOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: true,
  selectionLimit: 5,
};

interface IUseDeviceImageProps {
  initialImages?: ImageUri[];
}

/** 최대 이미지 갯수 */
const EXCEED_NUMBER = 5;

const useDeviceImage = ({initialImages = []}: IUseDeviceImageProps) => {
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);
  const uploadImages = useMutateUploadImages();

  /** 이미지 좌우 이동 핸들러 */
  const handleMove = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= imageUris.length) {
      return;
    }

    const newImages = [...imageUris];
    const [fromImage] = newImages.splice(fromIdx, 1);
    newImages.splice(toIdx, 0, fromImage);
    setImageUris(newImages);
  };

  /** 특정 이미지 삭제 핸들러 */
  const handleDelete = (index: number) => {
    const newImageUris = imageUris.filter((uri, uriIdx) => index !== uriIdx);
    setImageUris([...newImageUris]);
  };

  /** 이미지 특정 갯수 초과 여부 */
  const checkExceed = (assetsLength: number) => {
    if (assetsLength > EXCEED_NUMBER) {
      Alert.alert(
        alerts.EXCEEDED_NUMBER.title,
        alerts.EXCEEDED_NUMBER.description,
      );

      return true;
    }

    return false;
  };

  /** 이미지 업로드 api 핸들링 */
  const handleUploadImages = async (formData: FormData) => {
    try {
      await uploadImages.mutate(formData, {
        onSuccess: uris => {
          setImageUris([...imageUris, ...uris.map(uri => ({uri}))]);
        },
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '이미지 업로드에 실패하였습니다.',
        position: 'bottom'
      })
    }
  };

  /** 디바이스 갤러리 내의 이미지 핸들링 */
  const handleImageLibrary = async () => {
    try {
      const result = await launchImageLibrary(cameraOptions);
      if (result.errorCode) {
        return Alert.alert(
          alerts[result.errorCode].title,
          alerts[result.errorCode].description,
        );
      }

      // 결과물이 있다면 이미지 업로드 api 요청
      if (result.assets) {
        const assetsLength = imageUris.length + result.assets.length;
        const isExceeded = checkExceed(assetsLength);
        if (isExceeded) {
          return;
        }

        const formData = getImageFormData(result.assets);
        handleUploadImages(formData);
      }
    } catch (error) {
      console.error('handleUploadImages', error);

      Toast.show({
        type: 'error',
        text1: '갤러리를 열 수 없습니다.',
        text2: '권한을 확인해주세요.',
        position: 'bottom'
      })
    }
  };

  return {
    /** 이미지 source 리스트*/
    imageUris,

    /** 디바이스 내 이미지 핸들러*/
    handleImageLibrary,

    /** 이미지 삭제 핸들러 */
    handleDelete,

    /** 이미지 좌우이동 핸들러 */
    handleMove,
  };
};

export default useDeviceImage;
