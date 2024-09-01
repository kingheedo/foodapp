import {deletePost, ResponseSinglePost} from '@/api';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation, useQueryClient, InfiniteData} from '@tanstack/react-query';
const useMuatateDeletePost = (options?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: deletedID => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CALENDAR, queryKeys.GET_POSTS],
      });
      // queryClient.setQueryData<InfiniteData<ResponseSinglePost[], number>>(
      //   [queryKeys.POST, queryKeys.GET_POSTS],
      //   prevPosts => {
      //     if (!prevPosts) {
      //       return prevPosts;
      //     }
      //     const newPosts = prevPosts?.pages.map(page =>
      //       page.filter(post => post.id !== deletedID),
      //     );

      //     return {
      //       ...prevPosts,
      //       pages: newPosts,
      //     };
      //   },
      // );
    },
    ...options,
  });
};

export default useMuatateDeletePost;
