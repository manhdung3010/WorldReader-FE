import axiosClient from "./index";

export function getCategoryProduct(params: any) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );

  return axiosClient.get("public/category-product", { params: filteredParams });
}

export function getDetailCategoryProduct(id: any) {
  return axiosClient.get(`public/category-product/${id}`);
}
