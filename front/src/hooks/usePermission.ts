import {useEffect} from 'react';
import {
  Alert,
  AlertButton,
  AlertOptions,
  Linking,
  Platform,
} from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
const isAndroid = Platform.OS === 'android';

export enum PermissionType {
  LOCATION = 'LOCATION',
  PHOTO = 'PHOTO',
}

type PermissionOs = {
  [value in PermissionType]: Permission;
};

type PermissionAlert = {
  [value in PermissionType]: {
    title: string;
    description?: string;
    buttons?: AlertButton[];
    options?: AlertOptions;
  };
};

const androidPermissions: PermissionOs = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};
const iosPermissions: PermissionOs = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const permissionAlert: PermissionAlert = {
  LOCATION: {
    title: '위치 권한이 필요합니다.',
    description: '설정 화면에서 위치 권한을 허용해주세요.',
    buttons: [
      {
        text: '설정',
        onPress: () => Linking.openSettings(),
      },
      {
        text: '취소',
      },
    ],
  },
  PHOTO: {
    title: '사진 접근 권한이 필요합니다.',
    description: '설정 화면에서 사진 접근 권한을 허용해주세요.',
    buttons: [
      {
        text: '설정',
        onPress: () => Linking.openSettings(),
      },
      {
        text: '취소',
      },
    ],
  },
};

const usePermission = (type: PermissionType) => {
  const showAlert = () => {
    Alert.alert(
      permissionAlert[type].title,
      permissionAlert[type].description,
      permissionAlert[type].buttons,
    );
  };

  useEffect(() => {
    (async () => {
      const checked = await check(
        isAndroid ? androidPermissions[type] : iosPermissions[type],
      );
      switch (checked) {
        case RESULTS.DENIED:
          showAlert();
          break;

        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showAlert();

          break;

        default:
          break;
      }
    })();
  }, []);
};

export default usePermission;
