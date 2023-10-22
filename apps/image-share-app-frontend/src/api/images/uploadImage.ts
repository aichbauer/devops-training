import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';

export function uploadImage(formData: any): Promise<AxiosResponse<DefaultApiResponse<any[]>>> {
  return axiosClient.post(`/api/v1/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': localStorage.getItem('accessToken'),
    },
  });
}
