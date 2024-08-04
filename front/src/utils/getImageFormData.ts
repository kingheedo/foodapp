import {Asset} from 'react-native-image-picker';

/** image 업로드를 위한 formData */
const getImageFormData = (assets: Asset[]) => {
  const formData = new FormData();

  for (let asset of assets) {
    const file = {
      uri: asset.uri,
      name: asset.fileName,
      type: asset.type,
    };
    formData.append('images', file);
  }

  return formData;
};

export default getImageFormData;
