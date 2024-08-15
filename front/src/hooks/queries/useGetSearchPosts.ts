import {getSearchPosts, ResponsePost} from '@/api';
import {queryKeys} from '@/constants';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const useGetSearchPosts = (
  query: string,
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
    queryKey: [queryKeys.POST, queryKeys.GET_SEARCH_POSTS, query],
    queryFn: ({pageParam = 1}) => getSearchPosts({query, pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];

      return lastPost ? allPages.length + 1 : undefined;
    },
    ...options,
  });
};

export default useGetSearchPosts;
