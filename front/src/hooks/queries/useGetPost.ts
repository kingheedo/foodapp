import {getPost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import {useQuery} from '@tanstack/react-query';
import {UseQueryCustomOptions} from 'types/common';

const useGetPost = (
  id: number | null,
  options?: UseQueryCustomOptions<ResponseSinglePost>,
) => {
  return useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    queryFn: () => getPost(Number(id)),
    enabled: !!id,
    ...options,
  });
};

export default useGetPost;
