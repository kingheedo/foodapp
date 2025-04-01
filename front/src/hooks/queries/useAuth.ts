import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  postLogin,
  postLogout,
  postSignup,
  ResponseProfile,
  ResponseToken,
} from '@/api';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptedStorage, setEncryptedStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {queryKeys, storageKeys} from '@/constants';
import {Category, Profile} from '@/types/domain';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

const useLogin = <T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: ({accessToken, refreshToken}) => {
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

const useEmailLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useLogin(postLogin, mutationOptions);
};

const useKaKaoLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useLogin(kakaoLogin, mutationOptions);
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptedStorage(storageKeys.REFRESH_TOKEN);
      removeEncryptedStorage(storageKeys.MAKER_FILTER);
      removeEncryptedStorage(storageKeys.SHOW_LEGEND);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
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

type CustomResponseProfile = {categories: Category} & Profile;

const trasnformGetProfile = (data: ResponseProfile): CustomResponseProfile => {
  const {RED, YELLOW, GREEN, BLUE, PURPLE, ...rest} = data;
  const categories = {
    RED,
    YELLOW,
    GREEN,
    BLUE,
    PURPLE,
  };

  return {
    categories,
    ...rest,
  };
};

const useGetProfile = (
  queryOption?: UseQueryCustomOptions<ResponseProfile, CustomResponseProfile>,
) => {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    select: trasnformGetProfile,
    ...queryOption,
  });
};

const useUpdateCategory = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
};

const useUpdateProfile = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
};

const useDeleteAccount = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deleteAccount,
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const getRefreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: getRefreshTokenQuery.isSuccess,
  });
  const updateCategory = useUpdateCategory();
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKaKaoLogin();
  const logoutMutation = useLogout();
  const updateProfileMutation = useUpdateProfile();
  const deleteAccountMutation = useDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });

  return {
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    logoutMutation,
    updateProfileMutation,
    deleteAccountMutation,
    isLogin,
    getRefreshTokenQuery,
    getProfileQuery,
    updateCategory,
  };
};

export default useAuth;
