import axiosClient from "./index";

export function register(payload: any) {
  return axiosClient.post("auth/register", payload);
}

export function login(payload: { identifier: string; password: string }) {
  return axiosClient.post("auth/login", payload);
}

export function loginGoogle(googleProfile?: any) {
  // Nếu có thông tin profile Google, gửi lên server
  if (googleProfile) {
    return axiosClient.post("auth/google/login", googleProfile);
  }
  // Nếu không, gọi endpoint mặc định
  return axiosClient.post("auth/google");
}

export function registerGoogle(googleProfile?: any) {
  if (googleProfile) {
    return axiosClient.post("auth/google/register", googleProfile);
  }
  return axiosClient.post("auth/google/register");
}

export function loginGoogleCallback() {
  return axiosClient.post("auth/google/callback");
}
