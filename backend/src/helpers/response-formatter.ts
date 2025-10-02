export type ApiResponse<T> = {
    status: string;   // "success" | "error"
    code: string;   
    message: string; 
    data: T;
};

export function successResponse<T>(data: T, code = 200, message = 'OK'): ApiResponse<T> {
  return {
    status: 'success',
    code: String(code),
    message,
    data
  };
}

export function errorResponse<T>(message: string, code = 400, data: T = null as unknown as T): ApiResponse<T> {
  return {
    status: 'error',
    code: String(code),
    message,
    data,
  };
}
