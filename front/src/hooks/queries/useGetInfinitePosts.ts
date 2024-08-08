import {getPosts, ResponsePost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types/common';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryKey,
  InfiniteData,
} from '@tanstack/react-query';

const useGetInfinitePosts = (
  options?: UseInfiniteQueryOptions<
    ResponseSinglePost[],
    ResponseError,
    InfiniteData<ResponseSinglePost[], number>,
    ResponseSinglePost[],
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    queryFn: ({pageParam = 1}) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];

      return lastPost ? allPages.length + 1 : undefined;
    },
    ...options,
  });
};

export default useGetInfinitePosts;
