import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';

export function deleteImage(imageId: string): Promise<AxiosResponse<DefaultApiResponse<any[]>>> {
  return axiosClient.delete(`/api/v1/images/${imageId}`, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  });
}
