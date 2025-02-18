// src/hooks/usePostsQuery.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '../types';

const POSTS_PER_PAGE = 10;
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface FetchPostsResponse {
  data: Post[];
  totalPages: number;
  totalCount: number;
}

export const usePostsQuery = (searchTerm: string, page: number) => {
  return useQuery<FetchPostsResponse, Error>({
    queryKey: ['posts', searchTerm, page],
    queryFn: async () => {
      const response = await axios.get(API_URL, {
        params: {
          _page: page,
          _limit: POSTS_PER_PAGE,
          q: searchTerm,
        },
      });

      const totalCount = parseInt(response.headers['x-total-count'], 10);
      const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

      return {
        data: response.data,
        totalPages,
        totalCount,
      };
    },
  });
};