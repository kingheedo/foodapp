import {Post} from '@/types/domain';
import axiosInstance from './axios';
import {ImageUri} from 'types/domain';

type RequsetCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
type ResponsePost = Post & {imageUris: ImageUri[]};

const createPost = async (body: RequsetCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = Post & {isFavorite: boolean} & {images: ImageUri[]};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export {createPost, getPost};
export type {RequsetCreatePost, ResponsePost, ResponseSinglePost};
