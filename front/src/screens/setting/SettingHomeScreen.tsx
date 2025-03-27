import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SettingItem from '@/components/setting/SettingItem';
import SettingList from '@/components/setting/SettingList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {ScrollView} from 'react-native-gesture-handler';
import {OptionModal} from '@/components/common/OptionModal';
import useModal from '@/hooks/useModal';
import {settingItemList} from '@/components/setting/constants/option';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import useThemeStorage from '@/hooks/useThemeStorage';
interface SettingHomeScreenProps {}

const SettingHomeScreen = ({}: SettingHomeScreenProps) => {
  const {logoutMutation} = useAuth();
  const darkModeModal = useModal();
  const itemList = settingItemList({
    openDarkModeModal: darkModeModal.handleOpen,
  });
  const {theme, isSystem, setMode, setSystem} = useThemeStorage();
  const systemDefault = useColorScheme();
  const styles = styling(theme);

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  const handleTheme = (theme: ThemeMode | boolean) => {
    if (typeof theme === 'boolean') {
      console.log('theme', theme);

      setMode(systemDefault ?? 'light');
      setSystem(theme);
    } else {
      setMode(theme);
      setSystem(false);
    }
    darkModeModal.handleClose();
  };

  return (
    <SafeAreaView style={styles.settingHomeContainer}>
      <ScrollView>
        <SettingList style={styles.settingList} list={itemList} />
        <SettingItem
          onPress={handleLogout}
          textStyle={styles.logoutItem}
          icon={
            <MaterialIcons
              name="logout"
              size={16}
              color={colors[theme].RED_500}
            />
          }
          label="로그아웃"
          isLast={true}
        />
      </ScrollView>
      <OptionModal {...darkModeModal} btnLabel="취소">
        <OptionModal.Button
          isChecked={theme === 'light' && !isSystem}
          onPress={() => handleTheme('light')}
          label="라이트 모드"
        />
        <OptionModal.Button
          isChecked={theme === 'dark'}
          onPress={() => handleTheme('dark')}
          label="다크 모드"
        />
        <OptionModal.Button
          isChecked={isSystem}
          onPress={() => handleTheme(true)}
          label="시스템 환경 모드"
        />
      </OptionModal>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    settingHomeContainer: {
      gap: 30,
      flex: 1,
    },
    settingList: {
      marginTop: 30,
      marginBottom: 30,
    },
    logoutItem: {
      color: colors[theme].RED_500,
    },
  });

export default SettingHomeScreen;
