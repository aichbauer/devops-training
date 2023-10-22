import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';
import { UpdateUser, User } from '../auth/register';

export function updateMe(user: UpdateUser): Promise<AxiosResponse<DefaultApiResponse<User[]>>> {
  return axiosClient.put(
    '/api/v1/users/me',
    {
      ...user,
    },
    {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  );
}
