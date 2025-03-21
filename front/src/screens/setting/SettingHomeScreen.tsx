import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SettingItem from '@/components/setting/SettingItem';
import SettingList from '@/components/setting/SettingList';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {ScrollView} from 'react-native-gesture-handler';

interface SettingHomeScreenProps {}

const SettingHomeScreen = ({}: SettingHomeScreenProps) => {
  const {logoutMutation} = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.settingHomeContainer}>
      <ScrollView>
        <SettingList style={styles.settingList} />
        <SettingItem
          onPress={handleLogout}
          textStyle={styles.logoutItem}
          icon={
            <MaterialIcons name="logout" size={16} color={colors.RED_500} />
          }
          label="로그아웃"
          isLast={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingHomeContainer: {
    gap: 30,
    flex: 1,
  },
  settingList: {
    marginTop: 30,
  },
  logoutItem: {
    color: colors.RED_500,
  },
});

export default SettingHomeScreen;
