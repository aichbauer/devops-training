import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';

export function readAllImages(): Promise<AxiosResponse<DefaultApiResponse<any[]>>> {
  return axiosClient.get(`/api/v1/images`, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  });
}
