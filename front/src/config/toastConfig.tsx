// App.jsx
import { colors } from '@/constants';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

/*
  1. Create the config
*/
const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.BLUE_500 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.RED_500 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
};
export default toastConfig;
