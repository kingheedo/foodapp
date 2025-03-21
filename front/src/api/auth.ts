import {Category, Profile} from '@/types/domain';
import {getEncryptedStorage} from '@/utils';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post(`/auth/signin`, {
    email,
    password,
  });

  return data;
};

const postLogout = async () => {
  await axiosInstance.post('/auth/logout');
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

type RequestProfile = Omit<
  Profile,
  'id' | 'email' | 'kakaoImageUri' | 'loginType'
>;

const editProfile = async (body: RequestProfile): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.patch('/auth/me', body);

  return data;
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post(`auth/oauth/kakao`, {
    token,
  });

  return data;
};

const getAccessToken = async () => {
  const refreshToken = await getEncryptedStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

export {
  postSignup,
  postLogin,
  getProfile,
  editProfile,
  getAccessToken,
  postLogout,
  kakaoLogin,
};
export type {RequestUser, ResponseToken, ResponseProfile, RequestProfile};
