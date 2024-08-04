import {uploadImages} from '@/api';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

const useMutateUploadImages = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...options,
  });
};

export default useMutateUploadImages;
