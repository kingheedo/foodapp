import {createPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const useMutateCreatePost = (options?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      // queryClient.invalidateQueries({
      //   queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      // });

      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        prevData => {
          const newMarker = {
            id: newPost.id,
            color: newPost.color,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            score: newPost.score,
          };

          return prevData ? [...prevData, newMarker] : [newMarker];
        },
      );
    },
    ...options,
  });
};

export default useMutateCreatePost;
