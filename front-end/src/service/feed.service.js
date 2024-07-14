import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/Axios';

export const FEED_QUERY_KEY = {
  FEED_LIST: 'feedList',
};

export function useGetFeedList() {
  return useQuery({
    queryKey: [FEED_QUERY_KEY.FEED_LIST],
    queryFn: () => {
      return axios.get(`/api/v1/feed`).then((res) => res);
    },
  });
}

export function useLikeOrUnlikeFeed() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return axios
        .post(data.is_liked ? `/api/v1/feed/like` : '/api/v1/feed/unlike', {
          feed_id: data.feed_id,
        })
        .then((res) => res);
    },
    onMutate: (variables) => {
      const previousValue = queryClient.getQueryData([FEED_QUERY_KEY.FEED_LIST]);

      queryClient.setQueryData([FEED_QUERY_KEY.FEED_LIST], (old) => {
        return {
          ...old,
          data: {
            ...old.data,
            results: old.data.results.map((feed) => {
              if (feed.id === variables.feed_id) {
                return {
                  ...feed,
                  is_liked: !feed.is_liked,
                };
              }
              return feed;
            }),
          },
        };
      });
      return previousValue;
    },
  });
}
