import { BASE_URL } from "./constants";

function checkResponse(res: Response): Promise<unknown> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function request(path: string, options: Request): Promise<unknown> {
  return fetch(BASE_URL + path, options).then(checkResponse);
}
