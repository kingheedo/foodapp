import {Post} from '@/types/domain';
import axiosInstance from './axios';
import {ImageUri} from 'types/domain';

type RequsetCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
type ResponseCreatePost = Post & {imageUris: ImageUri[]};

const createPost = async (
  body: RequsetCreatePost,
): Promise<ResponseCreatePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export {createPost};
export type {RequsetCreatePost, ResponseCreatePost};
