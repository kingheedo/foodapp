import {getCalendarPosts, ResponseCalendarPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

const useGetCalendarPosts = (
  year: number,
  month: number,
  options?: UseQueryCustomOptions<ResponseCalendarPost>,
) => {
  return useQuery({
    queryKey: [queryKeys.CALENDAR, queryKeys.GET_POSTS, year, month],
    queryFn: () => getCalendarPosts(year, month),
    placeholderData: keepPreviousData, // 새로운 쿼리키로 리페치하기 전까지 이전값을 유지하여 깜빡임 현상 제거
    ...options,
  });
};

export default useGetCalendarPosts;
