import axios, { AxiosResponse } from 'axios';

export interface DefaultApiResponse<T> {
  error: string | null;
  data: T | null;
  message: string | null;
}
console.info('process.env.BASE_API_URL');
console.info(process.env.BASE_API_URL);
export const axiosClient = axios.create({
  baseURL: `${process.env.BASE_API_URL}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  function responseInterceptor(response) {
    return response;
  },
  function errorInterceptor(error) {
    const res: AxiosResponse = error?.response;

    if (res?.status === 404 || res?.status === 403) {
      return res;
    }

    if (res?.status === 401 || !res) {
      localStorage.clear();
      window.location.href = `${process.env.BASE_APP_URL}/login`;
    }

    console.error(`Looks like there was a problem. Status Code: ${res?.status}`);
    return Promise.reject(error);
  },
);
