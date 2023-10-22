import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';
import { User } from './register';

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  type: 'Bearer';
  token: string;
  user: User;
}

export function login(
  credentials: Credentials,
): Promise<AxiosResponse<DefaultApiResponse<LoginResponse[]>>> {
  console.info('process.env.BASE_API_URL');
  console.info(process.env.BASE_API_URL);
  return axiosClient.post('/api/public/v1/login', credentials);
}
