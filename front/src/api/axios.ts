import axios from 'axios';
import {Platform} from 'react-native';

const baseURL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
