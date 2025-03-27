// App.jsx
import {colors} from '@/constants';
import {ThemeMode} from '@/types/common';
import {BaseToast, ErrorToast, ToastConfig} from 'react-native-toast-message';

/*
  1. Create the config
*/
const toastConfig = (theme: ThemeMode): ToastConfig => ({
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors[theme].BLUE_500}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors[theme].RED_500}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
});
export default toastConfig;
