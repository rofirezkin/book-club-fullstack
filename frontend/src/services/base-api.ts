import axios, { AxiosError, AxiosResponse } from "axios";

export type T_ApiResponse<T> = {
  data: T;
  status: string;
  code: string;
  message: string;
};

export type T_AxiosBaseError = AxiosError<T_ApiResponse<null>>;

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});

export async function apiRequest<T>(
  promise: Promise<AxiosResponse<T_ApiResponse<T>>>
): Promise<T_ApiResponse<T>> {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    const error = err as AxiosError<T_ApiResponse<null>>;
    throw {
      data: null as unknown as T,
      status: "error",
      code: String(error.response?.status ?? "500"),
      message: error.response?.data?.message ?? error.message,
    } as T_ApiResponse<T>;
  }
}
