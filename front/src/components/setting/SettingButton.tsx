import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import {colors, mainNavigations, settingNavigatons} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<
    SettingStackParamList,
    typeof settingNavigatons.SETTING_HOME
  >,
  DrawerNavigationProp<MainDrawerParamList>
>;

interface ISettingButtonprops extends PressableProps {}

const SettingButton = ({...props}: ISettingButtonprops) => {
  const navigation = useNavigation<Navigation>();

  const handlePress = () => {
    navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigatons.SETTING_HOME,
    });
  };

  return (
    <Pressable {...props} onPress={handlePress} style={styles.container}>
      <Ionicons name="settings-outline" size={16} />
      <Text style={styles.settingButtonText}>설정</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  settingButtonText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.GRAY_700,
  },
});

export default SettingButton;
