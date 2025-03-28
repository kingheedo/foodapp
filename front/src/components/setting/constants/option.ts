import {settingNavigatons} from '@/constants';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';

export type Item = {
  label: string;
  path?: keyof SettingStackParamList;
  callback?: () => void;
};

type SetingItemListProps = {
  openDarkModeModal: () => void;
  openLegendModal: () => void;
};

export const settingItemList = ({
  openDarkModeModal,
  openLegendModal,
}: SetingItemListProps): Item[] => [
  {
    label: '프로필 수정',
    path: settingNavigatons.EDIT_PROFILE,
  },
  {
    label: '마커 카테고리 설정',
    path: settingNavigatons.EDIT_CATEGORY,
  },
  {
    label: '범례 표시',
    callback: openLegendModal,
  },
  {
    label: '다크 모드',
    callback: openDarkModeModal,
  },
];
