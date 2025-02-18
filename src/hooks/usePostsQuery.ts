import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '../types';

const POSTS_PER_PAGE = 10;
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface FetchPostsResponse {
  data: Post[];
  nextPage: number | null;
}

export const usePostsQuery = (searchTerm: string) => {
  return useInfiniteQuery<FetchPostsResponse, Error, FetchPostsResponse, unknown[], number>({
    queryKey: ['posts', searchTerm],
    initialPageParam: 1,
    queryFn: async ({ pageParam }): Promise<FetchPostsResponse> => {
      const response = await axios.get(API_URL, {
        params: {
          _page: pageParam,
          _limit: POSTS_PER_PAGE,
          q: searchTerm,
        },
      });

      const totalCount = parseInt(response.headers['x-total-count'], 10);
      const hasNextPage = pageParam * POSTS_PER_PAGE < totalCount;

      return {
        data: response.data,
        nextPage: hasNextPage ? pageParam + 1 : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
