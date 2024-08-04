import axiosInstance from '@/api/axios';

const uploadImages = async (body: FormData): Promise<string[]> => {
  const {data} = await axiosInstance.postForm('/images', body);

  return data;
};

export {uploadImages};
