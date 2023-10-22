import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';

export function resetDatabaseTables(): Promise<AxiosResponse<DefaultApiResponse<{}>>> {
  return axiosClient.put(
    `/api/v1/database-tables`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    },
  );
}
