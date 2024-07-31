import {createPost} from '@/api';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

const useMutateCreatePost = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: createPost,
    ...options,
  });
};

export default useMutateCreatePost;
