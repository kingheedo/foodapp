import {getFavoritePosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
const useGetFavoritePosts = (
  options?: UseInfiniteQueryOptions<
    ResponsePost[],
    AxiosError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_FAVORITE_POSTS],
    queryFn: ({pageParam = 1}) => getFavoritePosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const lastPost = lastPage[lastPage.length - 1];

      return lastPost ? allPages.length + 1 : undefined;
    },
    ...options,
  });
};

export default useGetFavoritePosts;
