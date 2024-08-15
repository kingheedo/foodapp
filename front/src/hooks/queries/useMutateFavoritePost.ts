import {updateFavoritePost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

const useMutateFavoritePost = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: id => {
      // favorite posts 리스트에서 id 값에 해당하는 post의 favorite을 true로 변경해야함
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_FAVORITE_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
      });
    },
    ...options,
  });
};

export default useMutateFavoritePost;
