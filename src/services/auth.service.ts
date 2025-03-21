import axiosClient from "./index";

export function login(payload: { identifier: string; password: string }) {
  return axiosClient.post("auth/login", payload);
}
