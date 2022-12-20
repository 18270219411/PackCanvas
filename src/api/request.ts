import axios, { AxiosRequestConfig } from 'axios';
import { CustomError } from '@models';

export async function post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  const res = await axios.post<{
    code: number;
    payload: T;
    message: string;
  }>(url, data, config);
  if (res.data.code === 0) {
    return res.data.payload;
  }
  throw new CustomError(res.data.message || '', res.data.code, res.data);
}
