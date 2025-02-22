import { BASE_URL } from "./constants";
import { IItem } from "./types";

// Типизация для ответа от API

interface ApiResponse {
  user: {
    name?: string;
    email?: string;
    password?: string;
    code?: string;
  };
  accessToken?: string;
  refreshToken?: string;
  data?: IItem[];
  order?: { number: number };
}

// Функция для обработки ответа
function checkResponse(res: Response): Promise<ApiResponse> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

// Типизация для запроса
export async function request<T = ApiResponse>(
  path: string,
  options: RequestInit
): Promise<T> {
  const res = await fetch(BASE_URL + path, options);
  const data = await checkResponse(res);
  return data as T;
}
