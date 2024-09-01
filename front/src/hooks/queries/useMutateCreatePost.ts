import {createPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseMutationCustomOptions} from '@/types/common';
import {Marker} from '@/types/domain';
import { getMonthYearDetails } from '@/utils/date';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const useMutateCreatePost = (options?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
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

      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CALENDAR, queryKeys.GET_POSTS, new Date(newPost.date).getFullYear(), new Date(newPost.date).getMonth()+1],
      });
    },
    ...options,
  });
};

export default useMutateCreatePost;
