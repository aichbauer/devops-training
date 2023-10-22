import { axiosClient } from '..';

export function logout() {
  return axiosClient.delete('/api/v1/logout', {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  });
}
