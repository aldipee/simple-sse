import { QueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { getLocalStorageAccessToken } from '../lib/Axios';
import { ENV_CONFIG } from '../config/env';

export function getEventStreamContent({ queryKey }) {
  return new Promise((resolve, reject) => {
    const [_key] = queryKey;
    const queryClient = new QueryClient();
    let eventSource = new EventSourcePolyfill(`${ENV_CONFIG.endpoint.API_ENDPOINT}/api/v1/notification/stream`, {
      withCredentials: false,
      headers: {
        Authorization: `Bearer ${getLocalStorageAccessToken()}`,
      },
    });

    // General onmessage event to log all messages
    eventSource.onmessage = (e) => {
      console.log('General Message Event:', e);
    };

    // SUCCESS event listener
    eventSource.addEventListener('SUCCESS', (e) => {
      const data = JSON.parse(e.data);
      console.log('SUCCESS Event:', e);

      if (e.lastEventId === 'END') {
        queryClient.setQueryData(_key, data);
        eventSource.close();
        resolve(data); // Resolve promise with data
      } else {
        if (data) {
          queryClient.setQueryData(_key, data);
        }
      }
    });

    // Error event listener
    eventSource.addEventListener('error', (e) => {
      console.log('Error Event:', e);
      eventSource.close();
      reject(e); // Reject promise with error
    });

    // Add additional event listeners if necessary
    eventSource.addEventListener('open', (e) => {
      console.log('Connection opened:', e);
    });

    eventSource.addEventListener('close', (e) => {
      console.log('Connection closed:', e);
    });
  });
}
