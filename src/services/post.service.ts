import axiosClient from "./index";

export function getPost(params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get("public/posts", { params: filteredParams });
}

export function getPostByKeyword(keywordCode: any, params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get(`public/posts/findByKeyword/${keywordCode}`, {
    params: filteredParams,
  });
}

export function getPostByCategory(urlCategory: any, params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get(`public/posts/findByCategory/${urlCategory}`, {
    params: filteredParams,
  });
}

export function getDetailPost(id: any) {
  return axiosClient.get(`public/posts/${id}`);
}

export function getDetailPostByUrl(url: any) {
  return axiosClient.get(`public/posts/findByUrl/${url}`);
}

export function increaseViewPost(id: any) {
  return axiosClient.post(`public/posts/${id}/view`);
}

// Category Post
export function getCategoryPost(params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get("public/category-post", { params: filteredParams });
}

export function getDetailCategoryPost(id: any) {
  return axiosClient.get(`public/category-post/${id}`);
}

export function getDetailCategoryPostByUrl(url: any) {
  return axiosClient.get(`public/category-post/findByUrl/${url}`);
}