import {Pressable, PressableProps, View, ViewProps} from 'react-native';
import {mainNavigations, settingNavigatons} from '@/constants';
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
    <Pressable {...props} onPress={handlePress}>
      <Ionicons name="settings-outline" size={16} />
    </Pressable>
  );
};

export default SettingButton;
