import {Post} from '@/types/domain';
import axiosInstance from './axios';
import {ImageUri} from '@/types/domain';

type RequsetCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
type ResponsePost = Post & {images: ImageUri[]};

const createPost = async (body: RequsetCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

const getPosts = async (page: number): Promise<ResponseSinglePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

const deletePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};

const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

const getFavoritePosts = async (page: number): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);

  return data;
};

const updateFavoritePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

type RequestFavoritePosts = {
  query: string;
  pageParam: number;
};

const getSearchPosts = async ({
  query,
  pageParam,
}: RequestFavoritePosts): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(
    `/posts/my/search?query=${query}&page=${pageParam}`,
  );

  return data;
};

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  getFavoritePosts,
  updateFavoritePost,
  getSearchPosts,
};
export type {
  RequsetCreatePost,
  ResponsePost,
  ResponseSinglePost,
  RequestUpdatePost,
};
