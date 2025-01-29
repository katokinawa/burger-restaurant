import { BASE_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  if (res.status === 401) {
    return Promise.reject(`Ошибка. Неправильный логин или пароль`);
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function request(path, options) {
  return fetch(BASE_URL + path, options).then(checkResponse);
}
