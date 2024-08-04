import {Platform} from 'react-native';

const backUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030';

export default backUrl;
