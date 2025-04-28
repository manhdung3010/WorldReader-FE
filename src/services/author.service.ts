import axiosClient from "./index";

export function getAuthor(params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get("public/authors", { params: filteredParams });
}

export function getDetailAuthor(id: any) {
  return axiosClient.get(`public/authors/${id}`);
}
