import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';
import { User } from '../auth/register';

export function readMe(): Promise<AxiosResponse<DefaultApiResponse<User[]>>> {
  return axiosClient.get('/api/v1/users/me', {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  });
}
