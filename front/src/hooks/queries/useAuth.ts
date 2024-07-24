import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  postLogin,
  postLogout,
  postSignup,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptedStorage, setEncryptedStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {queryKeys, storageKeys} from '@/constants';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}: any) => {
      setEncryptedStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH],
      });
    },
    ...mutationOptions,
  });
};

const useGetRefreshToken = () => {
  const {isSuccess, isError, data} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 27, // 27분
    refetchInterval: 1000 * 60 * 27, // 27분
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptedStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return {isSuccess, isError};
};

const useGetProfile = (queryOption?: UseQueryCustomOptions) => {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOption,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const getRefreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: getRefreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    isLogin,
    getRefreshTokenQuery,
    getProfileQuery,
  };
};

export default useAuth;
