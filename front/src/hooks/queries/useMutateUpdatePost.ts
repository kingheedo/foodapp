import {updatePost} from '@/api';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const useMutateUpdatePost = (options?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CALENDAR, queryKeys.GET_POSTS, new Date(newPost.date).getFullYear(), new Date(newPost.date).getMonth()+1],
      });
    },
    ...options,
  });
};

export default useMutateUpdatePost;
