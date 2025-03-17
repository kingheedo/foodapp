import {StyleSheet, Text, View} from 'react-native';
import SettingItem from '@/components/setting/SettingItem';
import SettingList from '@/components/setting/SettingList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/constants';

interface SettingHomeScreenProps {}

const SettingHomeScreen = ({}: SettingHomeScreenProps) => {
  return (
    <View style={styles.settingHomeContainer}>
      <SettingList style={styles.settingList} />
      <SettingItem
        textStyle={styles.logoutItem}
        icon={<MaterialIcons name="logout" size={16} color={colors.RED_500} />}
        label="로그아웃"
        isLast={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingHomeContainer: {
    gap: 30,
  },
  settingList: {
    marginTop: 30,
  },
  logoutItem: {
    color: colors.RED_500,
  },
});

export default SettingHomeScreen;
