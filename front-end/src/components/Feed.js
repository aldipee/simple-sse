import React, { useEffect } from 'react';
import Posts from './Posts';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { getLocalStorageAccessToken } from '../lib/Axios';

export const Feed = () => {
  const accessToken = getLocalStorageAccessToken();
  useEffect(() => {
    if (!accessToken) return;
    const eventSource = new EventSource(`http://localhost:9112/api/v1/notification/stream?accessToken=${accessToken}`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log('New message:', newMessage);
      toast.info(newMessage.message);
    };
    eventSource.onopen = () => {
      console.log('EventSource connected');
    };

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  return (
    <Box flex={4} padding={2}>
      <Posts />
    </Box>
  );
};

export default Feed;
