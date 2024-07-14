import axios from '../lib/Axios';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`/api/v1/auth/login`, data).then((res) => res);
    },
  });
}
