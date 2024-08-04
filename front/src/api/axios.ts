import axios from 'axios';
import backUrl from '@/utils/backUrl';

const axiosInstance = axios.create({
  baseURL: backUrl,
  withCredentials: true,
});

export default axiosInstance;
